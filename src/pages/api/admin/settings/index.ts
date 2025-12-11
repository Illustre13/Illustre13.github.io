import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const { category } = req.query;
        
        const settings = await prisma.settings.findMany({
          where: category && typeof category === 'string' 
            ? { category } 
            : undefined,
          orderBy: [
            { category: 'asc' },
            { key: 'asc' },
          ],
        });
        return res.status(200).json(settings);

      case 'PUT':
        // Bulk update settings
        const { settings: settingsToUpdate } = req.body;

        if (!Array.isArray(settingsToUpdate)) {
          return res.status(400).json({ error: 'Invalid settings format' });
        }

        const updatePromises = settingsToUpdate.map((setting: any) =>
          prisma.settings.upsert({
            where: { key: setting.key },
            update: {
              value: setting.value,
              type: setting.type,
              category: setting.category,
              description: setting.description,
            },
            create: {
              key: setting.key,
              value: setting.value,
              type: setting.type || 'text',
              category: setting.category || 'general',
              description: setting.description,
            },
          })
        );

        const updated = await Promise.all(updatePromises);
        return res.status(200).json(updated);

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Settings API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

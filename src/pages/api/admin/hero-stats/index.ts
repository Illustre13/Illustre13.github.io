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
        const stats = await prisma.heroStat.findMany({
          where: { visible: true },
          orderBy: { order: 'asc' },
        });
        return res.status(200).json(stats);

      case 'POST':
        const { value, label, icon, order, visible } = req.body;

        if (!value || !label) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newStat = await prisma.heroStat.create({
          data: {
            value,
            label,
            icon,
            order: order || 0,
            visible: visible !== undefined ? visible : true,
          },
        });

        return res.status(201).json(newStat);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Hero stats API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

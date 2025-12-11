import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

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
        const { page = '1', limit = '50', unread } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const where = unread === 'true' ? { read: false } : undefined;

        const [messages, total] = await Promise.all([
          prisma.contactMessage.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit as string),
          }),
          prisma.contactMessage.count({ where }),
        ]);

        return res.status(200).json({
          messages,
          pagination: {
            total,
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            pages: Math.ceil(total / parseInt(limit as string)),
          },
        });

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Messages API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

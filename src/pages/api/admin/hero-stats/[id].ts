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
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid stat ID' });
  }

  try {
    switch (method) {
      case 'GET':
        const stat = await prisma.heroStat.findUnique({
          where: { id },
        });

        if (!stat) {
          return res.status(404).json({ error: 'Stat not found' });
        }

        return res.status(200).json(stat);

      case 'PUT':
        const updatedStat = await prisma.heroStat.update({
          where: { id },
          data: req.body,
        });

        return res.status(200).json(updatedStat);

      case 'DELETE':
        await prisma.heroStat.delete({
          where: { id },
        });

        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error: any) {
    console.error('Hero stat API error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Stat not found' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

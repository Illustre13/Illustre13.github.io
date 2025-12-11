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
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  try {
    switch (method) {
      case 'GET':
        const message = await prisma.contactMessage.findUnique({
          where: { id },
        });

        if (!message) {
          return res.status(404).json({ error: 'Message not found' });
        }

        // Mark as read when accessed
        if (!message.read) {
          await prisma.contactMessage.update({
            where: { id },
            data: { read: true },
          });
        }

        return res.status(200).json(message);

      case 'PUT':
        const updatedMessage = await prisma.contactMessage.update({
          where: { id },
          data: req.body,
        });

        return res.status(200).json(updatedMessage);

      case 'DELETE':
        await prisma.contactMessage.delete({
          where: { id },
        });

        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error: any) {
    console.error('Message API error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

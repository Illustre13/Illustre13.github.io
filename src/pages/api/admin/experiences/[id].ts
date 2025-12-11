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
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid experience ID' });
  }

  try {
    switch (method) {
      case 'GET':
        const experience = await prisma.experience.findUnique({
          where: { id },
          include: {
            author: {
              select: { id: true, name: true, email: true },
            },
          },
        });

        if (!experience) {
          return res.status(404).json({ error: 'Experience not found' });
        }

        return res.status(200).json(experience);

      case 'PUT':
        const updateData = req.body;
        
        // Convert date strings to Date objects if present
        if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
        if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);
        if (updateData.endDate === '') updateData.endDate = null;

        const updatedExperience = await prisma.experience.update({
          where: { id },
          data: updateData,
        });

        return res.status(200).json(updatedExperience);

      case 'DELETE':
        await prisma.experience.delete({
          where: { id },
        });

        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error: any) {
    console.error('Experience API error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Experience not found' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

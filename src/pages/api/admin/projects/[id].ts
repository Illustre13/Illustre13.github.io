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
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  try {
    switch (method) {
      case 'GET':
        const project = await prisma.project.findUnique({
          where: { id },
          include: {
            author: {
              select: { id: true, name: true, email: true },
            },
          },
        });

        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json(project);

      case 'PUT':
        const updateData = req.body;
        
        // Convert date strings to Date objects if present
        if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
        if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);

        const updatedProject = await prisma.project.update({
          where: { id },
          data: updateData,
        });

        return res.status(200).json(updatedProject);

      case 'DELETE':
        await prisma.project.delete({
          where: { id },
        });

        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error: any) {
    console.error('Project API error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

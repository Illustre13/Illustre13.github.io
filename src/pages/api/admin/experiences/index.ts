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
        const experiences = await prisma.experience.findMany({
          include: {
            author: {
              select: { id: true, name: true, email: true },
            },
          },
          orderBy: [
            { current: 'desc' },
            { startDate: 'desc' },
            { order: 'asc' },
          ],
        });
        return res.status(200).json(experiences);

      case 'POST':
        const {
          title,
          company,
          location,
          startDate,
          endDate,
          current,
          description,
          skills,
          order,
          type,
          icon,
          link,
        } = req.body;

        if (!title || !company || !startDate || !description || !type) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newExperience = await prisma.experience.create({
          data: {
            title,
            company,
            location,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            current: current || false,
            description,
            skills: skills || [],
            order: order || 0,
            type,
            icon,
            link,
            authorId: session.user.id,
          },
        });

        return res.status(201).json(newExperience);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Experiences API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

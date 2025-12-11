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
        const projects = await prisma.project.findMany({
          include: {
            author: {
              select: { id: true, name: true, email: true },
            },
          },
          orderBy: [
            { featured: 'desc' },
            { order: 'asc' },
            { createdAt: 'desc' },
          ],
        });
        return res.status(200).json(projects);

      case 'POST':
        const {
          title,
          slug,
          description,
          longDesc,
          image,
          images,
          tags,
          category,
          githubUrl,
          liveUrl,
          featured,
          status,
          order,
          startDate,
          endDate,
        } = req.body;

        if (!title || !slug || !description || !image || !category) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProject = await prisma.project.create({
          data: {
            title,
            slug,
            description,
            longDesc,
            image,
            images: images || [],
            tags: tags || [],
            category,
            githubUrl,
            liveUrl,
            featured: featured || false,
            status: status || 'completed',
            order: order || 0,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            authorId: session.user.id,
          },
        });

        return res.status(201).json(newProject);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error: any) {
    console.error('Projects API error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Project with this slug already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await prisma.post.findUnique({
        where: { id: id as string },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching post' });
    }
  }

  if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { title, slug, excerpt, content, coverImage, category, tags, published } = req.body;

      const post = await prisma.post.update({
        where: { id: id as string },
        data: {
          title,
          slug,
          excerpt,
          content,
          coverImage,
          category,
          tags,
          published,
        },
      });

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating post' });
    }
  }

  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      await prisma.post.delete({
        where: { id: id as string },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

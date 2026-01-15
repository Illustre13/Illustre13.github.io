import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const identifier = id as string;

  if (req.method === 'GET') {
    try {
      // Try to find by slug first, then by ID
      let post = await prisma.post.findUnique({
        where: { slug: identifier },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // If not found by slug, try by ID
      if (!post) {
        post = await prisma.post.findUnique({
          where: { id: identifier },
          include: {
            author: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });
      }

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Increment view count for public slug-based requests
      if (post.slug === identifier) {
        await prisma.post.update({
          where: { id: post.id },
          data: { views: { increment: 1 } },
        });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
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
    } catch {
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
    } catch {
      return res.status(500).json({ error: 'Error deleting post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

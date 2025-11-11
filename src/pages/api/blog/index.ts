import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';
// import { prisma } from '@/lib/prisma';

// Mock data for development (remove when database is ready)
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js and TypeScript',
    slug: 'getting-started-nextjs-typescript',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and TypeScript. A comprehensive guide for beginners.',
    content: 'Full content here...',
    coverImage: '/images/blog/nextjs.jpg',
    category: 'Technology',
    tags: ['Next.js', 'TypeScript', 'React'],
    published: true,
    createdAt: new Date('2024-11-01').toISOString(),
    author: {
      name: 'Bertin NDAHAYO',
      email: 'ndahayosibertin17@gmail.com',
    },
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js',
    slug: 'building-scalable-apis-nodejs',
    excerpt: 'Best practices for creating RESTful APIs using Node.js and Express. Tips on performance and security.',
    content: 'Full content here...',
    coverImage: '/images/blog/nodejs.jpg',
    category: 'Tutorial',
    tags: ['Node.js', 'API', 'Backend'],
    published: true,
    createdAt: new Date('2024-10-25').toISOString(),
    author: {
      name: 'Bertin NDAHAYO',
      email: 'ndahayosibertin17@gmail.com',
    },
  },
  {
    id: '3',
    title: 'Machine Learning for Beginners',
    slug: 'machine-learning-beginners',
    excerpt: 'An introduction to machine learning concepts and practical applications in real-world scenarios.',
    content: 'Full content here...',
    coverImage: '/images/blog/ml.jpg',
    category: 'Research',
    tags: ['ML', 'AI', 'Data Science'],
    published: true,
    createdAt: new Date('2024-10-15').toISOString(),
    author: {
      name: 'Bertin NDAHAYO',
      email: 'ndahayosibertin17@gmail.com',
    },
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { limit } = req.query;
      
      // Use mock data for now
      let posts = [...mockPosts];
      
      // Apply limit if provided
      if (limit) {
        const limitNum = parseInt(limit as string);
        posts = posts.slice(0, limitNum);
      }

      return res.status(200).json(posts);

      /* Uncomment when database is ready
      const take = limit ? parseInt(limit as string) : undefined;

      const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take,
      });

      return res.status(200).json(posts);
      */
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ error: 'Error fetching posts', posts: [] });
    }
  }

  /* Uncomment when authentication is ready
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { title, slug, excerpt, content, coverImage, category, tags, published } = req.body;

      const post = await prisma.post.create({
        data: {
          title,
          slug,
          excerpt,
          content,
          coverImage,
          category,
          tags,
          published,
          authorId: session.user.id,
        },
      });

      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating post' });
    }
  }
  */

  return res.status(405).json({ error: 'Method not allowed' });
}

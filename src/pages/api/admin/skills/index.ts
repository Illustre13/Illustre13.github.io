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
        const skills = await prisma.skill.findMany({
          orderBy: [
            { category: 'asc' },
            { order: 'asc' },
            { name: 'asc' },
          ],
        });
        return res.status(200).json(skills);

      case 'POST':
        const { name, category, level, icon, color, order, visible, yearsOfExp } = req.body;

        if (!name || !category || level === undefined) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newSkill = await prisma.skill.create({
          data: {
            name,
            category,
            level,
            icon,
            color,
            order: order || 0,
            visible: visible !== undefined ? visible : true,
            yearsOfExp,
          },
        });

        return res.status(201).json(newSkill);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error: any) {
    console.error('Skills API error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Skill with this name already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

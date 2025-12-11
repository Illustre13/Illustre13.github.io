import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'ndahayosibertin17@gmail.com' },
    update: {},
    create: {
      email: 'ndahayosibertin17@gmail.com',
      name: 'Bertin Ndahayosi',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create sample skills
  const skills = [
    { name: 'React', category: 'frontend', level: 90, icon: 'faReact', color: '#61DAFB', order: 1, yearsOfExp: 4 },
    { name: 'Next.js', category: 'frontend', level: 85, icon: 'faReact', color: '#000000', order: 2, yearsOfExp: 3 },
    { name: 'TypeScript', category: 'frontend', level: 88, icon: 'faCode', color: '#3178C6', order: 3, yearsOfExp: 3 },
    { name: 'Node.js', category: 'backend', level: 85, icon: 'faNodeJs', color: '#339933', order: 4, yearsOfExp: 4 },
    { name: 'PostgreSQL', category: 'database', level: 80, icon: 'faDatabase', color: '#336791', order: 5, yearsOfExp: 3 },
    { name: 'Prisma', category: 'backend', level: 85, icon: 'faDatabase', color: '#2D3748', order: 6, yearsOfExp: 2 },
    { name: 'Git', category: 'tools', level: 90, icon: 'faGitAlt', color: '#F05032', order: 7, yearsOfExp: 5 },
    { name: 'Docker', category: 'devops', level: 75, icon: 'faDocker', color: '#2496ED', order: 8, yearsOfExp: 2 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill,
    });
  }
  console.log(`✅ Created ${skills.length} skills`);

  // Create sample hero stats
  const heroStats = [
    { value: '50+', label: 'Projects Completed', icon: 'faCheckCircle', order: 1 },
    { value: '5+', label: 'Years Experience', icon: 'faCalendar', order: 2 },
    { value: '100%', label: 'Client Satisfaction', icon: 'faStar', order: 3 },
    { value: '24/7', label: 'Support Available', icon: 'faClock', order: 4 },
  ];

  for (const stat of heroStats) {
    await prisma.heroStat.create({
      data: stat,
    });
  }
  console.log(`✅ Created ${heroStats.length} hero stats`);

  // Create sample project
  const sampleProject = await prisma.project.create({
    data: {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'A modern, responsive portfolio website built with Next.js and TypeScript',
      longDesc: 'This project showcases my skills and experience in web development. Built with Next.js 14, TypeScript, Prisma, and PostgreSQL, it features a full admin dashboard for content management, blog functionality, and dynamic data rendering.',
      image: '/images/portfolio-preview.jpg',
      images: ['/images/portfolio-preview.jpg'],
      tags: ['Next.js', 'TypeScript', 'React', 'Prisma', 'PostgreSQL'],
      category: 'web',
      githubUrl: 'https://github.com/Illustre13/my-brand-new',
      liveUrl: 'https://your-portfolio.netlify.app',
      featured: true,
      status: 'completed',
      order: 1,
      authorId: admin.id,
    },
  });
  console.log('✅ Created sample project:', sampleProject.title);

  // Create sample experience
  const sampleExperience = await prisma.experience.create({
    data: {
      title: 'Full Stack Developer',
      company: 'Tech Company',
      location: 'Remote',
      startDate: new Date('2023-01-01'),
      current: true,
      description: 'Developing and maintaining full-stack web applications using modern technologies. Leading projects from conception to deployment.',
      skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
      type: 'work',
      order: 1,
      authorId: admin.id,
    },
  });
  console.log('✅ Created sample experience:', sampleExperience.title);

  // Create sample blog post
  const samplePost = await prisma.post.create({
    data: {
      title: 'Building Modern Web Applications with Next.js',
      slug: 'building-modern-web-apps-nextjs',
      excerpt: 'Learn how to build scalable, performant web applications using Next.js 14 and React Server Components.',
      content: `
        <h2>Introduction</h2>
        <p>Next.js has revolutionized the way we build web applications. With features like Server-Side Rendering (SSR), Static Site Generation (SSG), and the new App Router, it's become the go-to framework for modern React applications.</p>
        
        <h2>Why Next.js?</h2>
        <ul>
          <li>Built-in optimization for performance</li>
          <li>Automatic code splitting</li>
          <li>API routes for serverless functions</li>
          <li>Image optimization out of the box</li>
          <li>TypeScript support</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>To create a new Next.js project, simply run:</p>
        <pre><code>npx create-next-app@latest my-app</code></pre>
        
        <h2>Conclusion</h2>
        <p>Next.js provides everything you need to build production-ready web applications. Its developer experience and performance optimizations make it an excellent choice for any project.</p>
      `,
      coverImage: '/images/nextjs-blog.jpg',
      tags: ['Next.js', 'React', 'Web Development'],
      category: 'Technology',
      published: true,
      authorId: admin.id,
    },
  });
  console.log('✅ Created sample blog post:', samplePost.title);

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'Bertin Ndahayosi', type: 'text', category: 'general', description: 'Website name' },
    { key: 'site_tagline', value: 'Full Stack Developer', type: 'text', category: 'general', description: 'Site tagline' },
    { key: 'site_description', value: 'Portfolio of Bertin Ndahayosi - Full Stack Developer specializing in modern web technologies', type: 'text', category: 'seo', description: 'Site meta description' },
    { key: 'github_url', value: 'https://github.com/Illustre13', type: 'url', category: 'social', description: 'GitHub profile URL' },
    { key: 'linkedin_url', value: 'https://linkedin.com/in/yourprofile', type: 'url', category: 'social', description: 'LinkedIn profile URL' },
    { key: 'twitter_url', value: 'https://twitter.com/yourhandle', type: 'url', category: 'social', description: 'Twitter profile URL' },
    { key: 'contact_email', value: 'ndahayosibertin17@gmail.com', type: 'text', category: 'contact', description: 'Contact email address' },
    { key: 'calendly_url', value: 'https://calendly.com/your-link', type: 'url', category: 'contact', description: 'Calendly scheduling link' },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
  console.log(`✅ Created ${settings.length} site settings`);

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

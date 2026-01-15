import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faTag, faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  views: number;
  author: {
    name: string;
    email: string;
  };
}

const BlogPost: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) {
          throw new Error('Post not found');
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <Navbar />
        <div className="blog-post-loading">
          <div className="spinner"></div>
          <p>Loading post...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <Navbar />
        <div className="blog-post-error">
          <h1>Post Not Found</h1>
          <p>{error || 'The blog post you are looking for does not exist.'}</p>
          <Link href="/blog" className="back-to-blog">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <Navbar />
      
      <article className="blog-post-container">
        {/* Back Button */}
        <Link href="/blog" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Blog
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="post-cover-image">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={600}
              className="cover-image"
              priority
            />
          </div>
        )}

        {/* Post Header */}
        <header className="post-header">
          <div className="post-category">{post.category}</div>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>

          {/* Post Meta */}
          <div className="post-meta">
            <div className="meta-item">
              <FontAwesomeIcon icon={faUser} />
              <span>{post.author.name}</span>
            </div>
            <div className="meta-item">
              <FontAwesomeIcon icon={faCalendar} />
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="meta-item">
              <FontAwesomeIcon icon={faEye} />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              <FontAwesomeIcon icon={faTag} />
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Post Footer */}
        <footer className="post-footer">
          <Link href="/blog" className="back-to-blog-btn">
            <FontAwesomeIcon icon={faArrowLeft} /> View All Posts
          </Link>
        </footer>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;

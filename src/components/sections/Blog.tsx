import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowRight, faTag } from '@fortawesome/free-solid-svg-icons';


interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  createdAt: string;
  author: {
    name: string;
  };
}

const Blog: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const res = await fetch('/api/blog?limit=3');
      const data = await res.json();
      
      // Ensure data is an array and get only 3 most recent
      if (Array.isArray(data)) {
        setRecentPosts(data.slice(0, 3));
      } else {
        console.error('API did not return an array:', data);
        setRecentPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setRecentPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="blog-section brand_section" id="BLOG">
      <div className="blog-container">
        <div className="blog-header">
          <div>
            <h2 className="section-header">Latest Insights</h2>
            <p className="section-subtitle">Thoughts on tech, research, and innovation</p>
          </div>
          <Link href="/blog" className="view-all-btn">
            View All Posts
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Loading posts...</p>
          </div>
        ) : recentPosts.length === 0 ? (
          <div className="empty-state">
            <p>No blog posts yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {/* Featured Post - Left Side */}
            <div className="featured-post">
              <div className="post-image-wrapper">
                {recentPosts[0].coverImage ? (
                  <Image
                    src={recentPosts[0].coverImage}
                    alt={recentPosts[0].title}
                    width={600}
                    height={400}
                    className="post-image"
                  />
                ) : (
                  <div className="post-image-placeholder">
                    <span>{recentPosts[0].category}</span>
                  </div>
                )}
              </div>
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-category">{recentPosts[0].category}</span>
                  <span className="post-date">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    {formatDate(recentPosts[0].createdAt)}
                  </span>
                </div>
                <h3 className="post-title">{recentPosts[0].title}</h3>
                <p className="post-excerpt">{recentPosts[0].excerpt}</p>
                <div className="post-tags">
                  <FontAwesomeIcon icon={faTag} className="tag-icon" />
                  {recentPosts[0].tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${recentPosts[0].slug}`} className="read-more">
                  Read Article
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Recent Posts - Right Side */}
            <div className="recent-posts">
              <h3 className="recent-posts-header">Recent Posts</h3>
              {recentPosts.slice(1).map((post) => (
                <div key={post.id} className="recent-post-card">
                  <div className="recent-post-image-wrapper">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={120}
                        height={120}
                        className="recent-post-image"
                      />
                    ) : (
                      <div className="recent-post-image-placeholder">
                        <span>{post.category[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="recent-post-content">
                    <span className="recent-post-category">{post.category}</span>
                    <h4 className="recent-post-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="recent-post-excerpt">{post.excerpt.slice(0, 80)}...</p>
                    <div className="recent-post-meta">
                      <span className="recent-post-date">
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* View All Link */}
              <Link href="/blog" className="view-all-link">
                <span>View All Blog Posts</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faTag, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import '../../styles/blog.css';

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

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Tutorial', 'Personal', 'Research'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('API did not return an array:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
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

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-list-page">
      <Navbar />
      
      <div className="blog-list-container">
        <div className="blog-list-header">
          <Link href="/#BLOG" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="page-title">All Blog Posts</h1>
          <p className="page-subtitle">Explore my thoughts on tech, research, and innovation</p>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="empty-state">
            <p>No blog posts found in this category.</p>
          </div>
        ) : (
          <div className="blog-list-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-list-card">
                <div className="blog-list-image-wrapper">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="blog-list-image"
                    />
                  ) : (
                    <div className="blog-list-image-placeholder">
                      <span>{post.category}</span>
                    </div>
                  )}
                </div>
                
                <div className="blog-list-content">
                  <div className="blog-list-meta">
                    <span className="blog-list-category">{post.category}</span>
                    <span className="blog-list-date">
                      <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  
                  <h2 className="blog-list-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="blog-list-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-list-tags">
                    <FontAwesomeIcon icon={faTag} className="tag-icon" />
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} className="blog-list-read-more">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;

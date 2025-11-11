import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../../styles/admin.css';

interface Post {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Blog Dashboard</h1>
        <Link href="/admin/blog/new" className="btn-primary">
          Create New Post
        </Link>
      </div>

      <div className="posts-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <span className={`status ${post.published ? 'published' : 'draft'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link href={`/admin/blog/edit/${post.id}`} className="btn-edit">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

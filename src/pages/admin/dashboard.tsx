import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faProjectDiagram,
  faCode,
  faBriefcase,
  faBlog,
  faEnvelope,
  faCog,
  faSignOutAlt,
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

interface Stats {
  totalProjects: number;
  totalSkills: number;
  totalExperiences: number;
  totalPosts: number;
  unreadMessages: number;
  totalViews: number;
}

interface Post {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
  views: number;
}

interface Project {
  id: string;
  title: string;
  category: string;
  featured: boolean;
}

interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  read: boolean;
}

const AdminDashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
    totalPosts: 0,
    unreadMessages: 0,
    totalViews: 0,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      const [postsRes, projectsRes, messagesRes, skillsRes, experiencesRes] = await Promise.all([
        fetch('/api/blog'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/messages?limit=5'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/experiences'),
      ]);

      const postsData = await postsRes.json();
      const projectsData = await projectsRes.json();
      const messagesData = await messagesRes.json();
      const skillsData = await skillsRes.json();
      const experiencesData = await experiencesRes.json();

      setPosts(postsData.slice(0, 5));
      setProjects(projectsData.slice(0, 5));
      setMessages(messagesData.messages || messagesData.slice(0, 5));

      setStats({
        totalProjects: projectsData.length,
        totalSkills: skillsData.length,
        totalExperiences: experiencesData.length,
        totalPosts: postsData.length,
        unreadMessages: messagesData.messages 
          ? messagesData.messages.filter((m: Message) => !m.read).length
          : 0,
        totalViews: postsData.reduce((sum: number, post: Post) => sum + (post.views || 0), 0),
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p className="user-info">{session?.user?.email}</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Overview</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FontAwesomeIcon icon={faProjectDiagram} />
            <span>Projects</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <FontAwesomeIcon icon={faCode} />
            <span>Skills</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'experiences' ? 'active' : ''}`}
            onClick={() => setActiveTab('experiences')}
          >
            <FontAwesomeIcon icon={faBriefcase} />
            <span>Experiences</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            <FontAwesomeIcon icon={faBlog} />
            <span>Blog Posts</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Messages</span>
            {stats.unreadMessages > 0 && (
              <span className="badge">{stats.unreadMessages}</span>
            )}
          </button>

          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={() => signOut()}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Dashboard Overview</h1>
              <p>Welcome back, {session?.user?.name || 'Admin'}!</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#4CAF50' }}>
                  <FontAwesomeIcon icon={faProjectDiagram} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalProjects}</h3>
                  <p>Total Projects</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#2196F3' }}>
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalSkills}</h3>
                  <p>Skills</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#FF9800' }}>
                  <FontAwesomeIcon icon={faBlog} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalPosts}</h3>
                  <p>Blog Posts</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#F44336' }}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="stat-info">
                  <h3>{stats.unreadMessages}</h3>
                  <p>Unread Messages</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#9C27B0' }}>
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalExperiences}</h3>
                  <p>Experiences</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#00BCD4' }}>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalViews}</h3>
                  <p>Total Views</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <div className="activity-section">
                <h2>Recent Blog Posts</h2>
                <div className="activity-list">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="activity-item">
                      <div>
                        <h4>{post.title}</h4>
                        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`status ${post.published ? 'published' : 'draft'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn" onClick={() => setActiveTab('blog')}>
                  View All Posts
                </button>
              </div>

              <div className="activity-section">
                <h2>Recent Messages</h2>
                <div className="activity-list">
                  {messages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="activity-item">
                      <div>
                        <h4>{msg.firstName} {msg.lastName}</h4>
                        <p>{msg.email}</p>
                      </div>
                      {!msg.read && <span className="badge-new">New</span>}
                    </div>
                  ))}
                </div>
                <button className="view-all-btn" onClick={() => setActiveTab('messages')}>
                  View All Messages
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Projects Management</h1>
              <Link href="/admin/projects/new" className="btn-primary">
                <FontAwesomeIcon icon={faPlus} /> New Project
              </Link>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.title}</td>
                      <td><span className="category-badge">{project.category}</span></td>
                      <td>
                        {project.featured && <span className="badge-featured">Featured</span>}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link href={`/admin/projects/edit/${project.id}`} className="btn-icon">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="btn-icon btn-danger"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Skills Management</h1>
              <Link href="/admin/skills/new" className="btn-primary">
                <FontAwesomeIcon icon={faPlus} /> New Skill
              </Link>
            </div>
            <p className="coming-soon">Skills management UI coming soon...</p>
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Experiences Management</h1>
              <Link href="/admin/experiences/new" className="btn-primary">
                <FontAwesomeIcon icon={faPlus} /> New Experience
              </Link>
            </div>
            <p className="coming-soon">Experiences management UI coming soon...</p>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Blog Posts Management</h1>
              <Link href="/admin/blog/new" className="btn-primary">
                <FontAwesomeIcon icon={faPlus} /> New Post
              </Link>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Views</th>
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
                      <td>{post.views || 0}</td>
                      <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <Link href={`/admin/blog/edit/${post.id}`} className="btn-icon">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="btn-icon btn-danger"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Contact Messages</h1>
            </div>

            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-card ${!msg.read ? 'unread' : ''}`}>
                  <div className="message-header">
                    <h3>{msg.firstName} {msg.lastName}</h3>
                    <span className="message-date">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="message-email">{msg.email}</p>
                  <div className="message-actions">
                    <Link href={`/admin/messages/${msg.id}`} className="btn-sm">
                      <FontAwesomeIcon icon={faEye} /> View
                    </Link>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="btn-sm btn-danger"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Site Settings</h1>
            </div>
            <p className="coming-soon">Settings management UI coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

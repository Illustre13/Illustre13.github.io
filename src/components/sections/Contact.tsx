import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setSending(true);
    setStatus({ type: null, message: '' });

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contacts brand_section" id="CONTACTS">
      <h2 className="section-header">Get In Touch</h2>
      <p className="section-subtitle">Let&apos;s discuss your next project or just say hello</p>

      <div className="contacts_section">
        {/* Contact Information - Left Side */}
        <div className="cs_001">
          <div className="cs_004">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="cs_005">
              <h3>Call Me</h3>
              <p>
                <a href="tel:+250786949188">+250 786 949 188</a>
              </p>
            </div>
          </div>

          <div className="cs_004">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="cs_005">
              <h3>Send Me an Email</h3>
              <p>
                <a href="mailto:ndahayosibertin17@gmail.com">
                  ndahayosibertin17@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="cs_004">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="cs_005">
              <h3>Locate Me</h3>
              <p>
                <a 
                  href="https://goo.gl/maps/HabEJ49Cbf6QatdK8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kigali - RWANDA 🇷🇼
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="cs_002"></div>

        {/* Contact Form - Right Side */}
        <div className="cs_003">
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="cs_names cs_003_part">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="cs_email cs_003_part">
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="cs_007 cs_003_part">
            <textarea
              className="cs_message"
              name="message"
              rows={10}
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button 
              className="cs_send" 
              onClick={handleSubmit}
              disabled={sending}
            >
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState } from 'react';
import axios from 'axios';
import './blog.css'

function Blog() {
  const [data, setData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setData({ ...data, image: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image);

    try {
      const res = await axios.post('http://localhost:1011/api/blog/blogpost', formData);
      setMessage('✅ Blog post added successfully!');
      setData({ title: '', content: '', image: null });
    } catch (err) {
      console.error('Error submitting blog post:', err);
      setMessage('❌ Failed to add blog post');
    }
  };

  return (
    <div className="add-blog-container">
      <h1>Add Blog Post</h1>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={data.content}
            onChange={handleChange}
            rows={6}
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <div className="custom-file-upload">
            <label htmlFor="image-upload" className="upload-label" style={{ color: '#fff' }}>
              Choose File
            </label>
            <input
              type="file"
              id="image-upload"
              name="image"
              onChange={handleChange}
              required
            />
            <span className="file-name">
              {data.image ? data.image.name : 'No file chosen'}
            </span>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>

        {message && <p style={{ marginTop: '15px' }}>{message}</p>}
      </form>
    </div>
  );
}

export default Blog;

import React, { useState } from 'react';
import './add.css';
import axios from 'axios';

function Addproject() {
  const [data, setData] = useState({
    name: '',
    description: '',
    url:'',
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

  const handlesubmite = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('description', data.description);
    formdata.append('url',data.url)
    formdata.append('image', data.image);

    try {
      const res = await axios.post('http://localhost:1011/api/project/add', formdata);
      setMessage('✅ Project added successfully!');
      setData({ name: '', description: '',url:'', image: null });
    } catch (err) {
      console.error('Error submitting form:', err);
      setMessage('❌ Failed to add project');
    }
  };

  return (
    <div className="add-project-container">
      <h1>Add Project</h1>
      <form className="project-form" onSubmit={handlesubmite}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            name="url"
            value={data.url}
            onChange={handleChange}
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

export default Addproject;

import React, { useState, useEffect } from 'react';
  // Optional: your styles for the table

function List() {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1011/api/blog/blogdisplay')
      .then(res => res.json())
      .then(data => setDisplay(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div>
      <h1>Blog List</h1>

      <div className="list-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {display.map((item, i) => (
              <tr key={item.id || i}>
                <td>{item.title}</td>
                <td>{item.content}</td>
               
                <td>
                  {item.image ? (
                    <img
                      src={`http://localhost:1011/uploads/${item.image}`}
                      alt={item.title}
                      width="100"
                      style={{ borderRadius: '8px' }}
                    />
                  ) : (
                    'No image'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;

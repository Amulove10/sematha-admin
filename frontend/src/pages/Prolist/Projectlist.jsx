import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './list.css'
function Projectlist() {

  const[display,setdisplay]= useState([])

  useEffect(() => {
    fetch('http://localhost:1011/api/project/display')
      .then(res => res.json())
    .then(data => setdisplay(data))
    .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <h1>Project List</h1>

      <div className="list-container">
        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
            <th>Image</th>
          </tr>
          {display.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.url}</td>
              <td>
  <img
    src={`http://localhost:1011/uploads/${item.image}`}
    alt={item.name}
    width="100"
    style={{ borderRadius: '8px' }}
  />
</td>

            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Projectlist;

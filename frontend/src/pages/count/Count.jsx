import React, { useEffect, useState } from 'react';
import './count.css'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Area,
  AreaChart,
  
} from 'recharts';
import { Cell } from 'recharts';


function Count() {
    const [count, setCount] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    
    useEffect(() => {
        fetch('http://localhost:1011/api/dashboard/all')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response is not ok')
                }
                return res.json()
            })
            .then(data => {
                setCount(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }, [])
    if (loading) {
    return <p style={{color:'green', textAlign:'center'}}>loading .... </p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
    <div>
            <h1>Dashboard</h1>
            <div className="count-container">
                <div><h3>Blog post</h3>
                <p>{count.blog}</p></div>
                
              <div>
                <h3>Project post</h3>
                <p>{count.project}</p>
              </div>
            
            </div>
      <div className="chart-wrapper">
  <h2>📊Post Distribution</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={[
        { name: 'Blog Posts', value: count.blog },
         { name: 'Project Posts', value: count.project },
        { name: 'Employers', value: 6 }
      ]}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#4e4a4aff" stopOpacity={1} />
          <stop offset="100%" stopColor="#272bffff" stopOpacity={1} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" stroke="#214375ff" />
      <XAxis dataKey="name" stroke="#cbd5e1" />
      <YAxis stroke="#cbd5e1" />
      <Tooltip
        contentStyle={{
          backgroundColor: '#551616ff',
          borderRadius: '12px',
          border: 'none',
          color: '#f8fafc'
        }}
        labelStyle={{ color: '#ffffffff' }}
      />
      <Bar
        dataKey="value"
        radius={[10, 10, 0, 0]}
        fill="url(#barGradient)"
        barSize={50}
      >
       
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>

  </div>

    
  );
}

export default Count;

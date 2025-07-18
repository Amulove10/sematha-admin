import { Routes,Route } from 'react-router-dom'
import './App.css'
import Nav from './component/nav/Nav'
import Addproject from './pages/addpro/Addproject'
import Projectlist from './pages/Prolist/Projectlist'
import Blog from './pages/blog/Blog'
import List from './pages/bloglist/List'
// import Register from './pages/Login'

function App() {

  return (
    <>
      <Nav />
      <Routes>
        {/* <Route path='/' element={<Register/>} /> */}
        <Route path='/project' element={<Projectlist />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/bloglist' element={<List />} />
        <Route path='/addpro' element={<Addproject />}/>
      </Routes>
    </>
  )
}

export default App


import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Post from './pages/Post'
import User from './pages/User'
import MyPosts from './pages/MyPosts'
import MainRoute from './MainRoute'
function App() {

  return (
    <div className=' py-4'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<MainRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/myposts' element={<MyPosts />} />
          <Route path='/:postId' element={<Post />} />
          <Route path='/user' element={<User />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

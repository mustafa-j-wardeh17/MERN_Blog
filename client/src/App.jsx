
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Post from './pages/Post'
import User from './pages/User'
import MyPosts from './pages/MyPosts'
import MainRoute from './MainRoute'
import axios from 'axios'
import CreatePost from './pages/CreatePost'
import Layout from './Helper/Layout'
import AuthRoute from './AuthRoute'

axios.defaults.baseURL = "http://localhost:8016"
axios.defaults.withCredentials = true;

function App() {

  return (
    <div className=''>
      <Routes>
        {/* <Route element={<AuthRoute  />}> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<MainRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/myposts' element={<MyPosts />} />
          <Route path='/:postId' element={<Post />} />
          <Route path='/user' element={<User />} />
          <Route path='/createpost' element={<CreatePost />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </div>
  )
}

export default App

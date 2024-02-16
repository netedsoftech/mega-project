import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth'
import { logout, login } from './store/authSlice'
import {Header, Footer}  from './components/'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

console.log(import.meta.env.VITE_APPWRITE_URL)
 return !loading ? (
  <div className='min-h-screen flex flex wrap content-between '>
    <div className="w-full block">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
 ) : null
}

export default App
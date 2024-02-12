
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth'
import { logOut, login } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
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
        dispatch(logOut())
      }
    })
    .finally(() => setLoading(false))
  }, [])

console.log(import.meta.env.VITE_APP_APPWRITE_URL)
 return !loading ? (
  <div className='min-h-screen flex flex wrap content-between '>
    <div className="w-full block">
      <Header/>
      {/* <main>
        <Outlet/>
      </main> */}
      <Footer/>
    </div>
  </div>
 ) : null
}

export default App

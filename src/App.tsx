import { Routes, Route } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { CreatPostPage } from './pages/CreatePostPage'


function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
     <Navbar />
      <div className="container mx-auto px-4 py-6 ">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<CreatPostPage />}/>
          <Route path="/post:id" element={<CreatPostPage />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

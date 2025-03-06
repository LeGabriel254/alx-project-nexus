import { Routes, Route } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { CreatPostPage } from './pages/CreatePostPage'
import { CreateCommunityPage } from './pages/CreateCommunityPage'
import { CommunitiesPage } from './pages/CommunitiesPage'
import { CommunityPage } from './pages/CommunityPage'


function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
     <Navbar />
      <div className="container mx-auto px-4 py-6 ">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<CreatPostPage />}/>
          <Route path="/post:id" element={<CreatPostPage />}/>
          <Route path="/community/create" element={<CreateCommunityPage />}/>
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/community/:id" element={<CommunityPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

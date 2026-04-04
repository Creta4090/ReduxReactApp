import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'
import PostsList from './features/posts/PostsList'
import AgData from './components/AgData'
import About from './lowComponent/about';
import Login from './components/Login';
import Home from './lowComponent/home';
import ContactForm from './components/contactform';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<ProtectedRoute><PostsList /></ProtectedRoute>} />
            <Route path="/photos" element={<ProtectedRoute><AgData /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><ContactForm /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

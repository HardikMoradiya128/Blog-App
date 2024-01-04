import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Blog/Navbar';
import Home from './Blog/Home';
import SignUp from './Blog/SignUp';
import Login from './Blog/Login';
import CreateBlog from './Blog/CreateBlog';
import BlogCategory from './Blog/BlogCategory';
import BlogDetail from './Blog/BlogDetail';
import MyBlogCard from './Blog/MyBlogCard';
import Protect from './Blog/Protect';
import Footer from './Blog/Footer'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/category/:name" element={<BlogCategory />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/myblog" element={<Protect><MyBlogCard /></Protect>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

// live-react-blod-app.netlifly.app
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop"
import Features from "./pages/Features"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Contact from "./pages/Contact"

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route index element={<Navigate replace to= "home" />}/>
          <Route path="home" element={<Home/>}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/features" element={<Features/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

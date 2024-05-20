 import React from 'react';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/about';
 
 export default function App() {
   return (
    <BrowserRouter>
    <Routes>

      <Route path='./pages' element = {<Home />}/>
      <Route path='./pages' element = {<SignIn />}/>
      <Route path='./pages' element = {<SignUp />}/>
      <Route path='./pages' element = {<About />}/>

     <div><h1 className = 'text-red'>App</h1></div>

     </Routes>
    </BrowserRouter>
   )
 }
 
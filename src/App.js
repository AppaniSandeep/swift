
import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';


const App = () => {
  
  const [commentsData,setCommentsData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments")
        if (response.ok){
          const data = await response.json();
          setCommentsData(data)
        }

      }catch (e){
        console.log(e.message)
      } 
    }
    fetchData();
  },[])


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element= {<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard commentsData={commentsData}/>}/>
        </Routes> 
    </div>
    </Router>
  );
}

export default App;

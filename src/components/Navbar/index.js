import React, {useEffect,useState} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [profileData,setProfileData] = useState({})
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await fetch("https://jsonplaceholder.typicode.com/users")
                  if (response.ok){
                      const result = await response.json();
                      console.log(result[0])
                      setProfileData(result[0])
                  }
              }catch (e){
                  console.log(e.message)
              }
          };
          fetchData();
      },[])
  
  
      if (!profileData){
          return <p>Loading...</p>
      }else{
          
      }
      const {name} = profileData
      const intialFirstChar = name ? name.split(" ")[0][0].toUpperCase() : ""
      const nameFirstChar = name ? name.split(" ")[1][0].toUpperCase() : ""
  
 
  return (
    <nav className='navbar navbar-expand-lg' style={{backgroundColor:"#141332"}}>
      <div className="container-fluid d-flex justify-content-between align-items-center p-3 border-bottom" style={{ backgroundColor: "#14132e" }}>
        <h1 className="text-white m-0">SWIFT</h1>
        <Link to="/" className='text-decoration-none'>
          <div className="d-flex align-items-center gap-3 text-white">
            <div className="bg-white text-black rounded-pill d-flex justify-content-center align-items-center" style={{ width: "36px", height: "36px", fontWeight: "bold" }}>{intialFirstChar}{nameFirstChar}</div>
            <p className="mb-0">{name}</p>
          </div>
        </Link>
      </div>
    </nav>
   )
}

export default Navbar;

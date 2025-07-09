import React, { useEffect,useState } from 'react'

import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Profile = () => {

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
    const {id,name,email,phone,address} = profileData
    const intialFirstChar = name ? name.split(" ")[0][0].toUpperCase() : ""
    const nameFirstChar = name ? name.split(" ")[1][0].toUpperCase() : ""

  return (
    <div className='container mt-4'>
      <div className='d-flex align-items-center mb-4'>
        <Link to="/dashboard" >
            <FaArrowLeft/>
        </Link>
        <h4>Welcome, {name}</h4>
      </div>
      <div className='card shadow-sm p-4'>
        <div className='row g-4 align-items-center mb-4'>
            <div className='col-auto'>
                <div className='rounded-circle bg-primary text-white d-flex align-items-center justify-content-center' style={{width:"60px", height:"60px", fontSize:"24px"}}>{intialFirstChar}{nameFirstChar}</div>
            </div>
            <div className='col'>
                <h5 className='mb-1'>{name}</h5>
                <p className='text-muted mb-0'>{email}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-6 mb-3'>
                <div className='mb-2'>
                    <label className='form-label fw-bold'>User ID</label>
                    <p className='text-muted mb-0'>{id}</p>
                </div>
                <div className='mb-2'>
                    <label className='form-label fw-bold'>Email ID</label>
                    <p className='text-muted mb-0'>{email}</p>
                </div>
                <div className='mb-2'>
                    <label className='form-label fw-bold'>Phone</label>
                    <p className='text-muted mb-0'>{phone}</p>
                </div>
            </div>
            <div className='col-md-6 mb-3'>
                <div className='mb-2'>
                    <label className='form-label fw-bold'>Name</label>
                    <p className='text-muted mb-0'>{name}</p>
                </div>
                <div className='mb-2'>
                    <label className='form-label fw-bold'>Address</label>
                    {address && (<p className='text-muted mb-0'>{address.street}, {address.suite}, {address.city}</p>)}
                </div>
            </div>
        </div>
      </div>
    </div>

  )
}

export default Profile

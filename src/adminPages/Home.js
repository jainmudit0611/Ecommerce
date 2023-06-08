import React, { useEffect, useState } from 'react';
import './admin.css'
import { useLocation } from 'react-router-dom';

const Home = () => {
  let loc = useLocation();
  const [user, setUser] = useState(0)
  const [admin, setAdmin] = useState(0)
  const [prod, setProduct] = useState(0)

  const UserCount = () => {
    if (localStorage.getItem("userData")) {
      let userC = JSON.parse(localStorage.getItem('userData'));
      setUser(userC ? userC.length : 0)
    }
  }

  const AdminCount = () => {
    if (localStorage.getItem('adminData')) {
      let adminC = JSON.parse(localStorage.getItem('adminData'))
      setAdmin(adminC ? adminC.length : 0)
    }
  }

  const ProductCount = () => {
    if (localStorage.getItem('productD')) {
      let prodC = JSON.parse(localStorage.getItem('productD'))
      setProduct(prodC ? prodC.length : 0)
    }
  }

  useEffect(() => {
    UserCount();
    AdminCount();
    ProductCount();
  }, [loc])

  return (
    <div className='d-flex justify-content-around mt-5'>
      <div className='dash'>
        <h3>User Count</h3>
        <h5>{user}</h5>
      </div>

      <div className='dash'>
        <h3>Admin Count</h3>
        <h5>{admin}</h5>
      </div>

      <div className='dash'>
        <h3>Products Count</h3>
        <h5>{prod}</h5>
      </div>
    </div>
  )
}

export default Home;
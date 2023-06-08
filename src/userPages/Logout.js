import React from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = ({setLoginData}) => {

    const navigate = useNavigate();
    setLoginData()
    navigate("/");
  return (
    <div>

    </div>
  )
}

export default Logout;

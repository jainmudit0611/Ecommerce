import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({AdminLoginData , setAdminLoginData}) => {

    const handleLogout =()=>{
        setAdminLoginData()
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid ">
                    <div className="d-flex justify-content-end"><Link className="navbar-brand" to="">Admin Panel</Link></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 font-weight-bolder mx-5 px-5">

                            {AdminLoginData && <>
                            <li className="nav-item px-4">
                                <Link className="nav-link pl-4" to="/admin/home">Home</Link>
                            </li>

                            <li className="nav-item px-4">
                                <Link className="nav-link pl-4" to="/admin/products">Products</Link>
                            </li>

                            <li className="nav-item px-4">
                                <Link className="nav-link pl-4" to="/admin/userdata">User Data</Link>
                            </li>

                            <li className="nav-item px-4">
                                <Link className="nav-link pl-4" to="/admin/" onClick={handleLogout}>Logout</Link>
                            </li>
                            </>}

                            {!AdminLoginData &&<>
                            <li className="nav-item px-4">
                                <Link className="nav-link pl-4" to="/admin/register">Register</Link>
                            </li>

                            <li className="nav-item px-4 mt-1">
                                <button type="button" className="btn btn-primary btn-sm"><Link to="/admin/" className="text-dark">Login</Link></button>
                            </li>
                            </>}
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Nav;
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Nav = ({ LoginData, setLoginData }) => {
    let loc = useLocation();
    const [cartCount, setCartCount] = useState(0)

    const handleLogout = () => {
        setLoginData('')
    }

    const cartCountHandle = () => {
        if (JSON.parse(localStorage.getItem("cartData"))) {
            let countC = JSON.parse(localStorage.getItem("cartData"));

            let userid = LoginData && LoginData[0] ? LoginData[0].id : 0
            let ncountC = countC.filter((data) => data.userId === userid);
            setCartCount(ncountC.length)
        }
    }

    useEffect(() => {
        // console.log("login",LoginData);
        cartCountHandle();
    }, [loc])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid ">
                    <div className="d-flex justify-content-end"><Link className="navbar-brand" to="">User Panel</Link></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* {JSON.stringify(LoginData)} */}
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 font-weight-bolder mx-5 px-5">


                            <li className="nav-item px-4">
                                <Link className="nav-link pl-4" to="/home">Home</Link>
                            </li>

                            <li className="nav-item px-4">
                                <Link className="nav-link pl-4" to="/contact">Contact</Link>
                            </li>

                            {LoginData && <>
                                <li className="nav-item px-4">
                                    <Link className="nav-link pl-4" to="/cart"><ShoppingCartIcon />{cartCount}</Link>
                                </li>
                                <li className="nav-item px-4">
                                    <Link className="nav-link pl-4" to="/" onClick={handleLogout}>Logout</Link>
                                </li>
                            </>}
                            {!LoginData && <>
                                <li className="nav-item px-4">
                                    <Link className="nav-link pl-4" to="/register">Register</Link>
                                </li>

                                <li className="nav-item px-4 mt-1">
                                    <Link to="/" className="text-dark"><button type="button" className="btn btn-primary btn-sm">Login</button></Link>
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
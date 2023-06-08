import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// User Pages
import HomeU from './userPages/Home.js';
import ContactU from './userPages/Contact.js';
import CartU from './userPages/Cart.js';
import RegisterU from './userPages/Register.js';
import LoginU from './userPages/Login.js';
import LogoutU from './userPages/Logout.js';

//Admin Pages
import HomeA from './adminPages/Home.js';
import ProductsA from './adminPages/Products.js';
import UserDataA from './adminPages/UserData.js';
import RegisterA from './adminPages/Register.js';
import LoginA from './adminPages/Login.js';
import LogoutA from './adminPages/Logout.js';

//Common Pages
import Error from './common/Error.js';
import NavUser from './common/NavUser';
import NavAdmin from './common/NavAdmin';

function App() {

  const [LoginData, setLoginData] = useState()

  const [AdminLoginData, setAdminLoginData] = useState()

  // const [ManageData, setManageData] = useState({
  //   loginData: '',
  //   adminLoginData: '',
  //   cartData: 0,
  //   userCount: 0,
  //   adminCount: 0,
  //   productCount: 0
  // })

  return (
    <>

      <Routes>

        {/* User Panel */}

        <Route path='/home' element={<><NavUser LoginData={LoginData} setLoginData={setLoginData} /> <HomeU LoginData={LoginData} /></>} />
        <Route path='/contact' element={<><NavUser LoginData={LoginData} setLoginData={setLoginData} /><ContactU /> </>} />
        <Route path='/cart' element={<><NavUser LoginData={LoginData} setLoginData={setLoginData} /><CartU LoginData={LoginData} /> </>} />
        <Route path='/register' element={<><NavUser LoginData={LoginData} setLoginData={setLoginData} /><RegisterU /></>} />
        <Route path='/login' element={<><NavUser LoginData={LoginData} /><LogoutU setLoginData={setLoginData} /></>} />
        <Route path='/' element={<><NavUser LoginData={LoginData} /><LoginU setLoginData={setLoginData} /> </>} />
        <Route path='*' element={<><Error /> </>} />


        {/* Admin Panel */}

        <Route path='/admin/home' element={<> <NavAdmin AdminLoginData={AdminLoginData} setAdminLoginData={setAdminLoginData} /><HomeA /> </>} />
        <Route path='/admin/products' element={<> <NavAdmin AdminLoginData={AdminLoginData} setAdminLoginData={setAdminLoginData} /><ProductsA /> </>} />
        <Route path='/admin/userdata/' element={<> <NavAdmin AdminLoginData={AdminLoginData} setAdminLoginData={setAdminLoginData} /><UserDataA /> </>} />
        <Route path='/admin/register' element={<> <NavAdmin AdminLoginData={AdminLoginData} setAdminLoginData={setAdminLoginData} /><RegisterA /> </>} />
        <Route path='/admin/login' element={<> <NavAdmin AdminLoginData={AdminLoginData} /><LogoutA setAdminLoginData={setAdminLoginData} /> </>} />
        <Route path='/admin/' element={<> <NavAdmin AdminLoginData={AdminLoginData} /><LoginA setAdminLoginData={setAdminLoginData} /> </>} />
        <Route path='/admin/*' element={<> <NavAdmin AdminLoginData={AdminLoginData} setAdminLoginData={setAdminLoginData} /><Error /> </>} />

      </Routes>
    </>
  );
}

export default App;

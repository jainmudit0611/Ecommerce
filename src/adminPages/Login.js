import { useState, React } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setAdminLoginData}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const history = useNavigate();

  const logSubmit =(e)=>{
    e.preventDefault();
    if(email!=='' && password !== ''){
      if(checkAdmin(email ,password)){
        alert("Login successful")
        history("/admin/home")
      }else{
        alert("Invalid")
      }
    }else{
      alert("Enter email and password required")
    }
  }

  const checkAdmin = (email,password)=>{
    if(JSON.parse(localStorage.getItem("adminData"))){
      let adminData = JSON.parse((localStorage.getItem("adminData")))
      let checkAdm = adminData.filter((data,i)=> data.email === email && data.password === password)
      if(checkAdm && checkAdm.length!==0){
        setAdminLoginData(checkAdm)
        return true
      }else{
        setAdminLoginData()
        return false;
      }
    }
    setAdminLoginData()
    return false;
  }


  return (
    <>

      <h1 className="d-flex justify-content-center mt-4">Login...</h1>
      <div className="container d-flex justify-content-center">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <form onSubmit={logSubmit}>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} id="email" placeholder="Enter email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control" id="pwd" onChange={e => setPassword(e.target.value)} placeholder="Enter password" name="pwd" />
            </div>

            <button type="submit" className="btn btn-default border border-dark">Login</button>
          </form>
        </div>
        <div className="col-sm-4"></div>
      </div>

    </>
  )
}

export default Login;
import { useState, React } from "react";

import { useNavigate } from "react-router-dom";


const Register = () => {

  const history = useNavigate();

  const [user, setUser] = useState({ name: "", password: "", email: "", number: "", img: "" ,id:0 });

  const inputHandle = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setUser({ ...user, [name]: value })
  }


  const registerSubmit = (e) => {
    e.preventDefault();

    if (user.name === "") {
      alert("name Mandatory");
      return false;
    }
    if (user.password === "") {
      alert("password Mandatory");
      return false;
    }
    if (!user.email) {
      alert("email Mandatory");
      return false;
    }
    if (!user.number) {
      alert("number Mandatory");
      return false;
    }
    if (!user.img) {
      alert("img Mandatory");
      return false;
    }

    let registrationD = [];

    if (localStorage.getItem("userData")) {
      registrationD = JSON.parse(localStorage.getItem("userData"));
    }
    
    registrationD.push({ ...user, 'id': registrationD.length + 1 })

    localStorage.setItem("userData", JSON.stringify(registrationD))
    alert("User saved");

    // console.log(user);

    history("/home")
    return false;

  }

  const imageHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const base64String = reader.result;
        setUser({...user,'img':base64String})
    };
    reader.readAsDataURL(file)
}



  return (
    <>

      <h1 className="d-flex justify-content-center mt-4">Registration Form...</h1>
      <div className="container d-flex justify-content-center">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <form onSubmit={registerSubmit}>
            <div className="form-group">
              <label >Name:</label>
              <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={inputHandle} name="name" value={user.name} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="text" className="form-control" id="pwd" placeholder="Enter password" name="password" onChange={inputHandle} value={user.password} />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" className="form-control" id="email" onChange={inputHandle} placeholder="Enter email" name="email" value={user.email} />
            </div>

            <div className="form-group">
              <label>Number:</label>
              <input type="number" className="form-control" id="number" onChange={inputHandle} placeholder="Enter number" name="number" value={user.number} />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input type="file" className="form-control" id="img" onChange={(e) => imageHandle(e)} name="img" />
            </div>

            <button type="submit" className="btn btn-default border border-dark">Submit</button>
          </form>
        </div>
        <div className="col-sm-4"></div>
      </div>

    </>
  )

}
export default Register;



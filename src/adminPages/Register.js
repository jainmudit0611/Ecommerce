import { useState, React } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const history = useNavigate();

  const [admin, setAdmin] = useState({ name: "", password: "", email: "", number: "", img: "", id: 0 });

  const inputHandle = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setAdmin({ ...admin, [name]: value })
  }



  const adminRegisterSubmit = (e) => {
    e.preventDefault();

    if (admin.name === "") {
      alert("name Mandatory");
      return false;
    }
    if (admin.password === "") {
      alert("password Mandatory");
      return false;
    }
    if (!admin.email) {
      alert("email Mandatory");
      return false;
    }
    if (!admin.number) {
      alert("number Mandatory");
      return false;
    }
    if (!admin.img) {
      alert("img Mandatory");
      return false;
    }

    let adminRegistrationD = [];

    if (localStorage.getItem("adminData")) {
      adminRegistrationD = JSON.parse(localStorage.getItem("adminData"));
    }

    adminRegistrationD.push({ ...admin, 'id': adminRegistrationD.length + 1 })

    localStorage.setItem("adminData", JSON.stringify(adminRegistrationD))
    alert("Admin saved");

    // console.log(admin);

    history("/admin/login")
    return false;

  }

  const imageHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setAdmin({ ...admin, 'img': base64String })
    };
    reader.readAsDataURL(file)
  }

  return (
    <>

      <h1 className="d-flex justify-content-center mt-4">Admin Registration Form...</h1>
      <div className="container d-flex justify-content-center">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <form onSubmit={adminRegisterSubmit}>
            <div className="form-group">
              <label >Name:</label>
              <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={inputHandle} name="name" value={admin.name} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="text" className="form-control" id="pwd" placeholder="Enter password" name="password" onChange={inputHandle} value={admin.password} />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" className="form-control" id="email" onChange={inputHandle} placeholder="Enter email" name="email" value={admin.email} />
            </div>

            <div className="form-group">
              <label>Number:</label>
              <input type="number" className="form-control" id="number" onChange={inputHandle} placeholder="Enter number" name="number" value={admin.number} />
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
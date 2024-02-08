
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { logic } from '../logic/logic.js';
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumber } from 'libphonenumber-js';

let img = {};

const Manipulate = ({ onInsert, rawUpdateData, display, showUpdateBtn }) => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [emailId, setEmailId] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState(0);
  const [isValidPhoneNo, setIsValidPhoneNo] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    displayAll();
  }, []);

  useEffect(() => {
    let btn1 = document.querySelector("#insertBtn");
    let btn2 = document.querySelector("#updateBtn");

    if(btn1 !== null || btn1!= undefined)
    {
    if(btn1.len && btn2.len)
    if (
      name?.trim() !== "" &&
      phoneNo !== undefined &&
      emailId?.trim() !== "" &&
      position?.trim() !== "" &&
      address?.trim() !== "" &&
      salary?.toString().trim() !== ""
    ) {
      btn1.disabled = false;
      btn2.disabled = false;
      setIsFormValid(true);
    } else {
      btn1.disabled = true;
      btn2.disabled = true;
      setIsFormValid(false);
    }
  }
  }, [name, phoneNo, emailId, position, address, salary]);

  useEffect(() => {
    console.log("props = ",rawUpdateData);
    if(rawUpdateData!=null && rawUpdateData!=undefined )
    {
    setId(rawUpdateData.eID);
    setName(rawUpdateData.eName);
    setPhoneNo(rawUpdateData.ePhoneNo);
    setEmailId(rawUpdateData.eEmailID);
    setPosition(rawUpdateData.ePosition);
    setAddress(rawUpdateData.eAddress);
    setSalary(rawUpdateData.esalary);
    }
  }, [rawUpdateData, display])


  let check = (event) => {
    img = event.target.files[0];
  }

  let convertImage = async () => {
    if (img) {
      let image = await logic.encodeImageToBase64(img);
      console.log("image conversation to string successful");
      return image;
    }

    throw new Error("image conversation to string was unssessfull");
  };

  let update = async () => {
    let image = await convertImage();
    let data = {
      "eID": id,
      "eName": name,
      "ePhoneNo": phoneNo,
      "eEmailID": emailId,
      "ePosition": position,
      "eAddress": address,
      "eSalary": salary,
      "ePhoto": image
    };
    console.log("sending data to parents to update", update);
    await logic.updateData(data);
    display();
    navigate("/details");
  }

  function displayAll() {
    let data = {
      "eID": id,
      "eName": name,
      "ePhoneNo": phoneNo,
      "eEmailID": emailId,
      "ePosition": position,
      "eAddress": address,
      "eSalary": salary,
      "ePhoto": img
    };
  }

  let fetchDataFromInputs = async () => {
    console.log("phone no", phoneNo);
    const phoneNumber = parsePhoneNumber(phoneNo, { defaultCountry: 'IN' });

    if (!phoneNumber.isValid()) {
      setIsValidPhoneNo(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    console.log("email id", emailId);
    let isValid = emailRegex.test(emailId);
    console.log("email id valid or not = ", isValid);

    if (!isValid) {
      setIsValidEmail(false);
      return;
    }
    console.log("email id and phone no is valid");
    let finalImage = await convertImage();
    let data = {
      "eID": id,
      "eName": name,
      "ePhoneNo": phoneNo,
      "eEmailID": emailId,
      "ePosition": position,
      "eAddress": address,
      "eSalary": salary,
      "ePhoto": finalImage
    };
    console.log("printing image before inset", finalImage);
    console.log("sending data to parents to insert", data);
    onInsert(data);
  }

  let clearInputs = () => {

    document.querySelector("#ename").value = "";
    document.querySelector("#eaddress").value = "";
    document.querySelector("#esalary").value = "";
  }

  const setPhoneNumber = (num) => {
    console.log("inside", num);
    if (handleOnlyNumber(num)) {
      setPhoneNo(num)
    }
  }

  let handleOnlyNumber = (num) => {
    console.log("num = ", num);

    console.log("type of", typeof (num));
    if (num === "") {
      return true;
    }
    const isValid = /^[0-9]*$/.test(String(num));
    if (isValid) {
      return true;
    }
    else {
      console.error("it is not number", num);
      return false;
    }
  };


  return (
    console.log('##phone', phoneNo),
    <div className="App d-flex flex-column align-items-center">
      <h1 >Enter Employee Details</h1>

      <form className="mx-auto">
        <table className="table">
          <tbody>

            <tr>
              <td>
                <div className="form-group d-flex align-items-center">
                <span className="text-danger">*</span><label htmlFor="ename">Employee Name</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" id="ename" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter Employee Name" />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group d-flex align-items-center">
                <span className="text-danger">*</span><label htmlFor="ePhoneNo">Employee Phone No</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input type="tel" className="form-control form-control-lg" id="ePhoneNo" value={phoneNo} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter Employee Phone Number" />
                  {!isValidPhoneNo && (
                    <div className="error-message text-danger">Invalid Phone Number</div>
                  )}
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group d-flex align-items-center">
                <span className="text-danger">*</span><label htmlFor="eEmailID">Employee Email Id</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" id="eEmailID" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} placeholder="Enter Employee Email Id" />
                  {!isValidEmail && (
                    <div className="error-message text-danger">Invalid email address</div>
                  )}
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group d-flex align-items-center">
                <span className="text-danger">*</span> <label htmlFor="position">Employee Position</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" id="position" value={position} onChange={(e) => { setPosition(e.target.value) }} placeholder="Enter Employee Position" />
                </div>
              </td>
            </tr>


            <tr>
              <td>
                <div className="form-group d-flex align-items-center">
                <span className="text-danger">*</span><label htmlFor="eaddress">Employee address</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" id="eaddress" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Enter Employee Address" />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group d-flex align-items-center">
                <span className="text-danger">*</span><label htmlFor="esalary">Employee Salary</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                <input type="text" className="form-control form-control-lg" id="esalary" value={salary} onChange={(e) => { let data = handleOnlyNumber(e.target.value); if (data) { setSalary(e.target.value); } }} placeholder="Enter Employee Salary" />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="form-group">
                  <label htmlFor="image">Employee image</label>
                </div>
              </td>
              <td>
                <div className="form-group">
                  <input type="file" className="form-control form-control-lg" accept="image/jpg, image/jpeg" id="image" onChange={(e) => { check(e) }} placeholder="Enter Employee Salary" />
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
      <br /><br />
      <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginRight: "2rem" }}>
        {showUpdateBtn ? (
          <button type="button" id="updateBtn" className="btn btn-primary m-3"  onClick={update} >Update</button>
        ) : null
        }
        <button type="button" className="btn btn-primary m-3" onClick={() => { clearInputs() }}>Clear</button>
        {
          !showUpdateBtn ? (
            <button type="button" id="insertBtn" className="btn btn-primary m-3" onClick={() => fetchDataFromInputs()}>Insert</button>
          ) : null
        }
      </div>
    </div>
  );



}


export default Manipulate;


import { Table } from "react-bootstrap";
import "bootstrap";
import React, { useState, useEffect } from "react";
import updateInputs from "./Manipulate.js";
import "./style.css";
import {logic} from "../logic/logic.js";

const Bottom=(props)=> {
  const [data,setData]=useState([]);

  const handleUpdateClick = (item) => {
    console.log("sending data for updation in app.js",item);
    props.onUpdate(item);
  };

  const handleDeleteClick = async (eID) => {
    let info=await logic.deleteData(eID);
    setData(info);

  };
  let display =async ()=>
  {
    let data= await logic.fetchAll();
    setData(data);
  }

  useEffect( ()=>{
    display();
  },[]);


const giveFirstLetter=(name)=>{
  if (name && typeof name === 'string') {
    return <div id="letter">
      {name.charAt(0).toUpperCase()}
    </div>
} 
throw new Error("Error : cannot get first letter of ",name);
};


  return (
    <div className="main ">
      {data && data.length ? (
        data.map((item, id) => (
            <div key={id} id="idcard">
              <div id="photo">
              {(item.ePhoto=="empty" || item.ePhoto=="") ? giveFirstLetter(item.eName): <img src={(`data:image/jpeg;base64,${item.ePhoto}`)} alt="JPEG Image" />}
              </div>
              <div>Employee NO: {item.eID} </div>
              <div>Employee Name: {item.eName} </div>
              <div>Employee Phone No: {item.ePhoneNo} </div>
              <div>Employee Email ID: {item.eEmailID} </div>
              <div>Employee Position: {item.ePosition} </div>
              <div>Employee Address: {item.eAddress} </div>
              <div>Employee Salary: {item.eSalary} </div>
              <div id="btn">
              <button type="button"  style={{ padding: '8px' }} className="btn btn-primary mb-2 d-block" onClick={() => {console.log("update button clicked"); handleUpdateClick(item) }}>
                Update
              </button>
              <button type="button"  style={{ padding: '8px' }} className="btn btn-danger d-block" onClick={() => { handleDeleteClick(item.eID) }}>
                Delete
              </button>
              </div>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    
  );
      }
export default Bottom;
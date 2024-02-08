import logo from './logo.svg';
import './App.css';
import Manipulate from "./components/Manipulate.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import { Route, Routes,useNavigate } from 'react-router-dom';
import SideBar from "./components/sideBar.js";
import Idcard from "./components/IDcards.js";
import { logic } from './logic/logic.js';


function App() {
  const [allIdCardData, setAllIdCardData] = useState([]);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const navigate = useNavigate();

  let insert=async (info)=> {
    let data=await logic.insertData(info);
    setAllIdCardData(data);
    navigate("/details");
  }

  let display =async ()=>
  {
    let data= await logic.fetchAll();
    setAllIdCardData(data);
  }

  useEffect (() => {
    display();
    setShowUpdateBtn(false);
    navigate("/details");
  },[]);

  let handleUpdate =(data)=>
  {
    console.log("in app js updating data",data);
    setShowUpdateBtn(true);
    setAllIdCardData(data);
    console.log("in handle update",data.eID);
    navigate(`/update/${data.eID}`);
  }

  return (
    <>
    <div id="screen">
      <div id="left">
      <SideBar />
      </div>
      <div id="right">
      {
        <Routes>
          <Route path="/"/>
        <Route  path="/details"  element={<Idcard onUpdate={handleUpdate} allIdCardData={allIdCardData} />} />
        <Route path="/insert" element={<Manipulate onInsert={insert} />} />
        <Route path="/update/:id" element={<Manipulate rawUpdateData={allIdCardData} display={display} showUpdateBtn={showUpdateBtn} />} />
         </Routes>
      }
      </div>
    </div>
    
    
    </>
  );
}

export default App;

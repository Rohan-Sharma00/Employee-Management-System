
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useNavigate } from "react-router-dom"; 


let Insert=()=>
{
    const navigate = useNavigate();


    return(
        <div className="text-center mt-5">
        <h1>Click below to insert record</h1>
        <button type="button"  style={{ padding: '8px' }} className="btn btn-primary" onClick={() => { navigate("/insert") }}>
              Insert Record
            </button>
            <br/><br/><br/>
            </div>
    );
}

export default Insert;
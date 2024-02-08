
import Manipulate from "./Manipulate.js";
import Insert from "./Insert.js";
import IDcards from "./IDcards.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logic } from '../logic/logic.js';

const Home=({update, allIdCardData})=>
{

  let  handleUpdate=(data)=>
  {
    update(data);
  }


  
    return (
        <div>

        <Insert onInsert={logic.insertData}  updateData={logic.updateData}/>
        <IDcards onUpdate={handleUpdate} allIdCardData={allIdCardData} />
        </div>
      );
}

export default Home;
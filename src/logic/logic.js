

let updateInputs=(data)=> {
    console.log("in update inputes", data);
}


const updateData = async (data) => {
    console.log("in update data",data);
    let id = data.eID;
    if (data.hasOwnProperty('_id')) {
        delete data._id;
    }
    let resp = await fetch(`http://localhost:5000/${id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let finalResp = await resp.json();
    console.log("finalresponse in insert", finalResp);
    if (finalResp.acknowledged && finalResp.modifiedCount>0) {
        console.log("update successfull");
       
    }
    else {
        console.log("update was not successfull");
    }
};

 let insertData=async (data) => {
    console.log("in insert start", data);
    let resp = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log("-------------resp in insert", resp);

    let finalResponse = await resp.json();
    console.log("finalresponse in insert", finalResponse);
    if (finalResponse._id) {
        console.log("data inserted successfully");
        return await fetchAll();
    }
    else {
        throw new Error("Error : failed to insert data");
    }

}

let encodeImageToBase64=(file)=> {
    console.log("encodeImageToBase64 +++++ = ",file);

    return new Promise((resolve, reject) => {
        console.log("f!('name' in file) ",  !('size' in file));
        console.log(" !('size' in file)", !('size' in file));
        
        if ( !('name' in file) || !('size' in file)) {
        resolve("empty");
      }
  
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
  
      reader.onerror = (error) => {
        reject(new Error('Error reading file: ' + error));
      };
  
      reader.readAsDataURL(file);
    });
  }

 let fetchAll=async()=> {
    let data = await fetch("http://localhost:5000");
    let resp = await data.json();
    return resp;
}


 let deleteData=async(id)=> {
    console.log("delete id", id);
    if (!id) {
        console.log("invalid id for deletion");
        return;
    }
    let data = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
    });
    let resp = await data.json();
    if (resp.acknowledged && resp.modifiedCount>0) {
        console.log("delete data", resp);
        return await fetchAll();
    }
    else {
        console.log("Error : data failed to delete");
    }
}

export const logic = {
    deleteData,
    fetchAll,
    insertData,
    updateData,
    updateInputs,
    encodeImageToBase64
};
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  let navigate = useNavigate();

  const handleFileChange = (e) =>{
    setSelectedFile(e.target.files[0])
  }


  const handleSubmit = async (e) =>{

    e.preventDefault();
    if(!selectedFile){
      alert("you should select a file");
      return
    }

    const formData = new FormData();
    formData.append('file', selectedFile)

    try{

       await axios.post('http://localhost:4000/upload',
       formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
       }); 

       navigate('/')

    }catch(error){
      console.log(error)
    }
  }


return (
  <>      
    <section class="contact__page">
        <div class="contact__warp">
          <div class="row">
            <div class="col-md-6">
              <h2>Upload an image</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} class="contact__form">
            <div className="Upload__image-section">
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"   
                    onChange={handleFileChange}               
                  />
            </div>
            <button  class="site-btn">Upload</button>
          </form>
        </div>
      </section>
  </>
         );
        }
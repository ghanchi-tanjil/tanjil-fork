import React ,{useState} from 'react';
import axios from 'axios';
import { forEach, isEmpty } from 'lodash';

function ProductForm() {
    const [title,setTitle] = useState("");
    const [desctiption,setDesctiption] = useState("");
    const [price,setPrice] = useState(0);
    const [images,setImages]= useState([]);
    const [imagesFile,setImagesFile]= useState([]);
    const [error,setError]= useState("");
    
    const handleClick = () =>{
        if(isEmpty(images)){
          setError("Minimum one Image is required");
        }else{
          const object={
              "title":title,
              "description":desctiption,
              "price":price,
          }
          axios.post("http://localhost:8088/api/addProduct",object).then(response=>{
              console.log("Response from Login ",response);
              forEach(imagesFile,image=>{
                console.log("Check for file name ",image);
                const file = image
                console.log("Checking for file name ",file);
    
                const reader =new FileReader();
    
                reader.onloadend = () =>{
                  const base64String = reader.result.split('base64,')[1]
                  console.log("Check for base64 String  :: ",base64String);
                    const imgObj={
                      "productId":response.data.id,
                      "name":image.name,
                      "base64String":base64String
                    }
                  axios.post("http://localhost:8088/api/addImage",imgObj)
                }
                reader.readAsDataURL(file)
              })
          })
        }
      }

      const imageChangeHandler = (e) =>{
        !isEmpty(error)&&setError("")
        if(e.target.files){
          const fileArray = Array.from(e.target.files).map((file)=>URL.createObjectURL(file))
          console.log("Check file Array ",fileArray);
          setImagesFile((prevFiles)=>prevFiles.concat([...e.target.files]))
          setImages((prevImages)=>prevImages.concat(fileArray))
          Array.from(e.target.files).map(
            (file)=>URL.revokeObjectURL(file)
            )
        }
      }

      const renderImages = (source) =>{
        return source.map((photo)=>{
          return <img src={photo} key={photo} alt=""/>
        })
      }
    
      const handleTitleChange = (event) =>{
        setTitle(event.target.value)
      }
    
      const handleDesctiptionChange = (event) =>{
        setDesctiption(event.target.value)
      }
    
      const handlePriceChange = (event) =>{
        setPrice(event.target.value)
      }
    
    return(
      <div>
        <div >
            Title: <textarea onChange={handleTitleChange} ></textarea>
        </div>
        <div >
            Desctiption : <textarea onChange={handleDesctiptionChange} ></textarea>
        </div>
        <div >
            Price : <textarea onChange={handlePriceChange} ></textarea>
        </div>
        <div >
            <input type="file" multiple accept="image/*" onChange={imageChangeHandler} />
            <div className="result">
              {renderImages(images)}
            </div>
        </div>
        {!isEmpty(error) && 
          <div className="d-flex justify-content-center">
            <h3 color='#222222'>{error}</h3>
          </div>
        }
        <div>
          <button onClick={handleClick} type="button" className="btn btn-primary btn-lg">Register</button>
        </div>
      </div>
    )
}

export default ProductForm
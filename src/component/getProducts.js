import axios from "axios"
import {isEmpty, map} from "lodash";
import { useState } from "react";

function GetProducts() {
    const [products,setProducts]= useState([]);
    const [imagesFromProduct,setImagesFromProduct]=useState([]);
    const handleGetProduct = () => {
        axios.get("http://localhost:8088/api/getProduct").then(response=>{
            console.log("Checking for response",response);
            setProducts(response.data)
        })
    }
    const deleteById = (id) =>{
        axios.delete(`http://localhost:8088/api/deleteById/${id}`).then(response=>{
            console.log("Check for ",response);
        })
    }
    const getImagesById = (id) =>{
        axios.get(`http://localhost:8088/api/getImagesByProductId/${id}`).then(response=>{
            console.log("Check for ",response);
            setImagesFromProduct(response.data)
        })
    }

    const renderImages = (source) =>{
        return source.map((photo)=>{           
          return <img src={"data:image/jpeg;base64," + photo.base64String} alt=""/> 
        })
      }
    
    return(
        <div>
            {!isEmpty(imagesFromProduct)&&
                <div className="result">
                    {renderImages(imagesFromProduct)}
                </div>
            }
            <div className="d-flex justify-content-center">
                <button onClick={handleGetProduct} type="button" className="btn btn-primary btn-lg">Get All Products</button>
            </div>
            {!isEmpty(products)&&
                map(products,product=>{
                    console.log("Single product",product);
                    return( <div key={product.id}>
                        TITLE : {product.title} DESCRIPTION : {product.description} PRICE : {product.price} <button>Update</button> <button onClick={()=>getImagesById(product.id)}> GetImages </button> <button onClick={()=>deleteById(product.id)}>Delete</button>
                    </div>
                    )
                })
            }
        </div>


    )
}

export default GetProducts
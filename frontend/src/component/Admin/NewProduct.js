import React, { Fragment, useState } from 'react'
import './NewProduct.css'
import MetaData from '../layout/MetaData';
import { Button } from '@mui/material';
import Sidebar from './Sidebar';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newProduct } from '../../Redux/slices/productSlice';



const NewProduct = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name , setName] = useState("");
    const [price , setPrice] = useState(0);
    const [description , setDescription] = useState("");
    const [category , setCategory] = useState("");
    const [Stock , setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const {loading, success} = useSelector((state)=>state.products)
    
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Top",
        "Attire",
        "Camera",
        "SmartPhones",
        "Electronic",
        "Body Products",
        "Samsung"
    ];

    const createProductSubmitHandler =(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
          });

          console.log("working MyForm",myForm)
          dispatch(newProduct(myForm));

    }
    const createProductImagesChange =(e) =>{
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file)=>{
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                  setImagesPreview((old) => [...old, reader.result]);
                  setImages((old) => [...old, reader.result]);
                }
              };
        
              reader.readAsDataURL(file);
            });
          };
    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                
                <div>
                    <DescriptionIcon />
                    <textarea
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="1"
                    ></textarea>

                </div>
                <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        {categories.map((cate) => (
                            <option key={cate} value={cate}>
                                {cate}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <StorageIcon />
                    <input
                        type="number"
                        placeholder="Stock"
                        required
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div id="createProductFormFile">
                    <input
                        type="file"
                        name="profile"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                    />
                </div>

                <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                    ))}
                </div>

                <Button 
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                >
                    Create
                </Button>

            </form>
        </div>
      </div >
    </Fragment >
  );
};

export default NewProduct

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Search.css'
const Search = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();


    const searchSubmitHandle = (e) =>{
    e.preventDefault();
    if(keyword.trim()){
        navigate(`/products/${keyword}`)
    }
    else{
        navigate("/products")
    }
    
    }
  

  return (
    <form className='searchBox'onSubmit={searchSubmitHandle}>
      <input  
      type='text'
      placeholder='Search a Product .. '
      onChange={(e) =>setKeyword(e.target.value) }
      />
      <input
      type='submit'
      value='search'
      />
    </form>
  )
}

export default Search

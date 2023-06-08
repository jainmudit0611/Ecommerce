import React from 'react';
import ProductList from '../components/Product/ProductUserList.js';

const Home = ({LoginData}) => {

  return (
    <ProductList LoginData={LoginData}/>
  )
}

export default Home;
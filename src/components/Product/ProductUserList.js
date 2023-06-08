import React, { useState, useEffect } from 'react';
import './productData.css';

const ProductList = ({ LoginData }) => {

    const [prodData, setprodData] = useState([])
    const [productTempData, setProductTempData] = useState([])

    useEffect(() => {
        ProductDataList();
    }, [])

    const ProductDataList = () => {
        let product = [];
        if (localStorage.getItem("productD")) {
            product = JSON.parse(localStorage.getItem("productD"))

            setprodData(product);
            setProductTempData(product);
        }
        else {
            setprodData([]);
        }
    }

    const addToCart = (allData) => {
        let addCArtData = [];
        let cartData = {
            product_id: allData.id,
            userId: LoginData[0].id,
            quantity: 1,
        }

        let checkExisData = false;
        if (JSON.parse(localStorage.getItem("cartData"))) {
            addCArtData = JSON.parse(localStorage.getItem("cartData"));
            checkExisData = addCArtData.some(data => data.product_id === allData.id);
        }

        if (checkExisData) {
            addCArtData = addCArtData.map((d) => {
                if (d.product_id === allData.id) {
                    return { ...d, quantity: d.quantity + cartData.quantity }
                }
                return d;
            })
        } else {
            addCArtData.push(cartData)
        }
        localStorage.setItem('cartData', JSON.stringify(addCArtData))
    }


    const [search, setSearch] = useState()
    const inputSearch = (e) => {
        setSearch(e.target.value);
        searchData(e.target.value)
    }

    const searchData = (val) => {
        let filterData = prodData.filter((data) => data.title.toLowerCase().includes(val.toLowerCase()) || data.price.toLowerCase().includes(val.toLowerCase()));
        setProductTempData(filterData)
    }

    return (

        <>
            <input type="search" placeholder='Search your Item....' name='search' className='search' onChange={inputSearch} value={search} />

            <div className='row mt-5 d-flex mx-5 justify-content-around'>
                {
                    productTempData && productTempData?.filter((item) => !item.disabled).map((allData, i) => {
                        return (
                            <div className="homeList container px-4 mb-5 card" style={{ width: '18rem' }}>
                                <img src={allData.image} className="card-img-top" alt="..." height={200} />
                                <div className="card-body">
                                    <h5 className="card-title">{allData.title}</h5>
                                    <h5 className="card-title"><del>{allData.price} Rs</del></h5>
                                    <h5 className="card-title">{allData.discount} % discount</h5>
                                    <h5 className="card-title">{allData.discountPrice} Rs</h5>
                                    {/* {JSON.stringify(LoginData)} */}
                                    {LoginData && LoginData.length !== 0 && <button className='bg-primary' onClick={() => addToCart(allData)}>Add to Cart</button>}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default ProductList;

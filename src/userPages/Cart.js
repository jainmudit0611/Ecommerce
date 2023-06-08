import React, { useState, useEffect } from 'react';
import '../components/Product/productData.css';


const Cart = ({ LoginData }) => {

  const [cartD, setCartD] = useState([])
  const [total, settotal] = useState(0)
 const [CartnProductData, setCartnProductData] = useState([])

  const CartData = () => {
    let cart = []
    let productData = []
    if (localStorage.getItem("cartData")) {
      cart = JSON.parse((localStorage.getItem("cartData")))
      setCartD(cart)
      productData = JSON.parse((localStorage.getItem("productD")))

      cart = cart.map((d,i)=>{
        let productDetails  = productData.find(pd=>pd.id ===d.product_id);
         return {...productDetails,'user_id':d.userId,'quantity':d.quantity}
        
        // console.log("productDetails--->",productDetails);
        //  return d.concat(productDetails);
     
      })
      // let userid = LoginData && LoginData[0] ? LoginData[0].id : 0
      // let cartc = cart.filter((data) => data.userId === userid)
      console.log("cart",cart);
      setCartnProductData(cart)
    } else {
      setCartD([])
    }
  }

  useEffect(() => {
    CartData();
  }, [])


  const handleAddProduct = (data,op) => {
        let nData  = op==='add'?{...data,'quantity':data.quantity + 1}:{...data,quantity:data.quantity - 1}
       let bData =  cartD.map((d,i)=>{
          if(d.id===data.id) return nData;
          else return d;
        })
        setCartD(bData);
        localStorage.setItem("cartData", JSON.stringify(bData));
  }
  


  // const handleSubtractProduct = (data) => {
  //   const updateDelete = cartD.map((item) =>
  //     item.id === data.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
  //   )
  //   setCartD(updateDelete)
  //   localStorage.setItem("cartData", JSON.stringify(updateDelete));
  // }

  // const removeItem = (data) => {
  //   const deleteItem = cartD.filter((item) => item.id !== data.id)
  //   setCartD(deleteItem)
  //   localStorage.setItem("cartData", JSON.stringify(deleteItem))
  // }


  // const calculateTotal = () => {
  //   let total = 0
  //   cartD.forEach(item =>
  //     total += item.discountPrice * item.quantity
  //   )
  //   // console.log("total--",total);
  //   settotal(total);
  // }

  // useEffect(() => {
    // calculateTotal()
  // })

  return (
    <div>

      <table className='table'>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            CartnProductData && CartnProductData?.map((data, i) => {
              return (
                <tr>
                  <td key={i}>{i + 1}</td>
                  <td>{data.title}</td>
                  <td>{data.discountPrice}</td>
                  <td><button onClick={() => handleAddProduct(data,'add')}>+</button> {data.quantity} <button onClick={() => handleAddProduct(data,'sub')} >-</button></td>
                  {/* <td><button onClick={() => removeItem(data)}>Remove</button></td> */}
                  <td>{(data.discountPrice) * (data.quantity)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className='grand w-50 d-flex justify-content-center mt-5' >
        {/* <h3 className='mt-4'>Grand Total : {total}</h3> */}
      </div>

    </div>
  )
}

export default Cart;
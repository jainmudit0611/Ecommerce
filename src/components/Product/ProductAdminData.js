import React, { useState, useEffect } from 'react';
import './productData.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ProductData = () => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState({ image: "", title: "", price: "", discount: "", discountPrice: "", id: 0 })
    const [prodData, setprodData] = useState([])


    let discountP = 0;

    const handleClose = () => {
        setShow(false);
        setData({ image: "", title: "", price: "", discount: "", discountPrice: "", id: 0 })
    };
    const handleShow = () => {
        setShow(true);
    }

    const inputHandle = (e) => {
        let name = e.target.name
        let value = e.target.value

        console.log("e", e);
        // console.log(name,value);
        setData({ ...data, [name]: value })
    }

    const Submit = (e) => {
        e.preventDefault();
        console.log(data);

        if (data.id === 0) {
            // new
            submitSave()
        } else {
            // edit
            submitEdit()
        }
    }


    const submitSave = () => {

        let dataSave = [];
        if (localStorage.getItem("productD")) {
            dataSave = JSON.parse(localStorage.getItem("productD"));
        }

        dataSave.push({ ...data, 'id': dataSave.length + 1 });

        localStorage.setItem("productD", JSON.stringify(dataSave));
        // alert("Data Submitted")
        handleClose()
        ProductDataList();

        // console.log(dataSave);
        return false;

    }

    useEffect(() => {
        ProductDataList();
    }, [])

    const ProductDataList = () => {
        let prod = [];
        if (JSON.parse(localStorage.getItem("productD"))) {
            prod = JSON.parse(localStorage.getItem("productD"))
            setprodData(prod);
            // console.log('prod',prod);
        }
        else {
            setprodData([]);
        }
    }

    const submitUpdate = (e, allData) => {
        setShow(true)
        setData(allData)
    }

    const submitEdit = () => {
        let nData = prodData.map((allData, id) => {
            if (allData.id === data.id) {
                return data
            }
            else {
                return allData
            }
        })
        localStorage.setItem('productD', JSON.stringify(nData));
        ProductDataList();
        handleClose();
    }

    const handleDelete = (i) => {
        const filterData = prodData.filter((currEle, index) => i !== index);
        setprodData(filterData);
        localStorage.setItem('productD', JSON.stringify(filterData))
    }

    // const handleUpdate = (allData) =>{
    //     setData({image: "allData.image", title: "allData.title", price: "allData.price", discount: "allData.discount", discountPrice: "allData.discountPrice"})
    //     handleShow();
    // }



    const imageHandle = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            setData({ ...data, 'image': base64String })
        };
        reader.readAsDataURL(file)
    }

    const formula = (e) => {
        let formulaDisc = (data.price - (data.price * data.discount) / 100)
        // console.log('formulaDisc----',formulaDisc);
        setData({ ...data, 'discountPrice': formulaDisc })
    }

    const disableProduct = (e, allData) => {
        let item = [];
        if (localStorage.getItem('productD')) {
            item = JSON.parse(localStorage.getItem('productD'))
            // console.log('item---',item);
            const updatedProdData = item.map((data) => {
                if (data.id === allData.id) {
                    return {
                        ...data,
                        disabled: !data.disabled
                    };
                }
                return data;
            });
            setprodData(updatedProdData);
            localStorage.setItem('productD', JSON.stringify(updatedProdData));
        }
    }


    return (
        <>
            <div>

                <div className='entry'>
                    <button onClick={handleShow}><h1>Enter Product</h1></button>
                </div>

                <div>

                    <Modal show={show} onHide={handleClose}>
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    "Enter Product Details"
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        // value={data.image}
                                        placeholder="image"
                                        autoFocus
                                        onChange={(e) => imageHandle(e)}

                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        value={data.title}
                                        autoFocus
                                        onChange={inputHandle}

                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Price"
                                        name="price"
                                        value={data.price}
                                        autoFocus
                                        onChange={inputHandle}

                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                    <Form.Label>Discount %</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Discount"
                                        name="discount"
                                        value={data.discount}
                                        autoFocus
                                        onChange={inputHandle}
                                        onKeyUp={formula}

                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                    <Form.Label>Discounted Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Discounted Price"
                                        name="discountPrice"
                                        value={data.discountPrice}
                                        autoFocus
                                        onChange={inputHandle}

                                    />
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={Submit}>
                                    Save Data
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>

            </div >

            {/* Product List */}

            <div className='prodList'>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Discounted Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prodData && prodData?.map((allData, i) => {
                                discountP = (allData.price - (allData.price * allData.discount) / 100)
                                return (
                                    <tr key={allData.i} className={allData.disabled ? 'text-danger' : ''}>
                                        <th scope='row'>{i + 1}</th>
                                        <td><img src={allData.image} height={50} alt='...'></img></td>
                                        <td>{allData.title}</td>
                                        <td>{allData.price}</td>
                                        <td>{allData.discount}</td>
                                        <td>{discountP}</td>
                                        <td>
                                            <button onClick={() => handleDelete(i)}>Delete</button>
                                            <button onClick={(e) => { submitUpdate(e, allData) }}>Update</button>
                                            <button onClick={(e) => { disableProduct(e, allData) }} >{allData.disabled ? "Enable" : "Disable"}</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>

        </>
    )
}


// if (data.image === "") {
//     alert("image is mandatory")
//     return false;
// }
// if (data.title === "") {
//     alert("title is mandatory")
//     return false;
// }
// if (data.price === "") {
//     alert("price is mandatory")
//     return false;
// }
// if (data.discount === "") {
//     alert("discount is mandatory")
//     return false;
// }
// if (data.discountPrice === "") {
//     alert("discountPrice is mandatory")
//     return false;
// }

export default ProductData;

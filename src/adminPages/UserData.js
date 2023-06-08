import React, { useState, useEffect } from 'react'

const UserData = () => {

    const [userDetail, setUserDetail] = useState([])
    const [userTempDetail, setUserTempDetail] = useState([])
    const [search, setSearchUser] = useState()

    useEffect(() => {
        UserList()
    }, [])

    const UserList = () => {
        let detail = [];
        if (localStorage.getItem("userData")) {
            detail = JSON.parse(localStorage.getItem("userData"))
            setUserDetail(detail)
            setUserTempDetail(detail)
            // console.log('detail--',detail);
        }
        else {
            setUserDetail([])
        }
    }

    const inputSearch = (e) => {
        setSearchUser(e.target.value)
        searchData(e.target.value)
    }

    const searchData = (val) => {
        let filterUser = userDetail.filter((data) => (data.name.toLowerCase().includes(val.toLowerCase())) || (data.email.toLowerCase().includes(val.toLowerCase())) || (data.number.toLowerCase().includes(val.toLowerCase())))
        setUserTempDetail(filterUser)
    }

    return (
        <>
            <input type="search" placeholder='Search your Item....' name='search' className='search' onChange={inputSearch} value={search} />

            <table className='table'>
                <thead>
                    <tr>
                        <td><h4>Id</h4></td>
                        <td><h4>Name</h4></td>
                        <td> <h4>Email</h4></td>
                        <td><h4>Number</h4></td>
                        <td><h4>Image</h4></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        userTempDetail && userTempDetail?.map((allData, i) => {
                            return (

                                <tr>
                                    <td>{allData.id}</td>
                                    <td>{allData.name}</td>
                                    <td>{allData.email}</td>
                                    <td>{allData.number}</td>
                                    <td><img src={allData.img} alt='...' height={50} width={50}/></td>
                                </tr>

                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default UserData;
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox } from 'antd';
import View from './View';
import Birthday from "./Birthday";
import { ToastContainer, toast } from 'react-toastify';
import { submit, editsubmit } from './Birthday';


const Details = () => {


    var todayDate = new Date().toISOString().slice(0, 10);

    const history = useNavigate("");

    // this is uservalidation data
    const [logindata, setLoginData] = useState([]);


    // fetching data using api
    const [getdata, setGetdata] = useState([]);
    // console.log(getdata);


    // view time individual data
    const [viewdata, setViewData] = useState("");

    // for birthmodal show modal
    const [show, setShow] = useState(false);


    // for delete time pop up generate data
    const [showdel, setShowDel] = useState(false);


    // for store id perticular user edit time
    const [dltuser, setDltuser] = useState("");

    // for view time pop up
    const [vie, setVie] = useState(false);

    // add new user data in table
    const [showenewuser, setShowNewuser] = useState(false);

    const [newuser, setNewuser] = useState({
        username: "",
        email: "",
        website: "",
        phone: "",
    })

    const opennewUser = () => {
        setShowNewuser(true);
    };

    const submitNewuser = () => {
        submit(newuser, setGetdata, getdata, setShowNewuser, setNewuser);
    }

    const handleNewuserClose = () => setShowNewuser(false);

    // edit time 
    const [showedit, setShowedit] = useState(false);

    const [editid, setEditid] = useState(0);
    // console.log(editid);

    const [editdata, setEditdata] = useState({
        username: "",
        email: "",
        website: "",
        phone: ""
    });

    // data on edit page
    const passdata = (e) => {
        // console.log(e);
        setShowedit(true)
        setEditdata(e)
    };

    // submit and edit
    const submitEdit = () => {
        editsubmit(editdata, getdata, editid, setGetdata, setShowedit);
    };

    const handleEditClose = () => setShowedit(false);



    // view open

    const viewClose = () => setVie(false);
    const viewOpen = (vi) => {
        setVie(true);
       
        const viewindData = getdata.find((e, id) => e.email === vi);
      
        setViewData(viewindData);
    }



    // for birthday modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    // for delete time model open
    const handleDeleteShow = (e) => {
        setShowDel(true)
        setDltuser(e);
    }

    const handleDeleteClose = () => setShowDel(false);


    // if userselect final dlt then run
    const handledeleteuser = () => {
        // console.log(dltuser);

        const finledlt = getdata.filter((e, k) => e.email !== dltuser);

        setGetdata(finledlt);
        setShowDel(false)
    }



    // fetch user data from jsonviewer
    const data = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const res2 = await res.json();

        setGetdata(res2);

    }

    useEffect(() => {
        Birthday(logindata, setLoginData, handleShow);
        data();
    }, []);


    // from remove userlogin
    const logoutuser = () => {
        localStorage.removeItem('userlogin');
        history("/");
    };



    return (

        <>
            {
                logindata.length === 0 ? "error" :
                    <>
                        <div className='container'>
                            <h2 className='text-center mt-2'>User Details Page</h2>

                            <div className="d-flex justify-content-between">
                                <Button type='primary' className='d-flex justify-content-evenly align-items-center'
                                    onClick={() => opennewUser()}
                                >
                                    <PlusOutlined /> <span className='mx-2'>AddUser</span>
                                </Button>
                                <Button type='secondary' className='text-center' onClick={logoutuser}>Logout</Button>
                            </div>

                            <div className="table_container mt-4 table-responsive">
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr className='text-center'>
                                            <th>ID</th>
                                            <th>First Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Website</th>
                                            <th>Operation Perform</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e, k) => {
                                                return (
                                                    <>
                                                        <tr className='text-center' key={k}>
                                                            <td>{e.id}</td>
                                                            <td>{e.username}</td>
                                                            <td>{e.email}</td>
                                                            <td>{e.phone}</td>
                                                            <td>{e.website}</td>
                                                            <td className='d-flex justify-content-around align-items-center'>
                                                                <button className='btn btn-success' onClick={() => viewOpen(e.email)}>view</button>
                                                                <button className='btn btn-primary' onClick={() => {
                                                                    passdata(e);
                                                                    setEditid(e.id);
                                                                }}>Edit</button>
                                                                <button className='btn btn-danger' onClick={() => handleDeleteShow(e.email)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }


                                    </tbody>
                                </Table>
                            </div>

                            <ToastContainer />
                            {/* user view Time Popup */}

                            {
                                viewdata && Object.keys(viewdata) ?
                                    <View show={vie} onHide={viewClose} viewdata={viewdata} /> : ""
                            }

                            {/* add newuser time popup */}

                            {
                                <Modal show={showenewuser} onHide={handleNewuserClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form
                                            autoComplete="off">
                                            <Form.Item
                                            >
                                                <Input name='fname'
                                                    onChange={(e) => setNewuser({ ...newuser, username: e.target.value })}
                                                    value={newuser.username}
                                                    placeholder='Your Name' />
                                            </Form.Item>

                                            <Form.Item>
                                                <Input type={"email"} name='email'
                                                    onChange={(e) => setNewuser({ ...newuser, email: e.target.value })}
                                                    value={newuser.email}
                                                    placeholder='Your Email' />
                                            </Form.Item>

                                            <Form.Item>
                                                <Input name='website'
                                                    onChange={(e) => setNewuser({ ...newuser, website: e.target.value })}
                                                    value={newuser.website}
                                                    placeholder='Your Website'
                                                />
                                            </Form.Item>

                                            <Form.Item>
                                                <Input name='phone'
                                                    onChange={(e) => setNewuser({ ...newuser, phone: e.target.value })}
                                                    value={newuser.phone}
                                                    placeholder='Your Phone' />
                                            </Form.Item>

                                            <Form.Item>
                                                <Checkbox defaultChecked>Remember me</Checkbox>
                                            </Form.Item>

                                            <Form.Item className='text-center'>
                                                <Button style={{ width: 130, backgroundColor: '#43B97F', color: "#fff" }}
                                                    onClick={() => submitNewuser()}
                                                >
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleNewuserClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            }

                            {/* edit time popup */}

                            {
                                <Modal show={showedit} onHide={handleEditClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form
                                            autoComplete="off">
                                            <Form.Item
                                            >
                                                <Input name='fname'
                                                    onChange={(e) => setEditdata({ ...editdata, username: e.target.value })}
                                                    value={editdata.username}
                                                    placeholder='Your Name' />
                                            </Form.Item>

                                            <Form.Item>
                                                <Input type={"email"} name='email'
                                                    onChange={(e) => setEditdata({ ...editdata, email: e.target.value })}
                                                    value={editdata.email}
                                                    placeholder='Your Email' />
                                            </Form.Item>

                                            <Form.Item>
                                                <Input type={"text"} name='website'
                                                    onChange={(e) => setEditdata({ ...editdata, website: e.target.value })}
                                                    value={editdata.website}
                                                    placeholder='Your website' />

                                            </Form.Item>

                                            <Form.Item>
                                                <Input name='phone'
                                                    onChange={(e) => setEditdata({ ...editdata, phone: e.target.value })}
                                                    value={editdata.phone}
                                                    placeholder='Your Phone' />
                                            </Form.Item>

                                            <Form.Item>
                                                <Checkbox defaultChecked>Remember me</Checkbox>
                                            </Form.Item>

                                            <Form.Item className='text-center'>
                                                <Button style={{ width: 130, backgroundColor: '#43B97F', color: "#fff" }}
                                                    onClick={() => submitEdit()}
                                                >
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleEditClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            }


                            {/* user delete time popup */}
                            <Modal show={showdel} onHide={handleDeleteClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are You Sure You Want to Delete User</Modal.Title>
                                </Modal.Header>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleDeleteClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => handledeleteuser()}>
                                        Delete User
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                            {/* user birth day popup */}
                            {
                                logindata[0].date === todayDate ?

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{`Hey ${logindata[0].fname.toUpperCase()} 🍰`}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ color: "#000", fontWeight: "bold" }}>WIsh You a Many Many Happy Returns Of The Day! </Modal.Body>
                                        <Modal.Body style={{ color: "#000", fontWeight: "bold" }}>Have A Nice Day ! 😃</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Done
                                            </Button>
                                        </Modal.Footer>
                                    </Modal> : ""
                            }
                        </div>

                    </>
            }
        </>


    )
}

export default Details

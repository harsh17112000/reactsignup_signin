import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup_Signin = () => {

    const [sign, setSign] = useState("sign");
    // console.log(sign);

    const history = useNavigate("");


    // for setlocalstorage register value
    const [uval, setUval] = useState([]);
    // console.log(uval);

    // forset localstorage login value
    const [ulogin, setUlogin] = useState([]);

    // getting the login time user value in hook and direct add value in setUlogin with onchange
    const [userlog, setUserLog] = useState({
        email: "",
        password: ""
    });
    // console.log(userlog);


    // getting the register time user value in hook
    const [userdata, setUserData] = useState({
        fname: "",
        email: "",
        date: "",
        password: ""
    });


    // get userdata for singup time
    const getuserdata = (e) => {
        const { name, value } = e.target;
        // console.log(name+ " :" + value)

        setUserData(() => {
            return {
                ...userdata,
                [name]: value
            }
        })
    };


    // for register user data
    const sendudata = (e) => {
        e.preventDefault();

        if (userdata.fname === "") {
            toast.error("Provide fname !", {
                position: "top-center"
            });
        } else if (userdata.email === "") {
            toast.error("Provide Email !", {
                position: "top-center"
            });
        } else if (!userdata.email.includes("@")) {
            toast.error("enter valid details @ in Your Email !", {
                position: "top-center"
            });
        } else if (userdata.date === "") {
            toast.error("Enter Your Birth Date !", {
                position: "top-center"
            });
        } else if (userdata.password === "") {
            toast.error("Enter Your Password !", {
                position: "top-center"
            });
        } else if (userdata.password.length < 6) {
            toast.error("Password Must Be 6 character!", {
                position: "top-center"
            });
        } else {
            setUval([...uval, userdata]);
            localStorage.setItem("uservalue", JSON.stringify([...uval, userdata]));
            setUserData({ ...userdata, fname: "", email: "", date: "", password: "" });
            toast.success("Your Data Succesfully Added 😃!", {
                position: "top-center"
            });
        }
    };


    // for login user data
    const loginuser = (e) => {
        e.preventDefault();

        const getArr = localStorage.getItem("uservalue");

        if (userlog.email === "") {
            toast.error("Provide Email !", {
                position: "top-center"
            });
        } else if (!userlog.email.includes("@")) {
            toast.error("enter valid details @ in Your Email !", {
                position: "top-center"
            });
        } else if (userlog.password === "") {
            toast.error("Enter Your Password !", {
                position: "top-center"
            });
        } else if (userlog.password.length < 6) {
            toast.error("Password Must Be 6 character!", {
                position: "top-center"
            });
        } else {

            if (getArr && getArr.length) {
                const getdataArr = JSON.parse(getArr);
                const done_login = getdataArr.filter((e, k) => {
                    return e.email === userlog.email && e.password === userlog.password
                });

                if (done_login.length === 0) {
                    toast.error("invalid details!", {
                        position: "top-center"
                    })
                } else {
                    // console.log(done_login);
                    setUlogin([...ulogin, done_login]);
                    localStorage.setItem("userlogin", JSON.stringify(done_login)); // je data sathe compare karvu chu jo te match thase to tej valuene send karsu deails page pr
                    setUserLog({ ...userlog, email: "", password: "" });
                   
                    history("/details");
                }
            }
        }
    }

    // setUlogin([...ulogin,userlog])
    // localStorage.setItem("userlogin", JSON.stringify([...ulogin,userlog])); 

    return (
        <div className="container">
            <section>
                {
                    sign == "sign" ?

                        (
                            <div className="left_data">
                                <h3 className='text-center'>Sign In</h3>
                                <Form
                                    autoComplete="off">
                                    <Form.Item>
                                        <Input type={"email"}
                                            name='email'
                                            value={userlog.email}
                                            onChange={(e) => setUserLog({ ...userlog, email: e.target.value })}
                                            placeholder='Your Email' />
                                    </Form.Item>

                                    <Form.Item>
                                        <Input.Password
                                            name='password'
                                            value={userlog.password}
                                            onChange={(e) => setUserLog({ ...userlog, password: e.target.value })}
                                            placeholder='Your Password' />
                                    </Form.Item>

                                    <Form.Item>
                                        <Checkbox defaultChecked={true}>Remember me</Checkbox>
                                    </Form.Item>

                                    <Form.Item className='text-center' >
                                        <Button style={{ width: 130, backgroundColor: '#43B97F', color: "#fff" }}
                                            onClick={loginuser}
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>

                                <p>Create Your New Account <span style={{ borderBottom: "1px solid blue", cursor: "pointer", color: "blue" }}
                                    onClick={() => setSign("signup")}
                                >SignUp</span> </p>
                                {/* <button onClick={checkok}>check</button> */}
                            </div>
                        ) :

                        (

                            <div className="left_data">
                                <h3 className='text-center'>Sign Up</h3>
                                <Form
                                    autoComplete="off">
                                    <Form.Item
                                    >
                                        <Input name='fname'
                                            onChange={getuserdata}
                                            value={userdata.fname}
                                            placeholder='Your Name' />
                                    </Form.Item>

                                    <Form.Item>
                                        <Input type={"email"} name='email'
                                            onChange={getuserdata}
                                            value={userdata.email}
                                            placeholder='Your Email' />
                                    </Form.Item>

                                    <Form.Item>
                                        <Input type={"date"} name='date'
                                            onChange={getuserdata}
                                            value={userdata.date}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Input.Password name='password'
                                            onChange={getuserdata}
                                            value={userdata.password}
                                            placeholder='Your Password' />
                                    </Form.Item>

                                    <Form.Item>
                                        <Checkbox defaultChecked>Remember me</Checkbox>
                                    </Form.Item>

                                    <Form.Item className='text-center'>
                                        <Button style={{ width: 130, backgroundColor: '#43B97F', color: "#fff" }}
                                            onClick={sendudata}
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>

                                <p>Already Have an Account <span style={{ borderBottom: "1px solid blue", cursor: "pointer", color: "blue" }}
                                    onClick={() => setSign("sign")}
                                >SignIn</span> </p>
                            </div>
                        )
                }

                <div className="right_data">
                    <div className="sinin_img">
                        <img src="./sign.svg" alt="signin" />
                    </div>
                </div>
                <ToastContainer />
            </section>
        </div>

    )
}

export default Signup_Signin;




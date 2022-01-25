import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Birthday = (logindata, setLoginData, handleShow) => {

    var todayDate = new Date().toISOString().slice(0, 10);


    const getArr = localStorage.getItem("userlogin");
    if (getArr && getArr.length) {
        const getdataArr = JSON.parse(getArr);


        setLoginData(getdataArr);

        const birth_dateget = logindata.map((e, k) => {
            const j = e.date === todayDate;
            return j
        });


        if (birth_dateget) {
            setTimeout(() => {
                handleShow();
            }, 3000)
        }

    }


}

export default Birthday;



export const submit = (newuser, setGetdata, getdata, setShowNewuser, setNewuser) => {

    if (newuser.username === "") {
        toast.error("Provide fname !", {
            position: "top-center"
        });
    } else if (newuser.email === "") {
        toast.error("Provide Email !", {
            position: "top-center"
        });
    } else if (!newuser.email.includes("@")) {
        toast.error("enter valid details @ in Your Email !", {
            position: "top-center"
        });
    } else if (newuser.website === "") {
        toast.error("Enter Your website !", {
            position: "top-center"
        });
    } else if (newuser.phone === "") {
        toast.error("Enter Your phone !", {
            position: "top-center"
        });
    } else if (newuser.phone.length !== 10) {
        toast.error("Number Should be 10 digits!", {
            position: "top-center"
        });
    } else {
        setGetdata([...getdata, newuser]);
        toast.success("Your Data Succesfully Added 😃!", {
            position: "top-center"
        });
        setNewuser({ ...newuser, username: "", email: "", website: "", phone: "" });
        setShowNewuser(false);
    }
};




// for edit data validation

export const editsubmit = (editdata,getdata,editid,setGetdata,setShowedit) => {
    if (editdata.username === "") {
        toast.error("Provide fname !", {
            position: "top-center"
        });
    } else if (editdata.email === "") {
        toast.error("Provide Email !", {
            position: "top-center"
        });
    } else if (!editdata.email.includes("@")) {
        toast.error("enter valid details @ in Your Email !", {
            position: "top-center"
        });
    } else if (editdata.website === "") {
        toast.error("Enter Your website !", {
            position: "top-center"
        });
    } else if (editdata.phone === "") {
        toast.error("Enter Your phone !", {
            position: "top-center"
        });
    } else {
        const newedit = getdata.map((rr, k) => rr.id == editid ? editdata : rr);
        // console.log(newedit);
        setGetdata(newedit)
        setShowedit(false);
    }

}
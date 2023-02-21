import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [fnameError, setFnameError] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lnameError, setLnameError] = useState(false);


    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [gender, setGender] = useState('');

    const [technologies, setTechnologies] = useState('select');

    const [checkbx, setCheckBox] = useState(false);

    const [rowData, setrowData] = useState([]);

    const [isValid, setIsValid] = useState(false);

    const [res, setRes] = useState(false);


    const Firstname = new RegExp('^[A-Za-z]+$');
    const Lastname = new RegExp('^[A-Za-z]+$');
    const Email = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    let count1 = false;  //to check error when its submit
    let count2 = false;
    let count3 = false;

    const validate = () => {
        if (!Firstname.test(firstName)) {
            setFnameError(true);
            count1 = false;
        } else {
            setFnameError(false);
            count1 = true;
        }

        if (!Lastname.test(lastName)) {
            setLnameError(true);
            count2 = false;
        } else {
            setLnameError(false);
            count2 = true;
        }
        if (!Email.test(email)) {
            setEmailError(true);
            count3 = false;
        } else {
            setEmailError(false);
            count3 = true;
        }

        if (count1 === true && count2 === true && count3 === true) {
            setIsValid(true)
            axios.post("http://localhost:8080/form/save", { firstName, lastName, email, gender, technologies, checkbx })
                .then(
                    result => {
                        console.log(result)
                        // alert("Your Form Submitted Sucessfully")
                        if (result.status === 201) {
                            setRes(false)
                            setFirstName("")
                            setLastName("")
                            setEmail("")
                        }
                    }
                )
        } else {
            setIsValid(false)
            setRes(false)
        }
    }

    const formResetFunc=(event)=>{
        if (count1 === true && count2 === true && count3 === true) {
        event.target.reset()
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await setRes(true)
        await validate();
        formResetFunc(event)
    }
    useEffect(() => {
        axios.get("http://localhost:8080/form/dropdown").then(response => {
            setrowData(response.data);
        })
    }, []);

    return (

        <div className="section">
             <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="inp">FirstName:   
                    <input type="text" style={{width :150,height :30}} id="fname" name="firstName" placeholder="First Name" value={firstName}
                        onChange={event => setFirstName(event.target.value)} autoComplete="off"></input>
                    <div className="valid" style={{ color: "#F61C04" }}>{fnameError && 
                    <p>Enter Your firstName </p>}</div>
                </div>
                <div className="inp">LastName:   
                    <input type="text" style={{width :150,height :30}} id="lname" name="lastName" placeholder="Last Name" value={lastName}
                        onChange={event => setLastName(event.target.value)} autoComplete="off"></input>
                    <div className="valid" style={{ color: "#F61C04" }}>{lnameError && <p>Enter Your lastName</p>}</div>
                </div>
               
                <div className="inp">Email:   
                    <input type="text" style={{width :150,height :30, marginLeft : 50}} id="email" name="email" placeholder="Email" value={email}
                        onChange={event => setEmail(event.target.value)} autoComplete="off"></input>
                    <div className="valid" style={{ color: "#F61C04" }}>{emailError && <p>Enter Your email</p>}</div>
                </div>   
                <div> Gender:
                    <input type="radio" name="gender" value="Female"
                        onChange={(event) => setGender(event.target.value)} />Female
                    <input type="radio" name="gender" value="Male"
                        onChange={(event) => setGender(event.target.value)} />Male
                </div><br></br>
                <div>Technologies:
                    <select  style={{width:150,height:30}} onChange={(event) => setTechnologies(event.target.value)}>
                        <option value="select"> Select</option>
                        {rowData.map(item => {
                            return (
                                <option key={item.techid} value={item.language}>{item.language}</option>
                            )
                        })}
                    </select>
                </div><br></br>
                <div>
                    <input type="checkbox" name="checkbx"
                        value="I agree with terms and conditions" onChange={(event) => setCheckBox(!checkbx)} /> I agree with terms and conditions
                </div><br></br>
                <div >
                   
                    <button className="sub" type="submit" disabled={res}>Submit</button>
                </div>
                
            </form>
        </div>
    );
};

export default Register;
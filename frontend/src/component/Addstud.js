import React, { useState, useEffect  } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function Addstud() {
    const navigate = useNavigate();
    const [inputdata,setInputdata]=useState({
        "name":"",
        "address":"",
        "subject":[],
        "contact":""
    })
    const [formations, setFormations] = useState([]); 

    useEffect(() => {
        // Fetch existing formations from your database
        const fetchFormations = async () => {
            try {
                const response = await fetch("http://localhost:5000/getform");
                const data = await response.json();
                setFormations(data); 
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations(); 
    }, []);
    
    
    
let formationsSelectionnees = [];


function handleInputChange(event) {
    const formationId = (event.target.value); 
    if (event.target.checked) {
        formationsSelectionnees.push(formationId); 
    } else {
        const index = formationsSelectionnees.indexOf(formationId);
        if (index !== -1) {
            formationsSelectionnees.splice(index, 1); 
        }
    }
      console.log(formationsSelectionnees);
      inputdata.subject = formationsSelectionnees;
    
}

    
    //onchange function
    const setstud=(e)=>{
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });   
    }
    //onclick event
    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, address, subject, contact } = inputdata;

        const res = await fetch("http://localhost:5000/addstud", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,address,subject, contact
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            setInputdata(data);
            toast.success('Please wait  !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
                });
            setTimeout(() => {
                navigate('/allstud');
              }, 3000);

        }
    }
    return (
        <div className='container mt-5'>
            <h4>All New Student Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75' >
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Name" 
                    onChange={setstud} name="name" value={inputdata.name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Address</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Address"
                    onChange={setstud} name="address" value={inputdata.address}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Sélectionner des Formations</label>
                    {formations.map(formation => (
                        <div key={formation._id} className="form-check">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id={`${formation._id}`} 
                                name={`${formation._id}`} 
                                onChange={handleInputChange} 
                                value={formation._id} 
                                
                            />
                            <label className="form-check-label" >
                                {formation.namef}
                            </label>
                        </div>
                    ))}
                </div>
                   

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Mobile</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Contact Number"
                    onChange={setstud} name="contact" value={inputdata.contact}/>
                </div>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={addinpdata}>Add Student</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allstud">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}

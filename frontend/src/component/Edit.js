import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
    const navigate = useNavigate();
    
    const [inputdata,setInputdata]=useState({
        "name":"",
        "address":"",
        "subject":"",
        "contact":""
    })
    
    const [formations, setFormations] = useState([]); 

    useEffect(() => {
        // Fetch existing formations from your database
        const fetchFormations = async () => {
            try {
                const response = await fetch("http://localhost:5000/getform");
                const data = await response.json();
                setFormations(data); // Update state with fetched formations
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations(); 
    }, []);
    
    
    
let formationsSelectionnees = [];

// Ajoutez un identifiant de formation à la liste lorsque la case à cocher correspondante est cochée
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
        const {name,value}=e.target;
        setInputdata((prestud)=>{
            return{
                ...prestud,[name]:value
            }
        })
    }


    //get single data student
    const { id } = useParams("");
    console.log(id);

    const getstuddata = async () => {
        const res = await fetch(`http://localhost:5000/getstud/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getstuddata();
    }, [])

    //update student Data
    const updatestud= async(e)=>{
        e.preventDefault();

        const {name, address, subject, contact} =inputdata;
        const res2 = await fetch(`http://localhost:5000/updatestud/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,address, subject, contact
            })
        });
        const data2= await res2.json();
        setInputdata(data2);
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

    return (
        <div className='container mt-5'>
            <h4>Edit Student Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
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
                         <button className='btn btn-primary' onClick={updatestud}>update Student</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allstud">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}

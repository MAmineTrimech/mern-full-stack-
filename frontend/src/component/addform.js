import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Addform() {
    const navigate = useNavigate();
    const [inputdata, setInputdata] = useState({
        "namef": "",
        "datedebut": "",
        "datefin": "",
        "professeurname": "",
        "image": null, 
    });

    // Fonction de changement
    const setform = (e) => {
        if (e.target.name === 'image') {
            
            setInputdata({ ...inputdata, [e.target.name]: e.target.files[0] });
        } else {
            setInputdata({ ...inputdata, [e.target.name]: e.target.value });
        }
    }

    // Fonction pour ajouter les données
    const addinpdata = async (e) => {
        e.preventDefault();

        const { namef, datedebut, datefin, professeurname, image } = inputdata;

        // Créez un nouvel objet FormData
        const formData = new FormData();
        formData.append('namef', namef);
        formData.append('datedebut', datedebut);
        formData.append('datefin', datefin);
        formData.append('professeurname', professeurname);
        formData.append('image', image); 

        try {
            const res = await fetch("http://localhost:5000/addform", {
                method: "POST",
                body: formData 
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
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
                    navigate('/getform');
                }, 3000);
            }
        } catch (error) {
            alert("error");
        }
    }

    return (
        <div className='container mt-5'>
            <h4>All New formation Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Formation Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter formation Name"
                        onChange={setform} name="namef" value={inputdata.namef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Date de Début</label>
                    <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Enter  date de début"
                        onChange={setform} name="datedebut" value={inputdata.datedebut} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Date de Fin</label>
                    <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Enter Date de Fin"
                        onChange={setform} name="datefin" value={inputdata.datefin} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Professeur Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter professeur Name"
                        onChange={setform} name="professeurname" value={inputdata.professeurname} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Image</label>
                    <input type="file" className="form-control" id="exampleFormControlInput1"
                        onChange={setform} name="image" />
                </div>
                <div className='d-flex'>
                    <button className='btn btn-primary' onClick={addinpdata}>Add Formation</button>
                    <ToastContainer />
                    <NavLink className='btn btn-primary ms-auto' to="/getform">Back to Home</NavLink>
                </div>
            </form>
        </div>
    )
}

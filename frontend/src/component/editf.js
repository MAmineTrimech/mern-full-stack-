import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Editf() {
    const navigate = useNavigate();
    const { id } = useParams("");

    const [inputdata, setInputdata] = useState({
        "namef": "",
        "datedebut": "",
        "datefin": "",
        "professeurname": "",
        "image": null, // Utilisez null comme valeur initiale pour l'image
    });

    // onChange function
    const setform = (e) => {
        if (e.target.name === 'image') {
            setInputdata({ ...inputdata, [e.target.name]: e.target.files[0] }); // Assurez-vous de récupérer le fichier correctement
        } else {
            setInputdata({ ...inputdata, [e.target.name]: e.target.value });
        }
    }

    // get single formation data
    const getFormationData = async () => {
        try {
            const res = await fetch(`http://localhost:5000/getform/${id}`);
            const data = await res.json();
            setInputdata(data);
        } catch (error) {
            console.error("Error fetching formation data:", error);
        }
    }

    useEffect(() => {
        getFormationData();
    }, []);

    // update formation data
    const updateFormation = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('namef', inputdata.namef);
        formData.append('datedebut', inputdata.datedebut);
        formData.append('datefin', inputdata.datefin);
        formData.append('professeurname', inputdata.professeurname);
        formData.append('image', inputdata.image); // Assurez-vous d'ajouter l'image au FormData

        try {
            const res = await fetch(`http://localhost:5000/updateform/${id}`, {
                method: "PATCH",
                body: formData // Utilisez l'objet FormData comme corps de la requête
            });
            const data = await res.json();
            setInputdata(data);
            toast.success('Formation updated successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            setTimeout(() => {
                navigate('/getform');
            }, 3000);
        } catch (error) {
            console.error("Error updating formation:", error);
            toast.error('Failed to update formation. Please try again.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    }

    return (
        <div className='container mt-5'>
            <h4>Edit Formation Information</h4>
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
                    <button className='btn btn-primary' onClick={updateFormation}>Update Formation</button>
                    <ToastContainer />
                    <NavLink className='btn btn-primary ms-auto' to="/getform">Back to Home</NavLink>
                </div>
            </form>
        </div>
    )
}

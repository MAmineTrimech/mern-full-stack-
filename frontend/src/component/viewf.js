import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom';
export default function Viewf() {

    const [getstud, SetGetstud] = useState([]);

    const { id } = useParams("");
    console.log(id);

    const getstuddata = async () => {
        const res = await fetch(`http://localhost:5000/getform/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetstud(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getstuddata();
    }, [])

    return (
        <div className='container mt-5'>
             <h4>All Formation Information</h4>
            <div className='underline'></div>
            <ul className="list-group w-50 mt-4">
                <li className="list-group-item active" aria-current="true">All Information About</li>
                <li className="list-group-item">Formation Name:- {getstud.namef}</li>
                <li className="list-group-item">Date-Début:-  {getstud.datedebut}</li>
                <li className="list-group-item">Date-Fin:-  {getstud.datefin}</li>
                <li className="list-group-item">Professeur Name:-  {getstud.professeurname}</li>
                <li className="list-group-item">:Image-  {getstud.image}</li>
                <li className="list-group-item">
                    <img src={`http://localhost:5000/getimage/${getstud.image}`} style={{ maxWidth: '100%', height: 'auto' }} />
                </li>

              
            </ul>
            <Link className='btn btn-primary mt-5' to="/getform">Back</Link>
        </div>
    )
}

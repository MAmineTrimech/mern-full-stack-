import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Allstud() {
    const [getstud, SetGetstud] = useState([]);

    // Fetch student data along with subject names
    const getstuddata = async () => {
        try {
            const res = await fetch("http://localhost:5000/getstud", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (res.status === 422 || !data) {
                console.log("error");
            } else {
                // Fetch subject names for each student
                const studentsWithSubjects = await Promise.all(data.map(async (student) => {
                    const subjectRes = await fetch(`http://localhost:5000/getform/${student.subject}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const subjectData = await subjectRes.json();
                    return {
                        ...student,
                        subject: subjectData ? subjectData.namef : "" 
                    };
                }));
                SetGetstud(studentsWithSubjects);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getstuddata();
    }, []);

    // Delete student data
    const deletestud = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/deletestud/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const deletedata = await res.json();
            if (res.status === 422 || !deletedata) {
                console.log("error");
            } else {
                getstuddata();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    // Search student
    const [searchInput, setSearchInput] = useState('');
    const searchStud = (searchval) => {
        setSearchInput(searchval);
    };

    return (
        <div className='container mt-5'>
            <div className='d-flex'>
                <h4>All Etudiants Information</h4>
                <div class="ms-auto w-50">
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search Student"
                        onChange={(e) => searchStud(e.target.value)}
                    />
                </div>
            </div>

            <div className='underline'></div>
            <table className="table table-bordered mt-5">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Formations</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getstud.filter((val) => {
                        if (searchInput === "") {
                            return val;
                        } else if (val.name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return val;
                        }
                        return null;
                    }).map((result, id) => {
                        return (
                            <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>{result.name}</td>
                                <td>{result.address}</td>
                                <td>{result.subject}</td>
                                <td>{result.contact}</td>
                                <td>
                                    <Link className='btn btn-success ms-2' to={`/view/${result._id}`}>View</Link>
                                    <Link className='btn btn-warning ms-2' to={`/edit/${result._id}`}>Update</Link>
                                    <button className='btn btn-danger ms-2'
                                        data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deletestud(result._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

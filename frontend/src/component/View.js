import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function View() {
    const [getstud, setGetStud] = useState([]);
    const [formationName, setFormationName] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const getStudentData = async () => {
            try {
                const studentRes = await fetch(`http://localhost:5000/getstud/${id}`);
                const studentData = await studentRes.json();
                setGetStud(studentData);

                // Fetch formation name if subject exists
                if (studentData.subject) {
                    const formationRes = await fetch(`http://localhost:5000/getformation/${studentData.subject}`);
                    const formationData = await formationRes.json();
                    setFormationName(formationData.name);
                } else {
                    setFormationName("Not Available");
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        getStudentData();
    }, [id]);

    return (
        <div className='container mt-5'>
            <h4>All Student Information</h4>
            <div className='underline'></div>
            <ul className="list-group w-50 mt-4">
                <li className="list-group-item active" aria-current="true">All Information About</li>
                <li className="list-group-item">Student Name: {getstud.name}</li>
                <li className="list-group-item">Student Address: {getstud.address}</li>
                <li className="list-group-item">Student Formation: {formationName}</li>
                <li className="list-group-item">Student Mobile: {getstud.contact}</li>
            </ul>
            <Link className='btn btn-primary mt-5' to="/allstud">Back</Link>
        </div>
    );
}

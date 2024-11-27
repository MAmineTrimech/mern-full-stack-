import React from 'react';
import imageSrc from '../images/amintr.png'; 
import imagelinkSrc from '../images/linkedin.png'; 
import imageemailSrc from '../images/email.png';
export default function Home() {
  return (
    <div className='container d-flex justify-content-center align-items'>
      <div>
        <h1 className='text-center'>Gestion Etudiant</h1>
        <div className='card shadow'>
          <div className='card-body'>
          <span style={{ fontFamily: 'Arial', fontSize: '20px', color: 'blue' }}>Projet </span> 
              <span style={{ fontFamily: 'Georgia', fontSize: '24px', fontWeight: 'bold', color: 'black' }}>Semestriel</span>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <span style={{fontWeight: 'bold', color: 'blue', marginRight: '150px' }}>Mohamed Amine Trimech</span>
                <img src={imageSrc} alt='Mohamed Amine Trimech' style={{ width: '190px', height: 'auto' }} />
              </li>
        
              <li className='list-group-item'><a href='mailto:aminetrimech22@gmail.com'><span style={{ marginRight: '345px' }}>E-mail</span></a> 
              <img src={imageemailSrc} alt='Mohamed Amine Trimech' style={{ width: '100px', height: 'auto' }} /> </li>
              <li className='list-group-item'><a href='https://www.linkedin.com/in/amine-trimech-91a76b20a/'><span style={{ marginRight: '210px' }}>connect to my Linkedin</span></a>
              <img src={imagelinkSrc} alt='Mohamed Amine Trimech' style={{ width: '140px', height: 'auto' }} /> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import './about-us.styles.scss';

// import G3 from '../../assets/img/guruji3.jfif';
import laptopGuitar from '../../assets/img/laptop-guitar.png'
const AboutUs = ( ) => (
  <div className = 'about-us' id='about-us'>
    <div className='container-fluid'>
    <h3 classname = 'about-us-heading'>About us</h3>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-6 col-xl-6'>
          <img src= {laptopGuitar} alt="man with guitar and laptop"/>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-xl-6'>
          <h2> We are the team of musicians and software developers</h2>
        </div>
      </div>
    </div>

  </div>
);

 
export default AboutUs;
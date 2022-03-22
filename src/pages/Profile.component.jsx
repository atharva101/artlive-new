import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { SocialIcon } from 'react-social-icons';
import { auth } from '../Firebase/firebase.utils';
import { withRouter } from 'react-router';
import * as firebase from 'firebase';


const ModalExample = (props) => {
  
  
  const {
    buttonLabel,
    className,
    profile,
    socialUrl1,
    socialUrl2,
    price,
    eventtitle,
    orderId,
    eventId,
    artitstName,
  } = props;
  
  
  
  let user = auth.currentUser;
  let found = undefined
 
  
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal);

  
  async function loadScript(src) {
    return new Promise(resolve => {
      const script = document.createElement('script')
      script.src = src
      
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
 }
    

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    
  
 
 
 
  function checkStatus () {
   if (auth.currentUser !== null) {
    let q = firebase.firestore().collection('users').doc(user.uid)
    q.get().then(function(doc){
    
      if (doc.exists) {
        
          
         firebase.firestore().collection('users').doc(user.uid).update('eventsPurchased', firebase.firestore.FieldValue.arrayUnion('0'))
         
     let a =  doc.data().eventsPurchased
     
        if(a===undefined || a=== null)
         {
          alert('You need to purchase the ticket to watch concert. Please wait payment gateway is loading....')
          displayRazorPay()
         }

         else{
          found = a.find(element => element === props.eventId);
         }
         
        
     if(found !== undefined){
      window.location.href = `/video?qwesdsad=${props.eventId}`
     }
     else{
       alert('You need to purchase the ticket to watch concert. Please wait payment gateway is loading....')
       displayRazorPay()
     }}
    }
   )
   } else {
     alert('Please login to continue')
     window.location.href = '/signin'
   }
  }


  async function displayRazorPay() {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    // var user = firebase.auth().currentUser;
   // var user = auth.currentUser;
    //console.log(user)

    if (user != null) {
      // User is signed in.
      let uid = user.uid
      
      if (!res) {
        alert('Razorpay SDK failed to load.')
        return
      }
    
  
     /* const data = await fetch('http://ec2-13-235-244-56.ap-south-1.compute.amazonaws.com:1337/verification', { method: 'POST' }).then((t) =>
        t.json()
      )*/

     // console.log(data)
     
      let str = props.price *100
      const options = {
        key: 'rzp_test_H0teHdXhlYCfKK',
        currency: 'INR',
        amount:  `${props.price  * 100} `,
        // logo:   
        description: `${props.eventtitle}`,
        
        handler: function (response) {
          if ( typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id > 1) {
            // Payment failed
            window.location.href = '/contact';
          } else { 
            // Payment successfull
            // window.location.href = '/'
            const eventRef = firebase.firestore().collection('users').doc(uid).update('eventsPurchased', firebase.firestore.FieldValue.arrayUnion(`${props.eventId}`))          
            alert('Payment Successfull')
           
           // console.log(isEvent)
            // if (db.collection('users').doc(uid).collection(events).doc())    
          }
        }, 
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } else {
      // No user is signed in.
      alert('Please login to continue')
      window.location.href = '/signin'
    } 
  }

  return (
  <div>
    <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} close={closeBtn}> <strong>{props.eventtitle} : {props.artitstName}</strong></ModalHeader>
      <ModalBody>
        {props.profile}
      
        
      </ModalBody>

      <ModalFooter>
     
      <SocialIcon url = {props.socialUrl1}></SocialIcon> 
      <SocialIcon url = {props.socialUrl2}></SocialIcon> 
      <Button color="primary" onClick={checkStatus}>Watch Now</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default withRouter(ModalExample);

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { SocialIcon } from 'react-social-icons';
import { Redirect } from 'react-router-dom';
import { auth } from '../Firebase/firebase.utils';
//import { firestore } from '../Firebase/firebase.utils';

import * as firebase from 'firebase';


const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    profile,
    url,
    price,
    eventtitle,
    orderId,
    eventId,
    artitstName

  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  let user = auth.currentUser;
 
 
 
  
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
     
    


  async function displayRazorPay() {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    // var user = firebase.auth().currentUser;
   // var user = auth.currentUser;
    console.log(user)

    if (user != null) {
      // User is signed in.
      let uid = user.uid
      
       
      if (!res) {
        alert('Razorpay SDK failed to load.')
        return
      }
    
  
      const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
        t.json()
      )

      console.log(data)


      let q = firebase.firestore().collection('users').doc('GwUIDilMfSP2feKBuNBiegeYlb13')
     // q.get().then(function(doc){
     //   if (doc.exists) {
          
      ///    let a = doc.data().eventsPurchased

          //console.log(a)
          //console.log(doc)

     //   }})

     
      let str = props.price *100
      const options = {
        key: 'rzp_test_H0teHdXhlYCfKK',
        currency: 'INR',
        amount:  str,
      
        // logo:   
        description: `${props.eventtitle}`,
        
        handler: function (response) {
          if ( typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id > 1) {
            // Payment failed
            window.location.href = '/contact';
          } else {
            // Payment successfull
            // window.location.href = '/'
            
            //const eventRef = firebase.firestore().collection('users').doc(uid).update('eventsPurchased', firebase.firestore.FieldValue.arrayUnion(`${props.eventId}`))
            firebase.firestore().collection('users').doc(uid).update({
                 eventId1 : true   
            })
            firebase.firestore().collection("events").where("eventId2", "==", 1)
            .onSnapshot(function(querySnapshot) {
                var cities = [];
                querySnapshot.forEach(function(doc) {
                    cities.push(doc.data().displayName);
                    if(doc.data().displayName === user.displayName){
                      console.log('aaaa')
                    }
                });
                console.log("Current cities in CA: ", cities.join(", "));
            });
            
           // }
            
            alert('Payment Successfull')
            
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
      <ModalHeader toggle={toggle} close={closeBtn}>About <strong>{props.artitstName}</strong></ModalHeader>
      <ModalBody>
        {props.profile}
      
        
      </ModalBody>
      <ModalFooter>
      <SocialIcon url = {props.url}></SocialIcon>      

        
        
        <Button color="primary" onClick={displayRazorPay}> Pay Now</Button>
       
         <Button>Watch Now</Button>
      
         
         
        
        
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default ModalExample;
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { SocialIcon } from 'react-social-icons';
import { Redirect } from 'react-router-dom';
import { auth } from '../Firebase/firebase.utils'



const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    profile,
    url,
    price,
    eventtitle,
    orderId,
    eventId

  } = props;

  const [modal, setModal] = useState(false);

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
  
  
  
  async function displayRazorPay() {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    // var user = firebase.auth().currentUser;
    var user = auth.currentUser;
    // console.log(user)

    if (user != null) {
      // User is signed in.
      console.log(1)
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }
    
  
      const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
        t.json()
      )
  
      console.log(data)
    
  
      const options = {
        key: 'rzp_test_H0teHdXhlYCfKK',
        currency: 'INR',
        amount: data.amount.toString(),
        order_id: data.id,
        
        description: 'Thank you for nothing. Please give us some money',
        image: 'http://localhost:1337/logo.svg',
        handler: function (response) {
          if ( typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id > 1) {
            // Payment failed
            window.location.href = '/contact';
          } else {
            // Payment successfull
            // window.location.href = '/'
            console.log(props.eventId)
            
          }
        },
        
        prefill: {
          
          email: 'sdfdsjfh2@ndsfdf.com',
          phone_number: '9899999999'
        }
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
      <ModalHeader toggle={toggle} close={closeBtn}>Modal title</ModalHeader>
      <ModalBody>
        {props.profile}

        <SocialIcon url = {props.url}></SocialIcon>      

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={displayRazorPay}> Pay Now</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default ModalExample;
import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import storage from '../../Firebase/firebase.utils';

import firebase from 'firebase';


class CreateEvent extends React.Component{
  constructor(){
      super();
      this.state = {
          id: '',
          eventtitle: '',
          date: '',
          time: '',
          artist: '',
          profile: '',
          eventurl: '',
          artistImage: null,
          artistImageURL: ''
          
      }
      this.uploadImage = this.uploadImage.bind(this)
      // var tempURL = ''
  }

  handleImageURLstate = url => {
    console.log(this.state)
    console.log('namit')
    console.log(url)  
  }
  // var handleImageURLstate (url) {
  //   console.log(this.state)
  //   console.log(url)
  // }
  
  handleSubmit = event => {
    event.preventDefault();
    const db = firebase.firestore();
    if (this.state.id && this.state.eventtitle && this.state.date && this.state.time && this.state.artist && this.state.profile && this.state.eventtitle !== '') {
      const eventRef = db.collection('events').add({
        id: this.state.id,
        eventtitle: this.state.eventtitle,
        date: this.state.date,
        time: this.state.time,
        artist: this.state.artist,
        profile: this.state.profile,
        eventurl: this.state.eventurl,
        artistImageURL: this.state.artistImageURL
      });
    } else {
      alert('Fill all the fields')
    }

    this.setState({
        id: '',
        eventtitle: '',
        date: '',
        time: '',
        artist: '',
        profile: '',
        eventurl: '',
        artistImageURL: ''
    })
    }
    


  handleChange = event => {
      const {value,name} = event.target

      this.setState({ [name]: value })
      console.log(this.state)
  }

  handleImage = event => {
    if (event.target.files[0]) {
      const artistImage = event.target.files[0]
      this.state.artistImage = artistImage
      console.log(this.state.artistImage)
    }
  }
  
  uploadImage = event => {
    // this.state.artistImageURL = 'asdasdas'
    // console.log(this.state.artistImageURL)
    var storageRef = firebase.storage().ref()
    const artistImage = this.state.artistImage
    const uploadTask = storageRef.child(`images/${artistImage.name}`).put(artistImage)
    // const uploadTask = storage.ref(`images/${artistImage.name}`).put(artistImage)

    var tempURL = ''

    uploadTask.on('state_changed', 
      function (snapshot) {

      },
      function (error) {
        console.log(error)
      },
      function () {
        // storageRef.child(`images/${artistImage.name}`).getDownloadURL().then( url => {
        //   this.tempURL = url
        //   console.log(url)
        //   console.log(123131)
        //   if (this.tempURL) {
        //     console.log(123)
        //     console.log(this.tempURL)
        //     this.handleImageURLstate(this.tempURL)
        //     // this.handleImageURLstate(tempURL)
        //     console.log(typeof(this.state.artistImageURL))
        //     this.state.artistImageURL = this.tempURL
        //     console.log(this.state)
        //   }
        //   // this.setState({artistImageURL: tempURL})
          
        // }).catch(function(error) {

        //   // A full list of error codes is available at
        //   // https://firebase.google.com/docs/storage/web/handle-errors
        //   switch (error.code) {
        //     case 'storage/object-not-found':
        //       // File doesn't exist
        //       console.log('storage/object-not-found')
        //       break;
        
        //     case 'storage/unauthorized':
        //       // User doesn't have permission to access the object
        //       console.log('storage/unauthorized')
        //       break;
        
        //     case 'storage/canceled':
        //       // User canceled the upload
        //       console.log('storage/canceled')
        //       break;
        
        //     case 'storage/unknown':
        //       // Unknown error occurred, inspect the server response
        //       console.log('storage/unknown')
        //       break;
        //   }
        // })
      }
    )
    // console.log(tempURL)
    // if (this.tempURL != '') {
    //   this.handleImageURLstate(tempURL)
    // }
    }


    // Get URL
    getURL = event => {
      event.preventDefault()
      var storageRef = firebase.storage().ref()
      const artistImage = this.state.artistImage
      storageRef.child(`images/${artistImage.name}`).getDownloadURL().then(url => {
        this.state.artistImageURL = url
        console.log(this.state)
      })
    }
    
  

  render(){
    return(
     <div className = 'createevent'>      
      
      <h1 style={{margin: '5vh 0'}}>Create Event</h1>

      <FormInput
        type = 'text'
        name = 'eventtitle'
        value = {this.state.eventtitle} 
        label = 'Event Title' 
        onChange = {this.handleChange}
        required
      />
      <FormInput 
        type= 'text'
        name = 'artist' 
        value = {this.state.artist} 
        label = 'Artist Name'
        onChange = {this.handleChange}
        required
      />
      <FormInput 
        type = 'date'
        name = 'date' 
        value = {this.state.date} 
        onChange = {this.handleChange} 
        required
        />
      <FormInput 
        type = 'time'
        name = 'time' 
        value = {this.state.time} 
        onChange = {this.handleChange} 
        required
      />
      <FormInput 
        type = 'text'
        name = 'profile' 
        value = {this.state.profile} 
        label = 'Profile' 
        onChange = {this.handleChange} 
        required
      />
      <FormInput
        type = 'text'
        name = 'eventurl'
        value = {this.state.eventurl} 
        label = 'Youtube Url'
        onChange = {this.handleChange} 
        required
      />
      <FormInput
        type = 'text'
        name = 'id' 
        value = {this.state.id} 
        label = 'Event Id'
        onChange = {this.handleChange} 
        required
      />
      <input
        className = 'form-control'
        type = 'file'
        name = 'artist-image' 
        value = {this.state.artistImage} 
        label = 'Artist Image'
        onChange = {this.handleImage} 
        style={{marginBottom: '1.5rem'}}
        required
      />
  
    <div className = 'button'>
      <CustomButton type = 'submit' onClick = {this.uploadImage}>Upload</CustomButton>
      <CustomButton type = 'submit' onClick = {this.getURL}>Get URL</CustomButton>
      <CustomButton type = 'submit' onClick = {this.handleSubmit}>Submit</CustomButton>
    </div>
  </div>
    )
  }
}

export default CreateEvent;
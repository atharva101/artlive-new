import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';


import './event-tile.styles.scss';

const EventTile = ({ eventTitle, artitstName, eventDate, eventTime, artistImageURL}) => 
  
 
   ( <div >
      <Card className='event-card'>
        <CardBody>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <img src= {artistImageURL} alt="artist image" className='artist-image'/>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <CardTitle className='event-title'>{eventTitle}</CardTitle>
              <CardSubtitle className='artist-name'>Artist Name: {artitstName}</CardSubtitle>
              <CardBody>
              <CardText>Event Date: {eventDate}</CardText>
              <CardText>Event Time: {eventTime}</CardText>
              </CardBody>
            </div>
          </div>
        </CardBody>
        
      </Card>
    </div>)
 
export default EventTile;
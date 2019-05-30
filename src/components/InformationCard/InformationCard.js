import React from "react";
import Moment from 'react-moment';
import './InformationCard.css' 

function InformationCard(props) {
    const measurements = props.airQualityInfo.measurements;
  return (
    <div className="card">
     <span className="close" onClick={props.removeCard}></span>
     <p className='updated-time'>Updated <Moment fromNow>{props.lastUpdated}</Moment> </p>
      <p className='city'>{props.airQualityInfo.city}</p>
      <p className='location'>
        In {props.airQualityInfo.location}, {props.airQualityInfo.country === 'GB' ? 'United Kingdom' : null}
      </p>
      <strong >
       <span className='values-text'>Values:</span>
       {props.airQualityInfo
        ? measurements.map( (parameter, index) => (
              <span className='parameters' key={index}>
                 {parameter.parameter.toUpperCase()}: {index === measurements.length - 1 ? parameter.value :  `${parameter.value}, `}
              </span>
          ))
        : null}
        </strong>
    </div>
  );
}
export default InformationCard;

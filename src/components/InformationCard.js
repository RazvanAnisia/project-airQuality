import React from "react";
import Moment from 'react-moment';

function InformationCard(props) {
    const measurements = props.airQualityInfo.measurements;

  return (
    <div className="card">
     <span className="close" onClick={props.removeCard}></span>
     <p className='updated-time'>Updated <Moment fromNow>{props.lastUpdated.to}</Moment> </p>
      <p className='city'>{props.airQualityInfo.city}</p>
      <p className='location'>In {props.airQualityInfo.location}, {props.airQualityInfo.country === 'GB' ? 'United Kingdom' : null}</p>
      <strong > Values:
      {props.airQualityInfo
        ? measurements.map( (parameter, index) => (
              <span className='parameters' key={index}> {parameter.parameter.toUpperCase()}:{parameter.value}, </span>
          ))
        : null}
        </strong>
    </div>
  );
}
export default InformationCard;

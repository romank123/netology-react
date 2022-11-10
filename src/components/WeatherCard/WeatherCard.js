import React from 'react';
import Card from '../Card/Card';
import './WeatherCard.css';

/**
 * Карточка погоды
 */
function WeatherCard(...props) {
  return (
    <Card {...props}
      className='weather-card'
      title='Погода'
      text={[
        <img className='weather-pic' src='rainy.jpg' alt='rainy' key={1}/>,
        <span className='weather-temp' key={2}>{'+17°'}</span>,
        <div className='weather-text' key={3}>{'Утром +17, днём +20'}</div>,
      ]}
    />
  );
}

export default WeatherCard;

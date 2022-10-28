import React from 'react';
import PropTypes from 'prop-types';
import StepModel from '../Steps/StepModel';
import moment from 'moment';
import './StepItem.css';

export default function StepItem(props) {
  const { date, distance } = props.item;

  return (
    <div className='step-item'>
      <div className='step-item-date'>{moment(date).format('DD.MM.YY')}</div>
      <div className='step-item-distance'>{distance.toFixed(1)}</div>
      <div className='step-item-actions'>
        <i className={'material-icons'} title='Edit' onClick={props.onEdit}>edit</i>
        <i className={'material-icons'} title='Delete' onClick={props.onRemove}>delete_outline</i>
      </div>
    </div>
  )
}

StepItem.propTypes = {
  item: PropTypes.instanceOf(StepModel).isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

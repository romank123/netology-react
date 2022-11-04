import React from 'react';
import PropTypes from 'prop-types';
import StepItem from '../StepItem/StepItem';
import './StepList.css';

export default function StepList(props) {
  const { steps } = props;

  const handleRemove = (id) => props.onRemove(id);
  const handleEdit = (id) => props.onEdit(id);

  const sortedSteps = steps.sort((a, b) => {
    if (Date.parse(a.date) < Date.parse(b.date)) return 1;
    return -1;
  });

  return (
    <div className='step-list'>
      <div className='step-list-header'>
        <div className='step-list-header-date'>{'Дата (ДД.ММ.ГГ)'}</div>
        <div className='step-list-header-distance'>{'Пройдено км'}</div>
        <div className='step-list-header-actions'>{'Действия'}</div>
      </div>
      <div className='step-list-body'>
        {
          sortedSteps.map((o) => 
            <StepItem
              item={o}
              onEdit={() => handleEdit(o.id)}
              onRemove={() => handleRemove(o.id)}
              key={o.id}
            />
          )
        }
      </div>
    </div>
  );
}

StepList.propTypes = {
  steps: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

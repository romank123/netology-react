import React from 'react';
import PropTypes from 'prop-types';

export default function Quantity(props) {
  const {
    title,
    value,
    onIncrease,
    onDecrease,
  } = props;

  return (
    <p>
      {title}
      <span className="btn-group btn-group-sm pl-2">
        <button type="button" className="btn btn-secondary" onClick={onDecrease}>-</button>
        <span className="btn btn-outline-primary">{value}</span>
        <button type="button" className="btn btn-secondary" onClick={onIncrease}>+</button>
      </span>
    </p>
  );
}

Quantity.defaultProps = {
  title: '',
};

Quantity.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

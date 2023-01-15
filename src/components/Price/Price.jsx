import React from 'react';
import PropTypes from 'prop-types';

export default function Price({ value, currency }) {
  const valueStr = String(value).replace(/(\d)(?=(\d{3})$)/g, '$1 ');
  return (
    <>
      { `${valueStr} ${currency}` }
    </>
  );
}

Price.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

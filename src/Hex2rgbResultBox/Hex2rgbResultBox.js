import './Hex2rgbResultBox.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function Hex2rgbResultBox(props) {
  const { hex } = props;

  const result = hex && `rgb(${parseInt(hex.slice(1,3), 16)}, ${parseInt(hex.slice(3,5), 16)}, ${parseInt(hex.slice(5), 16)})`

  return <div className='hex2rgb-result-box'>{result}</div>;
}

Hex2rgbResultBox.defaultProps = {
  hex: 'Ошибка!',
}

Hex2rgbResultBox.propTypes = {
  hex: PropTypes.string,
}

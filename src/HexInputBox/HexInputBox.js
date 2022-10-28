import './HexInputBox.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function HexInputBox(props) {
  const onChange = (evt) => { props.onChange(evt.target.value) };

  return <input className='hex-input-box' value={props.value} onChange={onChange}/>;
}

HexInputBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

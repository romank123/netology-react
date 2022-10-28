import './Hex2rgb.css';
import React from 'react';
import HexInputBox from '../HexInputBox/HexInputBox';
import Hex2rgbResultBox from '../Hex2rgbResultBox/Hex2rgbResultBox';

const defaultHex = '#ffffff';

export default function Hex2rgb(props) {
  const [hex, setHex] = React.useState(defaultHex);
  const [value, setValue] = React.useState(defaultHex);
  
  const handleChange = (value) => {
    if (/^#[\da-fA-F]{6}$/.test(value)) setHex(value);
    setValue(value);
  }

  return (
    <div className='hex2rgb' style={{backgroundColor: hex}}>
      <HexInputBox value={value} onChange={handleChange}/>
      <Hex2rgbResultBox hex={hex === value ? hex : null}/>
    </div>
  )
}

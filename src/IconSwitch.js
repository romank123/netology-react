import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  cursor: 'pointer',
  userSelect: 'none',
}

function IconSwitch(props) {
  const { icon, onSwitch } = props;
  return (
    <i 
      className={'material-icons'}
      onClick={onSwitch}
      style={styles}
    >{icon}</i>
  )
}

IconSwitch.propTypes = {
  icon: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired,
}

export default IconSwitch

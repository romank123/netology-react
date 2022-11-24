import React from 'react'
import PropTypes from 'prop-types'
import Watch from '../Watch/Watch';
import './WatchesList.css';

function WatchesList(props) {
  const handleClose = (name) => {
    if (props.onRemove) props.onRemove(name);
  }

  return (
    <div className='watches-list'>
      {
        props.items.map((o) =>
          <Watch {...o} onClose={handleClose} key={o.name}/>
        )
      }
    </div>
  )
}

WatchesList.defaultProps = {
  items: [],
}

WatchesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    zone: PropTypes.number.isRequired,
  })),
  onRemove: PropTypes.func.isRequired,
};

export default WatchesList;

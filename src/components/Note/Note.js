import React from 'react';
import PropTypes from 'prop-types';
import './Note.css';

function Note(props) {
  const { id, content, onClose } = props;
  return (
    <div className='note'>
      <div className='note-content'>{content}</div>
      <div className='note-close' onClick={() => onClose(id)}>
        <i className='material-icons'>{'close'}</i>
      </div>
    </div>
  )
}

Note.propTypes = {
  // id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Note;

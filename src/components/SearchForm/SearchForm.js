import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';

/**
 * Компонент - поисковая строка
 */
function SearchForm({ value, onChange, onSubmit, className }) {
  return (
    <form className={className + ' search-form'} onSubmit={onSubmit}>
      <input
        className='search-input'
        name='request'
        type='text'
        onChange={(evt) => onChange(evt.target.value)}>
      </input>
      <img className='search-keyboard' src='' alt=''/>
      <button type='submit'>{'Найти'}</button>
    </form>
  );
}

SearchForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SearchForm;


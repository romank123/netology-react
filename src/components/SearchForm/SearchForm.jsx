import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { changeGlobalSetting } from '../../redux/globalSettings/actions';

export default function SearchForm(props) {
  const { className, dataId, onSubmit } = props;
  const { searchString } = useSelector((state) => state.globalSettings);
  const dispatch = useDispatch();

  const inputEl = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchString.trim());
  };

  const handleChange = (evt) => {
    dispatch(changeGlobalSetting({ searchString: evt.target.value }));
  };

  useEffect(() => {
    if (!className.includes('invisible')) inputEl.current.focus();
    return () => {};
  }, [className]);

  return (
    <form
      className={className}
      data-id={dataId}
      onSubmit={handleSubmit}
    >
      <input
        className="form-control"
        placeholder="Поиск"
        value={searchString}
        onChange={handleChange}
        ref={inputEl}
      />
    </form>
  );
}

SearchForm.defaultProps = {
  className: '',
  dataId: '',
};

SearchForm.propTypes = {
  className: PropTypes.string,
  dataId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

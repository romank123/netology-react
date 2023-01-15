/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { categoryChangeSelection, categoryRequest } from '../../redux/categories/actions';

export default function Categories(props) {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryRequest());
    return () => {};
  }, [dispatch]);

  const selectedCount = categories.filter((o) => o.selected).length;

  const changeSelectionToAll = (value) => {
    categories.forEach((o) => {
      dispatch(categoryChangeSelection({ id: o.id, selected: value }));
    });
  };

  const handleClick = (evt, item) => {
    if (evt) evt.preventDefault();
    if (!item) {
      changeSelectionToAll(false);
      props.onClick();
      return;
    }
    const { id, selected } = item;
    changeSelectionToAll(false);
    dispatch(categoryChangeSelection({ id, selected: !selected }));
    props.onClick(!selected ? id : null);
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a
          href="#"
          className={`nav-link ${!selectedCount ? ' active' : ''}`}
          onClick={(evt) => handleClick(evt)}
        >
          Все
        </a>
      </li>
      {categories.map((o) => (
        <li className="nav-item" key={o.id}>
          <a
            href="#"
            className={`nav-link ${o.selected ? ' active' : ''}`}
            onClick={(evt) => handleClick(evt, o)}
          >
            {o.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

Categories.defaultProps = {
  onClick: () => {},
};

Categories.propTypes = {
  onClick: PropTypes.func,
};

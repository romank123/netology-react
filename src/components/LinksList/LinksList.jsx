import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export default function LinksList({
  links, className, onClick, activateLink,
}) {
  const { pathname } = useLocation();

  return (
    <ul className={className}>
      { links.map((o) => (
        <li
          className={`nav-item${(activateLink && (pathname === o.route)) ? ' active' : ''}`}
          key={o.name}
        >
          <Link to={o.route} className="nav-link" onClick={() => onClick(o.name)}>{o.name}</Link>
        </li>
      ))}
    </ul>
  );
}

LinksList.defaultProps = {
  links: [],
  className: '',
  onClick: () => {},
  activateLink: false,
};

LinksList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    active: PropTypes.bool,
  })),
  className: PropTypes.string,
  onClick: PropTypes.func,
  activateLink: PropTypes.bool,
};

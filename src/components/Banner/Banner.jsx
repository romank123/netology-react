import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Banner({ src, name, link }) {
  return (
    <div className="banner">
      <Link to={link}>
        <img src={src} className="img-fluid" alt={name} />
        <h2 className="banner-header">{name}</h2>
      </Link>
    </div>
  );
}

Banner.defaultProps = {
  name: '',
  link: '',
};

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string,
  link: PropTypes.string,
};

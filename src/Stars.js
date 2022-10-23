import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Star from './Star';

export default function Stars(props) {
  const { count } = props;
  const values = [1, 2, 3, 4, 5];
  return (
    <div>
      {
        !(count && values.find((o) => o === count))
        ||
        <ul className={'card-body-stars u-clearfix'}>
          {values.slice(0, count).map(() => <Star key={shortid.generate()}/>)}
        </ul>
      }
    </div>
  );
}

Stars.defaultProps = {
  count: 0,
}

Stars.propTypes = {
  count: PropTypes.number.isRequired,
}

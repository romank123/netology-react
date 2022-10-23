import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Item from './Item';

export default function Listing(props) {
  const { items } = props;
  return (
    <div class='item-list'>
      {
        items.map((o) => <Item data={o} key={shortid.generate()}/>)
      }
    </div>
  );
}

Listing.propTypes = {
  items: PropTypes.array.isRequired,
}

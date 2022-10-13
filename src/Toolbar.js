import React from 'react';
import PropTypes from 'prop-types';

function Toolbar(props) {
  const { filters, selected } = props;

  const onClick = (filter) => props.onSelectFilter(filter);

  return (
    <div className='toolbar'>
      {
        filters.map((o) =>
          <div className={'filter' + ((o === selected) ? ' selected' : '')} key={o} onClick={() => onClick(o)}>{o}</div>
        )
      }
    </div>
  );
}

export default Toolbar;

Toolbar.propTypes = {
  filters: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
}

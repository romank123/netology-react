import React from 'react'
import PropTypes from 'prop-types'
import ShopItem from './ShopItem'
import uniqid from 'uniqid'

const styles = {
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'stretch',
}

function ListView(props) {
  return (
    <div className={'cards-view'} style={styles}>
      {props.items.map((o) => <ShopItem data={o} key={uniqid()}/>)}
    </div>
  )
}

ListView.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ListView

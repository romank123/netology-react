import React from 'react'
import PropTypes from 'prop-types'
import ShopCard from './ShopCard'
import uniqid from 'uniqid'

const styles = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-evenly',
}

function CardsView(props) {
  return (
    <div className={'cards-view'} style={styles}>
      {props.cards.map((o) => <ShopCard data={o} key={uniqid()}/>)}
    </div>
  )
}

CardsView.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default CardsView

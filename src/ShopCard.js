import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  flexBasis: '30',
  maxHeight: '25rem',
  maxWidth: '25rem',
  backgroundColor: 'whitesmoke',
  boxShadow: '.3rem .6rem .8rem lightgrey',
  margin: '1rem',
  padding: '1rem',
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
}

const cardPriceRowStyles = {
  alignSelf: 'stretch',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const addBtnStyles = {
  color: 'red',
  border: '.1rem solid red',
  height: '2em',
  lineHeight: '1.9em',
  width: '7.5em',
  textAlign: 'center',
  borderRadius: '1em',
}

function ShopCard(props) {
  const { data } = props;
  return (
    <div className={'shop-card'} style={styles}>
      <div className={'card-name'} style={{ fontSize: '2em' }}>
        {data.name}
      </div>
      <div className={'card-color'} style={{ fontSize: '1em' }}>
        {data.color}
      </div>
      <img className={'card-img'} alt='' src={data.img} style={{ height: '300px', width: '300px' }}/>
      <div className={'card-price-row'} style={cardPriceRowStyles}>
        <div className={'card-price'} style={{ color: 'red', fontSize: '1.5em' }}>
          {'$' + data.price}
        </div>
        <div className={'add-btn'} style={addBtnStyles}>{'ADD TO CART'}</div>
      </div>
    </div>
  )
}

ShopCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ShopCard


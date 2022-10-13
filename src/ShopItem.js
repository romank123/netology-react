import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  flex: '1 1 auto',
  // width: '2rem',
  backgroundColor: 'whitesmoke',
  boxShadow: '.2rem .4rem .8rem lightgrey',
  margin: '.3rem 0',
  padding: '.5rem 2rem',
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

function ShopItem(props) {
  const { data } = props;
  return (
    <div className={'shop-item'} style={styles}>
      <img className={'card-img'} alt='' src={data.img} style={{ height: '5rem', width: 'auto', margin: '-.5rem 0' }}/>
      <div className={'card-name'} style={{ fontSize: '1.5em', flexBasis: '30%' }}>
        {data.name}
      </div>
      <div className={'card-color'} style={{ fontSize: '1em', flexBasis: '20%' }}>
        {data.color}
      </div>
      <div className={'card-price'} style={{ color: 'red', fontSize: '1.5em', flexBasis: '20%' }}>
        {'$' + data.price}
      </div>
      <div className={'add-btn'} style={addBtnStyles}>{'ADD TO CART'}</div>
    </div>
  )
}

ShopItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ShopItem


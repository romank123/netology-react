import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link/Link'
import Image from '../Image/Image'
import 'Banner.css'

/**
 * Компонент - баннер
 */
function Banner(props) {
  return (
    <Link href={props.href}>
      <Image src={props.src}/>
    </Link>
  )
}

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default Banner


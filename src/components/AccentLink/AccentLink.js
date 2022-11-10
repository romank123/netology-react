import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link/Link'
import './AccentLink.css'

/**
 * Компонент - выделяющаяся ссылка, используется, чаще всего, как заголовок карточки
 */
function AccentLink(props) {
  return (
    <Link className={`accent-link-${props.size} ${props.faded && 'faded'}`} href={props.href}>
      {props.children}
    </Link>
  )
}

AccentLink.defaultProps = {
  size: 'normal',
  faded: false,
}

AccentLink.propTypes = {
  /** Размер шрифта */
  size: PropTypes.oneOf(['normal', 'large', 'small']),

  /** Приглушение цвета */
  faded: PropTypes.bool,
}

export default AccentLink


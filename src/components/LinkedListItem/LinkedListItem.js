import React from 'react'
import ListItem from '../ListItem/ListItem'
import Link from '../Link/Link'

/**
 * Компонент - элемент списка со ссылкой
 */
function LinkedListItem(props) {
  return (
    <ListItem className='' {...props} style={props.style}>
      <Link href={props.href}>{props.children}</Link>
    </ListItem>
  )
}

export default LinkedListItem


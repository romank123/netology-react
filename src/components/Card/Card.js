import React from 'react'
import './Card.css'

/**
 * Компонент - карточка с картинкой, заголовком,
 * текстом, доп текстом и ссылкой
 */
function Card({ img, title, text, text2, href, className, ...props }) {
  return (
    <div {...props} className={(className || '') + ' card'}>
      <a href={href || '#'}>
        {img && <img className='card-image' src='img' alt=''/>}
        {title && <div className='card-title'>{title}</div>}
        {text && <div className='card-text'>{text}</div>}
        {text2 && <div className='card-text2'>{text2}</div>}
      </a>
    </div>
  );
}

export default Card;

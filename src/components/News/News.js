import React from 'react'
import InlineCard from '../InlineCard/InlineCard';
import moment from 'moment';
import './News.css'

/**
 * Компонент - блок с новостями
 */
function News({newsSections, news, currencies, ...props}) {
  moment.locale('ru');
  return (
    <div className='news'> {/* можно завернуть в компонент */}
      <div className='news-header'>
        {newsSections.map((o, index) =>
          <a className={`h3 ${o.faded && 'faded'}`} href={o.href || '#'} key={index}>{o.text}</a>
        )}
        <div className='header-date'>{moment().format('llll')}</div>
      </div>
      <div className='news-body'>
        {news.map((o, index) => <InlineCard {...o} key={index}/>)}
      </div>
      <div className='news-footer'>
        {currencies.map((o, index) => <InlineCard {...o} key={index}/>)}
      </div>
    </div>
  )
}


export default News


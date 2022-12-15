import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostsContext } from './PostsContext';
import { prettyDate } from './PrettyDate';
import PropTypes from 'prop-types';

export function Post(props){
  let { id } = useParams();
  const { posts } = useContext(PostsContext);

  function findPost() {
    if (props.id){
      return posts.find(o => o.id === props.id);
    } else if (id){
      return posts.find(o => Number(o.id) === Number(id));
    }
  }

  const date = prettyDate(findPost().created);

  return(
     <div className="post" onClick={props.onClick}>
       <div className="post__header">
         <img className="author__avatar" src="" />
         <div>
           <h5 className="author__name">Ilnaz Gilyazov</h5>
             <span className="author__title">
               Основатель группы
             </span>
             <span className="date">{date}</span>
         </div>
       </div>
       <div className="post__body">
         <p className="post__text">{findPost().content}</p>
       </div>
       <div className="post__reactions">
         <a href="#" className="post__reaction">
           <span className="material-icons">
             thumb_up
           </span>
           <span>Нравится</span>
         </a>
         <a href="#" className="post__reaction">
           <span className="material-icons">
             mode_comment
           </span>
           <span>Комментировать</span>
         </a>
       </div>
        {props.children}
     </div>
  )
};

Post.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.number,
    children: PropTypes.node
};

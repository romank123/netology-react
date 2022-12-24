import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PostsContext } from './PostsContext';
import { prettyDate } from './PrettyDate';
import PropTypes from 'prop-types';
import image from './assets/003-image.svg';

export function Post(props){
  let history = useHistory();
  let { id } = useParams();
  const { posts } = useContext(PostsContext);

  function findPost() {
    if (props.id){
      return posts.find(o => o.id === props.id);
    } else if (id){
      return posts.find(o => Number(o.id) === Number(id));
    }
  }

  const onClose = (e) => {
    e.preventDefault();
    history.goBack();
  }

  const date = prettyDate(findPost().created);

  return(
     <div className="post" onClick={props.onClick}>
      <button className="close close_edit" onClick={onClose}>
         <span className="material-icons">
          close
         </span>
       </button>
      <h4 className="edit-post__header">Редактировать публикацию</h4>
       <div className="post__header">
         <img className="author__avatar" src={image} alt="#"/>
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
         <a href="/" className="post__reaction">
           <span className="material-icons">
             thumb_up
           </span>
           <span>Нравится</span>
         </a>
         <a href="/" className="post__reaction">
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

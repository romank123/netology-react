import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PostForm } from './PostForm';
import { PostsContext } from './PostsContext';

export function NewPost() {
  const [text, setText] = useState("");
  const { fetchPosts } = useContext(PostsContext);
  let history = useHistory();

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onPublish = (e) => {
    e.preventDefault();
    const post = {id:0, content:text};

    fetch('http://localhost:7777/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(response.statusText);
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      fetchPosts();
      history.replace("/");
    })
  }

  const onClose = (e) => {
    e.preventDefault();
    history.replace("/");
  }

  return(
     <div className="new-post">
       <button className="close" onClick={onClose}>
         <span className="material-icons">
          close
         </span>
       </button>
       <ul className="new-post__options">
         <li><a href="#">Публикация</a></li>
         <li><a href="#">Фото/видео</a></li>
         <li><a href="#">Прямой эфир</a></li>
         <li><a href="#">Ещё</a></li>
       </ul>
       <PostForm name="new-text"
                submitValue="Опубликовать"
                text={text}
                onChange={onChange}
                onSubmit={onPublish}
       />
     </div>
  )
};

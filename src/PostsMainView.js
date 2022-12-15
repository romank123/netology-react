import React, {useContext} from 'react';
import {Post} from './Post';
import {Comment} from './Comment';
import {PostsContext} from './PostsContext';
import {Link, useHistory} from 'react-router-dom';

export function PostsMainView() {
    let history = useHistory();
    const { posts } = useContext(PostsContext);

    const openPost = (id) => {
        history.push(`/posts/${id}`);
    }

    return(
       <>
        <div className="background">
          <div className="add-panel">
            <Link to="/posts/new" exact className="button">Создать пост</Link>
          </div>
          <ul>
            {posts.map(post =>
            <li><Post {...post} onClick={() => openPost(post.id)}>
                 <Comment />
                </Post>
            </li>
            )}
          </ul>
        </div>
       </>
    );
}

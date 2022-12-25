import React, {useState, useEffect, createContext} from 'react';
import PropTypes from 'prop-types';

export const PostsContext = createContext([]);

export function PostsProvider(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      fetchPosts();
    }, []);
   
    const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:7777/posts");
          if (!response.ok) {
              throw new Error(response.statusText);
          }
          const posts = await response.json();
          setPosts(posts);
        } catch(e) {
            console.log(e);
        }
      };

    return(
        <PostsContext.Provider value={{posts, fetchPosts}}>
        {props.children}
        </PostsContext.Provider>
    )
};

PostsProvider.propTypes = {
  children: PropTypes.node
};

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PostsMainView } from './PostsMainView';
import { NewPost } from './NewPost';
import { EditPost } from './EditPost';
import { PostWithButtons } from './Buttons';
import { PostsProvider } from './PostsContext';
import './App.css';


function App() {

  return(
    <PostsProvider>
     <Router>
       <Route path="/" exact component={PostsMainView} />
       <Switch>
         <Route path="/posts/new" exact component={NewPost} />
         <Route path="/posts/:id" exact component={PostWithButtons} />
       </Switch>
       <Switch>
         <Route path="/posts/:id/edit" exact component={EditPost} />
       </Switch>
     </Router>
    </PostsProvider>
  )
};

export default App;

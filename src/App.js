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
       <Route  exact path="/"  component={PostsMainView} />
       <Switch>
         <Route  exact path="/posts/new" component={NewPost} />
         <Route exact  path="/posts/:id" component={PostWithButtons} />
       </Switch>
       <Switch>
         <Route  exact path="/posts/:id/edit" component={EditPost} />
       </Switch>
     </Router>
    </PostsProvider>
  )
};

export default App;

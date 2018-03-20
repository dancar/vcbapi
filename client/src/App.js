import React, { Component } from 'react';
import BookmarkCreateForm from './containers/bookmark_create_form'
import BookmarkList from './containers/bookmarks_list'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bookmarks</h1>
        <BookmarkList/>
      </div>
    );
  }
}

export default App;

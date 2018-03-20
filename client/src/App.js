import React, { Component } from 'react';
import BookmarkCreateForm from './containers/bookmark_create_form'
import BookmarkListContainer from './containers/bookmarks_list_container'
import SearchContainer from './containers/search_container'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bookmarks</h1>
        <SearchContainer/>
        <BookmarkListContainer/>
      </div>
    );
  }
}

export default App;

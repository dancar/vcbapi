import React, { Component } from 'react';
import BookmarkForm from './components/bookmark_form'
import BookmarkList from './containers/bookmarks_list'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BookmarkList/>
      </div>
    );
  }
}

export default App;

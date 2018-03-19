import React from 'react'
import { connect } from 'react-redux'
// import * as types from '../store/actionTypes'
import { fetchBookmarks } from '../store/actions'
import './bookmarks_list.css'

class BookmarksList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchBookmarks())
  }

  render () {
    if (!this.props.bookmarks) {
      return "Loading..." // TODO: something nicer
    }

    return (
      <div className="bookmarks-list">
        <h1>Bookmarks:</h1>
        { Object.keys(this.props.bookmarks).map((id) => this.renderBookmark(id, this.props.bookmarks[id])) }
      </div>
    )
  }

  renderBookmark(id, {title, url, shortening}) {
    return (
      <div key={id} className="bookmark-row">
        <div>
          {title}
        </div>

        <div>
          <a href={url} target="_new">
            {url}
          </a>
        </div>

        <div>
          <a href={shortening} target="_new">
          {shortening}
          </a>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const bookmarks = state.bookmarks

  return {bookmarks}
}

export default connect(mapStateToProps)(BookmarksList)

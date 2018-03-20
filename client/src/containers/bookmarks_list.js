import React from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
// import * as types from '../store/actionTypes'
import { fetchBookmarks, deleteBookmark } from '../store/actions'
import './bookmarks_list.css'

class BookmarksList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchBookmarks())
  }

  render () {
    if (!this.props.bookmarks) {
      return this.renderLoading()
    }

    if (Object.keys(this.props.bookmarks).length === 0) {
      return this.renderEmpty()
    }

    return (
      <div className="bookmarks-list">
        { Object.keys(this.props.bookmarks).map((id) => this.renderBookmark(id, this.props.bookmarks[id])) }
      </div>
    )
  }

  renderLoading () {
    console.log('<-DANDEBUG-> bookmarks_list.js\\ 31: <here>');
    return "Loading..." // TODO: something else?
  }

  renderEmpty () {
    console.log('<-DANDEBUG-> bookmarks_list.js\\ 35: <here>');
    return "No Bookmarks yet..."
  }

  handleDelete (id) {
    this.props.dispatch(deleteBookmark(id))
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

        <div>
          <Button onClick={() => this.handleDelete(id)}>Delete</Button>
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

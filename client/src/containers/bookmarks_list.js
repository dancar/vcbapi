import React from 'react'
import { connect } from 'react-redux'
// import * as types from '../store/actionTypes'
import { fetchBookmarks, deleteBookmark, createBookmark, updateBookmark} from '../store/actions'
import './bookmarks_list.css'
import  BookmarkListItem  from '../components/bookmark_list_item'

class BookmarksList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      editable: null
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchBookmarks())
  }


  handleDelete (id) {
    this.props.dispatch(deleteBookmark(id))
  }

  handleCreate (attributes) {
    this.props.dispatch(createBookmark(attributes))
  }


  createSaveHandler (id) {
    return (attributes) => {
      this.props.dispatch(updateBookmark(id, attributes))
      this.setState({
        editable: null
      })
    }
  }

  render () {
    if (!this.props.bookmarks) {
      return this.renderLoading()
    }

    return (
      <div className="bookmarks-list">
        <BookmarkListItem
          creator
          onSubmit={this.handleCreate.bind(this)}
          />
        { Object.keys(this.props.bookmarks).map((id) => this.renderBookmark(id, this.props.bookmarks[id])) }
      </div>
    )
  }

  renderLoading () {
    return "Loading..." // TODO: something else?
  }

  renderBookmark(id, {title, url, shortening}) {
    return (
      <BookmarkListItem
        key={id}
        id={id}
        title={title}
        url={url}
        shortening={shortening}
        onCancelEdit={() => this.setState({editable: null})}
        onEdit={() => this.setState({editable: id})}
        onDelete={() => this.handleDelete(id)}
        onSubmit={this.createSaveHandler(id)}
        editable={this.state.editable === id}/>
    )
  }

}

function mapStateToProps(state) {
  const bookmarks = state.bookmarks

  return {bookmarks}
}

export default connect(mapStateToProps)(BookmarksList)

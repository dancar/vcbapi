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
    this.props.fetchBookmarks()
  }


  handleDelete (id) {
    this.props.deleteBookmark(id)
  }

  handleCreate (attributes) {
    this.props.createBookmark(attributes)
  }


  createSaveHandler (id) {
    return (attributes) => {
      this.props.updateBookmark(id, attributes)
      this.setState({
        editable: null
      })
    }
  }

  render () {
    if (!this.props.sites) {
      return this.renderLoading()
    }

    return (
      <div className="bookmarks-list">
        <div className="bookmark-row bookmark-row-header">
          <div>Title</div>
          <div>URL</div>
          <div>Shortening</div>
          <div>Tags</div>
        </div>
        <BookmarkListItem
          creator
          onCreate={this.handleCreate.bind(this)}
          />
        {Object.keys(this.props.sites).map((id) => this.renderSite(id, this.props.sites[id])) }
      </div>
    )
        // { Object.keys(this.props.sites).map((id) => this.renderBookmark(id, this.props.bookmarks[id])) }
  }

  renderLoading () {
    return "Loading..." // TODO: something else?
  }

  renderSite (id, site) {
    return [(
      <div className="site" >
        <div>
          <div>
          {site.hostname}
          </div>
        </div>
      </div>)].concat(site.bookmark.map(this.renderBookmark.bind(this)))

  }
  renderBookmark(attributes) {
    const id = attributes.id
    return (
      <BookmarkListItem
        key={id}
        initialAttributes={attributes}
        id={id}
        onCancelEdit={() => this.setState({editable: null})}
        onEdit={() => this.setState({editable: id})}
        onDelete={() => this.handleDelete(id)}
        onSave={this.createSaveHandler(id)}
        editable={this.state.editable === id}/>
    )
  }

}

function mapStateToProps(state) {
  const bookmarks = state.bookmarks
  return {bookmarks}
}

const mapDispatchToProps = (dispatch) => ({
  deleteBookmark: (id) => dispatch(deleteBookmark(id)),
  createBookmark: (attributes) => dispatch(createBookmark(attributes)),
  updateBookmark: (id, attributes) => dispatch(updateBookmark(id, attributes)),
  fetchBookmarks: () => dispatch(fetchBookmarks())
})

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksList)

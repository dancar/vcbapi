import React from 'react'
import { connect } from 'react-redux'
import { fetchBookmarks, deleteBookmark, createBookmark, updateBookmark} from '../store/actions'
import BookmarksList  from '../components/bookmarks_list'

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

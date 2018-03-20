import React from 'react'
import { connect } from 'react-redux'
import { fetchBookmarks, searchBookmarks} from '../store/actions'
import Search from '../components/search'

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  searchBookmarks: (query) => dispatch(searchBookmarks(query)),
  fetchBookmarks: () => dispatch(fetchBookmarks())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)

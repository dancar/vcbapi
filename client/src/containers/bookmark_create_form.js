import React from 'react'
import { connect } from 'react-redux'
import { createBookmark } from '../store/actions'

import BookmarkForm from '../components/bookmark_form'

export class BookmarkCreateForm extends React.Component {
  handleSubmit (attributes) {
    this.props.dispatch(createBookmark(attributes))
  }
  render () {
    return (
      <BookmarkForm onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

function mapStateToProps(state) {
  return { }
}
export default connect(mapStateToProps)(BookmarkCreateForm)

import * as actionTypes from './actionTypes'

const initialState = {}
export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
  case actionTypes.BOOKMARKS_FETCHED:
    return action.bookmarks.reduce((acc, bookmark) => {
      acc[bookmark.id] = bookmark
      return acc
    }, {})
  }
  return state
}

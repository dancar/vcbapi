import * as actionTypes from './actionTypes'

const initialState = {}
export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
  case actionTypes.BOOKMARKS_FETCHED:
    return action.bookmarks.reduce((acc, bookmark) => {
      const { id, title, url, shortening } = bookmark
      acc[id] = { title, url, shortening }
      return acc
    }, {})
  }
  return state
}

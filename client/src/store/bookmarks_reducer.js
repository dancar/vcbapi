import * as actionTypes from './actionTypes'

const initialState = {}
export default function reduce(state = initialState, action = {}) {
  console.log('<-DANDEBUG-> bookmarks_reducer.js\\ 5: action:', action);
  switch (action.type) {
  case actionTypes.BOOKMARKS_FETCHED:
    console.log('<-DANDEBUG-> bookmarks_reducer.js\\ 8: action:', action);
    return action.bookmarks.reduce((acc, bookmark) => {
      const { id, title, url, shortening } = bookmark
      acc[id] = { title, url, shortening }
      return acc
    }, {})
  }
  console.log('<-DANDEBUG-> bookmarks_reducer.js\\ 15: state:', state);
  return state
}

import * as actionTypes from './actionTypes'

const initialState = {}
export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
  case actionTypes.BOOKMARKS_FETCHED:
    return action.sites.reduce((acc, site) => {
      acc[site.id] = site
      return acc
    }, {})
  }
  return state
}

import ApiService from '../services/api_service'
import * as types from './actionTypes'

export function fetchBookmarks () {
  return async function (dispatch, getState) {
    try {
      const bookmarks = await ApiService.fetchBookmarks()
      dispatch({ type: types.BOOKMARKS_FETCHED, bookmarks })

    } catch (error) {
      console.error(error) // TODO: something else?
    }
  }
}

import ApiService from '../services/api_service'
import * as types from './actionTypes'

export function fetchBookmarks () {
  return async (dispatch, getState) => {
    try {
      const bookmarks = await ApiService.fetchBookmarks()
      dispatch({ type: types.BOOKMARKS_FETCHED, bookmarks })

    } catch (error) {
      console.error(error) // TODO: something else?
    }
  }
}

export function createBookmark({title, url, shortening}) {
  return async (dispatch, getState) => {
    try {
      const response = await ApiService.createBookmark({title, url, shortening})
      console.log('<-DANDEBUG-> actions.js\\ 20: response:', response);

    } catch (error) {
      console.error(error) // TODO: something else?
    }

  }
}

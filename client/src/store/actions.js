import ApiService from '../services/api_service'
import * as types from './actionTypes'

export function searchBookmarks (query) {
  return async (dispatch, getState) => {
    try {
      const bookmarks = await ApiService.searchBookmarks(query)
      dispatch({ type: types.BOOKMARKS_FETCHED, bookmarks })

    } catch (error) {
      console.error(error) // TODO: something else?
    }
  }
}


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


export function createBookmark(attributes) {
  return async (dispatch, getState) => {
    try {
      const response = await ApiService.createBookmark(attributes)
      return await dispatch(fetchBookmarks())

    } catch (error) {
      console.error(error) // TODO: something else?
    }
  }
}

export function deleteBookmark(id) {
  return async (dispatch, getState) => {
    try {
      const response = await ApiService.deleteBookmark(id)
      return await dispatch(fetchBookmarks())

    } catch (error) {
      console.error(error) // TODO: something else?
    }
  }
}

export function updateBookmark(id, attributes) {
  return async (dispatch, getState) => {
    try {
      const response = await ApiService.updateBookmark(id, attributes)
      return await dispatch(fetchBookmarks())

    } catch (error) {
      console.error(error) // TODO: something else?
    }
  }
}

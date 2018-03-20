class ApiService {
  async fetchBookmarks () {
    const response = await this._fetch('/bookmarks')
    return await response.json()
  }

  async createBookmark ({title, url, shortening}) {
    const response = await this._fetch('/bookmarks', {bookmark: {title, url, shortening}}, "POST")
    return response.json()
  }

  async deleteBookmark (id) {
    return await this._fetch(`/bookmarks/${id}`, null, "DELETE")
  }

  async _fetch (path, payload = null, method = "GET") {
    const body = payload ? JSON.stringify(payload) : undefined
    // TODO: handle errors here?
    return await fetch(path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}

export default new ApiService()

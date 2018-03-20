class ApiService {
  async fetchBookmarks () {
    const response = await this._fetch('/bookmarks')
    return await response.json()
  }

  async searchBookmarks (query) {
    const response = await this._fetch('/bookmarks/search?q=' + encodeURI(query))
    return await response.json()
  }

  async createBookmark (attributes) {
    const response = await this._fetch('/bookmarks', {bookmark: attributes}, "POST")
    return response.json()
  }

  async updateBookmark (id, attributes) {
    return await this._fetch(`/bookmarks/${id}`, attributes, "PUT")
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

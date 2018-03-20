class ApiService {
  async fetchBookmarks () {
    return await this._fetch('/bookmarks')
  }

  async createBookmark ({title, url, shortening}) {
    return await this._fetch('/bookmarks', {bookmark: {title, url, shortening}}, "POST")
  }

  async _fetch (path, payload = null, method = "GET") {
    const body = payload ? JSON.stringify(payload) : undefined
    const response = await fetch(path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    const response_body = await response.json()
    return response_body
  }
}

export default new ApiService()

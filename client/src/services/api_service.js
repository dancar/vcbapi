class ApiService {

  async fetchBookmarks () {
    const response = await this._fetch('/bookmarks')
    const sites = await response.json()
    return this._prepareSites(sites)
  }

  async searchBookmarks (query) {
    const response = await this._fetch('/bookmarks/search?q=' + encodeURI(query))
    const bookmarks =  await response.json()
    // Convert from bookmarks-based list to site-based:
    const sites = {}
    bookmarks.forEach( (bookmark) => {
      if (sites[bookmark.site.id] === undefined) {
        sites[bookmark.site.id] = bookmark.site
      }
      const site = sites[bookmark.site.id]
      if (site.bookmark === undefined) {
        site.bookmark = []
      }
      site.bookmark.push(bookmark)
    })
    return Object.keys(sites).map(k => sites[k])
  }

  async createBookmark (attributes) {
    const response = await this._fetch('/bookmarks', {bookmark: attributes}, "POST")
    return response.json()
  }

  async updateBookmark (id, attributes) {
    return await this._fetch(`/bookmarks/${id}`, {bookmark: attributes}, "PUT")
  }

  async deleteBookmark (id) {
    return await this._fetch(`/bookmarks/${id}`, null, "DELETE")
  }

  async _fetch (path, payload = null, method = "GET") {
    const body = payload ? JSON.stringify(payload) : undefined
    // TODO: handle errors here?
    const response =  await fetch(path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.status  === 409 ) {
      window.alert("URL Already exists")
      return this.fetchBookmarks()
    }
    else {
      return response
    }
  }

  _prepareSites (sites) {
    sites.forEach((site) => {
      site.bookmark.forEach( (bookmark) => {
        bookmark.tags = bookmark.tag.map( tag => tag.name )
      })
    })
    return sites
  }
}

export default new ApiService()

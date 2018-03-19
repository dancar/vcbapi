const TEMP = [
  {
    id: 0 ,
    title: "hello",
    url: "http://hello.com",
    shortening: "bit.ly/h"
  },

  {
    id: 1,
    title: "world",
    url: "http://world.com",
    shortening: "bit.ly/w"
  },

  {
    id: 2,
    title: "earth",
    url: "http://earth.com",
    shortening: null
  }
]

class ApiService {
  async fetchBookmarks () {
    return TEMP //TODO something else probably
  }
}

export default new ApiService()

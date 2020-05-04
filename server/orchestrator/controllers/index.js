const axios = require('axios')
const moviesAxios = axios.create({ baseURL: 'http://localhost:3001' })
const tvSeriesAxios = axios.create({ baseURL: 'http://localhost:3002' })
const Redis = require('ioredis')
const redis = new Redis()

class MainController {
  static async entertainme(req, res, next) {
    try {
      const data = await redis.get('entertainme')
      console.log(data);
      if (data) {
        res.status(200).json(JSON.parse(data))
      } else {
        const getMovies = await moviesAxios.get('/movies')
        const movies = await getMovies.data
        const getTvSeries = await tvSeriesAxios.get('/tvSeries')
        const tvSeries = await getTvSeries.data
        await redis.set('entertainme', JSON.stringify([{ movies, tvSeries }]))
        res.status(200).json([{ movies, tvSeries }])
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

}

module.exports = MainController
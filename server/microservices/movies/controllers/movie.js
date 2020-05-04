const Movie = require("../models/movie")

class MovieController {
  static find(req, res, next) {
    Movie.find()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }
  static findById(req, res, next) {
    Movie.findById(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }
  static create(req, res, next) {
    Movie.create(req.body)
      .then(result => {
        res.status(200).json(result.ops[0])
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }
  static update(req, res, next) {
    Movie.findByIdAndUpdate(req.params.id, req.body)
      .then(result => {
        res.status(200).json(result)
      })
  }
  static remove(req, res, next) {
    Movie.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Internal Server Error"
        })
      })
  }
}

module.exports = MovieController
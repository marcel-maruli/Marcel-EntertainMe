const tvSeries = require("../models/tvSeries")

class TvSeriesController {
  static find(req, res, next) {
    tvSeries.find()
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
    tvSeries.findById(req.params.id)
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
    tvSeries.create(req.body)
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
    tvSeries.findByIdAndUpdate(req.params.id, req.body)
      .then(result => {
        res.status(200).json(result)
      })
  }
  static remove(req, res, next) {
    tvSeries.findByIdAndDelete(req.params.id)
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

module.exports = TvSeriesController
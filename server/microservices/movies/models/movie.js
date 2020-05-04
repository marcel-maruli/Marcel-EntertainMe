const { getDatabase } = require('../config/config')
const Movie = getDatabase().collection('movies')
const { ObjectId } = require('mongodb')

class MovieModel {
  static find() {
    return Movie.find().toArray()
  }
  static findById(id) {
    return Movie.findOne({ _id: ObjectId(id) })
  }
  static create(newMovie) {
    return Movie.insertOne(newMovie)
  }
  static findByIdAndUpdate(id, updatedData) {
    return Movie.updateOne({ _id: ObjectId(id) }, {
      $set: updatedData
    })
  }
  static findByIdAndDelete(id) {
    return Movie.deleteOne({ _id: ObjectId(id) })

  }
}


module.exports = MovieModel
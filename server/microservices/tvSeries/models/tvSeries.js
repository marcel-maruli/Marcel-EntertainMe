const { getDatabase } = require('../config/config')
const tvSeries = getDatabase().collection('tvSeries')
const { ObjectId } = require('mongodb')

class TvSeriesModel {
  static find() {
    return tvSeries.find().toArray()
  }
  static findById(id) {
    return tvSeries.findOne({ _id: ObjectId(id) })
  }
  static create(newtvSeries) {
    return tvSeries.insertOne(newtvSeries)
  }
  static findByIdAndUpdate(id, updatedData) {
    return tvSeries.updateOne({ _id: ObjectId(id) }, {
      $set: updatedData
    })
  }
  static findByIdAndDelete(id) {
    return tvSeries.deleteOne({ _id: ObjectId(id) })

  }
}


module.exports = TvSeriesModel
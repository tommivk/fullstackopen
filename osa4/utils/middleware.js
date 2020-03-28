const errorHandler = (error, request, response, next) => {
    console.log(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' })
    }
      else if(error.name==='MongoError' && error.code === 11000){
        return response.status(400).send({ error: 'username aleady exists' })
      }
    next(error)
  }

  module.exports = {errorHandler}
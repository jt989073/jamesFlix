import express from 'express'
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMoviees, getMoviesByCategory } from '../controllers/movie.controller.js'

const router = express.Router()

router.get('/trending', getTrendingMovie)
router.get('/:category', getMoviesByCategory)
router.get('/:id/trailers', getMovieTrailers)
router.get('/:id/details', getMovieDetails)
router.get('/:id/similar', getSimilarMoviees)

export default router

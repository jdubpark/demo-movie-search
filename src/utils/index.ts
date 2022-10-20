import axios from 'axios'

import { MovieData } from '../types/common'

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// TODO: Fill your api key here
const API_KEY = ''

export async function getMovies(page: number): Promise<MovieData[]> {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
  return axios.get<{ page: number, results: MovieData[] }>(url)
    .then((res) => res.data.results)
}

export function filterMoviesWithGenreId(movies: MovieData[], genreId: number): MovieData[] {
  return movies.filter((movie) => movie.genre_ids.includes(genreId))
}

export function filterMoviesByTitle(movies: MovieData[], title: string): MovieData[] {
  return movies.filter((movie) => movie.title.includes(title))
}

export function sortMoviesByKeyAndValue(movies: MovieData[], key: string, asc = true): MovieData[] {
  const sortFn = (a: MovieData, b: MovieData) => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (a[key] < b[key]) ? (asc ? 1 : -1) : (a[key] > b[key]) ? (asc ? -1 : 1) : 0
  )
  return movies.sort(sortFn)
}

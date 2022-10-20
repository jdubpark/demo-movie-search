import React, { useCallback, useEffect, useState } from 'react'

import Container from '../../components/Container'
import {
  filterMoviesByTitle, filterMoviesWithGenreId, getMovies, sortMoviesByKeyAndValue,
} from '../../utils'
import { MovieProps, MovieBoxShadowProps, MovieData } from '../../types/common'

const genreIds: { [key: string]: number } = {
  all: 0,
  adventure: 12,
  fantasy: 14,
  // animation: 16,
  // drama: 18,
  horror: 27,
  action: 28,
  comedy: 35,
  // history: 36,
  // western: 37,
  thriller: 53,
  crime: 80,
  // documentary: 99,
  scifi: 878,
  mystery: 9648,
  music: 10402,
  romance: 10749,
  // family: 10751,
  war: 10752,
}

function Gallery(props: MovieProps) {
  const [movies, setMovies] = useState<MovieData[]>([])
  const [genreId, setGenreId] = useState<number>(0) // 0 is unset

  useEffect(() => {
    if (!props.movies.length) return
    if (!genreId) setMovies(props.movies)
    else setMovies(filterMoviesWithGenreId(props.movies, genreId))
  }, [props.movies, genreId])

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
        {
          Object.keys(genreIds).map((genreName) => (
            <button
              key={genreIds[genreName]}
              type="button"
              className="btn btn-sm lowercase"
              onClick={() => setGenreId(genreIds[genreName])}
            >
              {genreName}
            </button>
          ))
        }
      </div>
      <div className="grid grid-cols-6 gap-4">
        {
          movies.map((movie, idx) => (
            <div key={`${idx}_${movie.id}`}>
              <button
                type="button"
                onClick={() => props.setCurrentMovieId(movie.id)}
                className="hover:shadow"
              >
                <img
                  src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                  alt={movie.title}
                />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

function MovieBoxShow({
  movie, movieIndex, movies, setCurrentMovieId,
}: MovieBoxShadowProps) {
  return (
    <div className="w-full max-w-2xl py-6 px-8 bg-gray-300 box-shadow">
      <div className="flex">
        <div className="w-1/2">
          {
            movieIndex > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentMovieId(movies[movieIndex - 1].id)}
                className="hover:shadow"
              >
                Prev Movie
              </button>
            ) : (<></>)
          }
        </div>
        <div className="w-1/2 text-right">
          {
            movieIndex < movies.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentMovieId(movies[movieIndex + 1].id)}
                className="hover:shadow"
              >
                Next Movie
              </button>
            ) : (<></>)
          }
        </div>
      </div>
      <section>
        <h2 className="text-xl text-center font-semibold">{movie.title}</h2>
        <div className="flex space-x-8 pt-4">
          <img
            src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
            alt={movie.title}
            className="w-[200px]"
          />
          <section>
            <h3 className="text-stone-500">{`Released: ${movie.release_date}`}</h3>
            <h3 className="text-stone-500">{`Popularity: ${movie.popularity}`}</h3>
            <h3 className="text-stone-500">{`Vote: ${movie.vote_average}/10 (${movie.vote_count} votes)`}</h3>
            <p className="pt-4">{movie.overview}</p>
          </section>
        </div>
      </section>
    </div>
  )
}

function MovieSearchView({ movies, setCurrentMovieId }: MovieProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('')
  const [isAsc, setIsAsc] = useState<string>('')
  const [selectedMovies, setSelectedMovies] = useState<MovieData[]>([])

  useEffect(() => {
    if (!movies.length) return
    const search = inputValue.trim()
    if (search !== '') {
      if (selectValue === '') setSelectedMovies(filterMoviesByTitle(movies, search))
      else setSelectedMovies(sortMoviesByKeyAndValue(filterMoviesByTitle(movies, search), selectValue, isAsc === 'asc'))
    } else setSelectedMovies(movies)
  }, [movies, inputValue, selectValue, isAsc])

  useEffect(() => {
    if (!movies.length) return
    if (selectValue === '') setSelectedMovies(movies)
    else setSelectedMovies(sortMoviesByKeyAndValue(movies, selectValue, isAsc === 'asc'))
  }, [movies, selectValue, isAsc])

  return (
    <div className="w-full max-w-xl">
      <section className="py-6 px-10 bg-gray-100 border border-[#eee] shadow-xl rounded">
        <h2 className="text-xl font-semibold">Search movie:</h2>
        <div className="pt-6">
          <input
            type="text"
            placeholder="Type here"
            className="input w-[300px] text-black"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="pt-4">
          <div>Sort by</div>
          <select
            className="select"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="" disabled defaultChecked>SELECT</option>
            <option value="popularity">Popularity</option>
            <option value="vote_average">Votes</option>
          </select>
        </div>
        <div className="pt-2 max-w-[150px]">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Ascending</span>
              <input type="radio" name="radio-6" className="radio checked:bg-red-500" checked={isAsc === 'asc'} onChange={() => setIsAsc('asc')} />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Descending</span>
              <input type="radio" name="radio-6" className="radio checked:bg-blue-500" checked={isAsc === 'desc'} onChange={() => setIsAsc('desc')} />
            </label>
          </div>
        </div>
      </section>
      <section className="flex flex-col space-y-4 pt-6">
        {
          selectedMovies.map((movie, idx) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              key={`${idx}_${movie.id}`}
              onClick={() => setCurrentMovieId(movie.id)}
              className="flex space-x-6 cursor-pointer hover:bg-[#eee] transition"
            >
              <img
                src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                alt={movie.title}
                className="w-[120px]"
              />
              <div className="py-2">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <h3 className="text-stone-500">{`Released: ${movie.release_date}`}</h3>
                <h3 className="text-stone-500">{`Popularity: ${movie.popularity}`}</h3>
                <h3 className="text-stone-500">{`Vote: ${movie.vote_average}/10 (${movie.vote_count} votes)`}</h3>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default function HomePage() {
  const [movies, setMovies] = useState<MovieData[]>([])

  const [currentMovieId, setCurrentMovieId] = useState<number>(0)
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0)
  const [currentMovie, setCurrentMovie] = useState<MovieData | null>(null)

  const [isSearchView, setIsSearchView] = useState<boolean>(true)

  const onMenuClick = useCallback((turnOnSearchView: boolean) => {
    setCurrentMovie(null)
    setIsSearchView(turnOnSearchView)
  }, [setCurrentMovie, setIsSearchView])

  useEffect(() => {
    if (movies.length) return
    const proms: Promise<MovieData[]>[] = []
    for (let i = 0; i < 5; i++) {
      proms.push(getMovies(i + 1))
    }
    // proms.push(getMovies(1))
    Promise.all(proms).then((movieData) => setMovies(movieData.flat()))
  }, []) // no deps

  useEffect(() => {
    if (currentMovieId) {
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === currentMovieId) {
          setCurrentMovie(movies[i])
          setCurrentMovieIndex(i)
          return
        }
      }
    }
    setCurrentMovie(null)
  }, [currentMovieId, movies])

  return (
    <Container>
      <section className="flex justify-center space-x-8 pb-6">
        <button
          type="button"
          className="text-blue-900 text-lg font-semibold"
          onClick={() => onMenuClick(true)}
        >
          Search
        </button>
        <button
          type="button"
          className="text-blue-900 text-lg font-semibold"
          onClick={() => onMenuClick(false)}
        >
          Gallery
        </button>
      </section>
      <section className="flex justify-center">
        {
          currentMovie ? (
            <MovieBoxShow
              movie={currentMovie}
              movieIndex={currentMovieIndex}
              movies={movies}
              setCurrentMovieId={setCurrentMovieId}
            />
          ) : isSearchView ? (
            <MovieSearchView
              movies={movies}
              setCurrentMovieId={setCurrentMovieId}
            />
          ) : (
            <Gallery
              movies={movies}
              setCurrentMovieId={setCurrentMovieId}
            />
          )
        }
      </section>
    </Container>
  )
}

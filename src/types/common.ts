import React from 'react'

export type ReactChildren = React.ReactNode | React.ReactNode[]

export interface ReactPropChildren {
  children: ReactChildren
}

export type SvgElement = HTMLElement & SVGElement

export interface MovieData {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean,
  vote_average: number
  vote_count: number
}

export interface MovieProps {
  movies: MovieData[]
  setCurrentMovieId: React.Dispatch<React.SetStateAction<number>>
}

export interface MovieBoxShadowProps extends MovieProps {
  movie: MovieData
  movieIndex: number
}

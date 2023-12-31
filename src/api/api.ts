export interface Movie {
  title: string
  year: string
  imdbID: string
  type: string
  poster: string
}

export const fetchMovie = async (title: string): Promise<Movie[]> => {
  console.log('hello')
  const res = await fetch(`/api/list?searchKeyword=${title}`)

  if (res.status === 400) {
    return []
  }

  return res.json()
}

export const fetchDetail = async (id: string) => {
  const res = await fetch(`/api/detail?movieId=${id}`)
  if (res.status === 400) {
    return []
  }
  return res.json()
}

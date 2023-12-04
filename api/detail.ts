import type { VercelRequest, VercelResponse } from '@vercel/node'

export const fetchDetail = async (id: string) => {
  const res = await fetch(
    `https://omdbapi.com?apikey=8488a957&i=${id}&plot=full`
  )

  const result = await res.json()

  return result.Plot
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (!request.query.movieId) {
    throw new Error('bad request 400')
  }
  if (request.query.movieId instanceof Array) {
    throw new Error('bad request 400')
  }
  const { movieId } = request.query
  try {
    const imdbApiResponse = await fetchDetail(movieId)
    response.status(200).json(imdbApiResponse)
  } catch {
    response.status(400).send('')
  }
}

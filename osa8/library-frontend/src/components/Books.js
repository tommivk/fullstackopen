import React, { useEffect, useState } from 'react'
import { FAVOURITE_GENRE, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])

  const favourite = useQuery(FAVOURITE_GENRE)

  useEffect(() => {
    if (favourite.data && props.recommend) {
      console.log(favourite.data.me.favoriteGenre)
      setFilter(favourite.data.me.favoriteGenre)
    }
    if (!props.recommend) {
      setFilter('')
    }
  }, [favourite, props.recommend])

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
    pollInterval: 2000,
  })

  if (!props.show && !props.recommend) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  let books = result.data.allBooks
  console.log(books)
  books.map((x) =>
    x.genres.map((g) => {
      if (!genres.includes(g)) {
        setGenres(genres.concat(g))
      }
      return null
    })
  )

  if (props.recommend) {
    return (
      <div>
        <h2>recommendations</h2>
        <p>
          Books in your favorite genre <strong>{filter}</strong>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h2>books</h2>

      {filter && (
        <p>
          books in <strong>{filter}</strong> genre
        </p>
      )}
      {!filter && <p>all books</p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button
            key={g}
            value={g}
            onClick={({ target }) => setFilter(target.value)}
          >
            {g}
          </button>
        ))}
        <button onClick={() => setFilter('')}>Show all</button>
      </div>
    </div>
  )
}

export default Books

import { useEffect, useState } from 'react'
import { fetchList, fetchUrl } from '../apiConfig'

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchList('leaderboard').then(({ items, pagination }) => {
      if (!mounted) return
      setItems(items)
      setPagination(pagination)
    }).catch(e => setError(e.message)).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const fetchPage = async (url) => {
    setLoading(true)
    try {
      const { items, pagination } = await fetchUrl(url)
      setItems(items)
      setPagination(pagination)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading && <div className="text-muted">Loading…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          <ol className="list-group list-group-numbered">
            {items.map((it, i) => (
              <li key={i} className="list-group-item">
                <strong>{it.username || it.name || `#${i+1}`}</strong>
                <div className="small text-muted">{it.score ? `Score: ${it.score}` : JSON.stringify(it)}</div>
              </li>
            ))}
          </ol>

          {pagination && (
            <div className="mt-3 d-flex gap-2">
              {pagination.previous && <button className="btn btn-sm btn-outline-primary" onClick={() => fetchPage(pagination.previous)}>Previous</button>}
              {pagination.next && <button className="btn btn-sm btn-primary" onClick={() => fetchPage(pagination.next)}>Next</button>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

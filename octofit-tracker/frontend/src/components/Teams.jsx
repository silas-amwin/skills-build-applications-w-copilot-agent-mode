import { useEffect, useState } from 'react'
import { fetchList, fetchUrl } from '../apiConfig'

const ENDPOINT = '/api/teams'

export default function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
    const { items, pagination } = await fetchList(ENDPOINT)
      setItems(items)
      setPagination(pagination)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

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
      <h2>Teams</h2>
      {loading && <div className="text-muted">Loading…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div>
          <ul className="list-group">
            {items.map((t, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-bold">{t.name || `Team ${i+1}`}</div>
                  <div className="small text-muted">{t.description}</div>
                </div>
                <span className="badge bg-primary rounded-pill">{t.member_count ?? t.members?.length ?? '-'}</span>
              </li>
            ))}
          </ul>

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

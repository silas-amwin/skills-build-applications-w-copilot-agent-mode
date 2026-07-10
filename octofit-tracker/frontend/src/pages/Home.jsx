import { API_BASE_URL } from '../apiConfig'

export default function Home() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness experience with activity tracking,
                team challenges, and leaderboards.
              </p>
              <div className="d-flex gap-3">
                <a className="btn btn-primary" href={`${API_BASE_URL}/health`} target="_blank" rel="noreferrer">
                  Check API Health
                </a>
                <a className="btn btn-outline-secondary" href="https://vite.dev/" target="_blank" rel="noreferrer">
                  Vite Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

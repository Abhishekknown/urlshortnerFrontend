function AnalyticsModal({ analytics, onClose }) {
  return (
    <dialog id="analytics_modal" className="modal">
      <div className="modal-box max-w-5xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Analytics</h3>
          <button className="btn btn-sm" onClick={onClose}>
            Close
          </button>
        </div>

        {!analytics ? (
          <div className="py-10 text-center text-base-content/70">
            No analytics found
          </div>
        ) : (
          <div className="space-y-5 mt-5">
            <div className="stats shadow bg-base-100 border border-base-300 w-full">
              <div className="stat">
                <div className="stat-title">Short ID</div>
                <div className="stat-value text-primary text-2xl">
                  {analytics.shortId}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Total Clicks</div>
                <div className="stat-value text-secondary text-2xl">
                  {analytics.totalClicks}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Expiry</div>
                <div className="stat-desc text-base">
                  {analytics.expiresAt
                    ? new Date(analytics.expiresAt).toLocaleString()
                    : "No expiry"}
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body p-4">
                <p className="font-semibold">Original URL</p>
                <a
                  href={analytics.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary break-all"
                >
                  {analytics.originalUrl}
                </a>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300">
              <div className="card-body">
                <h4 className="card-title">Click History</h4>

                {analytics.clickHistory?.length === 0 ? (
                  <div className="alert">
                    <span>No clicks yet</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Clicked At</th>
                          <th>IP</th>
                          <th>Country</th>
                          <th>City</th>
                          <th>Referrer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.clickHistory?.map((click, index) => (
                          <tr key={index}>
                            <td>{new Date(click.clickedAt).toLocaleString()}</td>
                            <td>{click.ip || "-"}</td>
                            <td>{click.country || "unknown"}</td>
                            <td>{click.city || "unknown"}</td>
                            <td>{click.referrer || "direct"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default AnalyticsModal;
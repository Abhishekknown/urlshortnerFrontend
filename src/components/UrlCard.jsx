const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UrlCard({ item, onViewAnalytics }) {
  const shortLink = `${API_BASE_URL}/${item.shortId}`;
  const expired =
    item.expiresAt && new Date(item.expiresAt).getTime() < Date.now();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="card-title text-primary">{item.shortId}</h3>
            <div className={`badge ${expired ? "badge-error" : "badge-success"}`}>
              {expired ? "Expired" : "Active"}
            </div>
          </div>

          <div className="badge badge-outline">
            Clicks: {item.clicks || 0}
          </div>
        </div>

        <div className="divider my-1"></div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-base-content/70">Short URL</p>
            <a
              href={shortLink}
              target="_blank"
              rel="noreferrer"
              className="link link-primary break-all"
            >
              {shortLink}
            </a>
          </div>

          <div>
            <p className="text-sm font-medium text-base-content/70">Original URL</p>
            <a
              href={item.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="link break-all"
            >
              {item.originalUrl}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="card bg-base-200">
            <div className="card-body p-4">
              <p className="text-sm font-semibold">Created</p>
              <p className="text-sm text-base-content/70">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body p-4">
              <p className="text-sm font-semibold">Expiry</p>
              <p className="text-sm text-base-content/70">
                {item.expiresAt
                  ? new Date(item.expiresAt).toLocaleString()
                  : "No expiry"}
              </p>
            </div>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-sm" onClick={handleCopy}>
            Copy
          </button>

          <a
            href={shortLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
          >
            Open Link
          </a>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => onViewAnalytics(item.shortId)}
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default UrlCard;
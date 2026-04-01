import UrlCard from "./UrlCard";

function UrlList({ urls, onViewAnalytics }) {
  if (!urls || urls.length === 0) {
    return (
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body items-center text-center">
          <h3 className="card-title">No links yet</h3>
          <p className="text-base-content/70">
            Create one and it’ll show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {urls.map((item) => (
        <UrlCard
          key={item._id}
          item={item}
          onViewAnalytics={onViewAnalytics}
        />
      ))}
    </div>
  );
}

export default UrlList;
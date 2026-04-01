import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import UrlList from "../components/UrlList";
import AnalyticsModal from "../components/AnalyticsModal";
import CreateUrlModal from "../components/CreateUrlModal";
import Pagination from "../components/Pagination";
import { getAllUrls, getUrlAnalytics } from "../services/urlService";

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const linksPerPage = 5;

  const fetchUrls = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllUrls();
      setUrls(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleOpenCreateModal = () => {
    document.getElementById("create_url_modal")?.showModal();
  };

  const handleViewAnalytics = async (shortId) => {
    try {
      setAnalyticsLoading(true);
      setError("");

      const response = await getUrlAnalytics(shortId);
      setAnalyticsData(response);

      document.getElementById("analytics_modal")?.showModal();
    } catch (err) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const closeAnalytics = () => {
    setAnalyticsData(null);
    document.getElementById("analytics_modal")?.close();
  };

  const stats = useMemo(() => {
    const totalLinks = urls.length;
    const totalClicks = urls.reduce((sum, item) => sum + (item.clicks || 0), 0);
    const expiredLinks = urls.filter(
      (item) => item.expiresAt && new Date(item.expiresAt) < new Date()
    ).length;

    return { totalLinks, totalClicks, expiredLinks };
  }, [urls]);

  const totalPages = Math.ceil(urls.length / linksPerPage);
  const startIndex = (currentPage - 1) * linksPerPage;
  const endIndex = startIndex + linksPerPage;
  const currentLinks = urls.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <NavBar onOpenCreateModal={handleOpenCreateModal} />

      <main className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8 space-y-6">
        <section className="hero bg-base-100 rounded-box shadow-sm border border-base-300">
          <div className="hero-content py-10 text-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold">
                Manage links in one place
              </h1>
              <p className="py-2 text-base-content/70">
                Create, track and analyze short URLs.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Total Links</div>
              <div className="stat-value text-primary">{stats.totalLinks}</div>
              <div className="stat-desc">All shortened URLs</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Total Clicks</div>
              <div className="stat-value text-secondary">{stats.totalClicks}</div>
              <div className="stat-desc">Across all links</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title">Expired Links</div>
              <div className="stat-value text-error">{stats.expiredLinks}</div>
              <div className="stat-desc">No longer redirecting</div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Links</h2>
            <button className="btn btn-outline btn-sm" onClick={fetchUrls}>
              Refresh
            </button>
          </div>

          {error && (
            <div className="alert alert-error shadow-sm">
              <span>{error}</span>
            </div>
          )}

          {analyticsLoading && (
            <div className="alert shadow-sm">
              <span>Loading analytics...</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <>
              <UrlList urls={currentLinks} onViewAnalytics={handleViewAnalytics} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </main>

      <CreateUrlModal
        onCreated={async () => {
          await fetchUrls();
          setCurrentPage(1);
        }}
      />

      <AnalyticsModal analytics={analyticsData} onClose={closeAnalytics} />
    </div>
  );
}

export default Dashboard;
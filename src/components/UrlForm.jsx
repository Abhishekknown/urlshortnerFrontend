import { useState } from "react";
import { createShortUrl } from "../services/urlService";

const initialForm = {
  originalUrl: "",
  customAlias: "",
  expiryInDays: "",
};

function UrlForm({ onCreated }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      const payload = {
        originalUrl: formData.originalUrl.trim(),
      };

      if (formData.customAlias.trim()) {
        payload.customAlias = formData.customAlias.trim();
      }

      if (formData.expiryInDays !== "") {
        payload.expiryInDays = Number(formData.expiryInDays);
      }

      const response = await createShortUrl(payload);

      setSuccessMessage(`Short URL created successfully: ${response.shortUrl}`);
      setFormData(initialForm);

      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title text-2xl">Create Short URL</h2>
        <p className="text-sm text-base-content/70">
          Add a long URL, optional custom alias, and optional expiry.
        </p>

        {successMessage && (
          <div className="alert alert-success mt-3">
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-error mt-3">
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Original URL</span>
            </label>
            <input
              type="url"
              name="originalUrl"
              placeholder="https://example.com"
              className="input input-bordered w-full"
              value={formData.originalUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Custom Alias</span>
            </label>
            <input
              type="text"
              name="customAlias"
              placeholder="my-custom-link"
              className="input input-bordered w-full"
              value={formData.customAlias}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Expiry in Days</span>
            </label>
            <input
              type="number"
              name="expiryInDays"
              placeholder="3"
              min="1"
              className="input input-bordered w-full"
              value={formData.expiryInDays}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Short URL"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UrlForm;
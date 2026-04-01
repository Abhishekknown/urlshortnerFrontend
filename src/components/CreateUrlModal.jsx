import { useState } from "react";
import { createShortUrl } from "../services/urlService";

const initialForm = {
  originalUrl: "",
  customAlias: "",
  expiryInDays: "",
};

function CreateUrlModal({ onCreated }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    document.getElementById("create_url_modal")?.close();
  };

  const resetState = () => {
    setFormData(initialForm);
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(false);
  };

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

      setSuccessMessage(`Created: ${response.shortUrl}`);
      setFormData(initialForm);

      if (onCreated) {
        await onCreated();
      }

      setTimeout(() => {
        resetState();
        closeModal();
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="create_url_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Short URL</h3>

        {successMessage && (
          <div className="alert alert-success mt-4">
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-error mt-4">
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Original URL</span>
            </label>
            <input
              type="url"
              name="originalUrl"
              value={formData.originalUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Custom Alias</span>
            </label>
            <input
              type="text"
              name="customAlias"
              value={formData.customAlias}
              onChange={handleChange}
              placeholder="my-link"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Expiry in Days</span>
            </label>
            <input
              type="number"
              name="expiryInDays"
              value={formData.expiryInDays}
              onChange={handleChange}
              placeholder="3"
              min="1"
              className="input input-bordered"
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => {
                resetState();
                closeModal();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default CreateUrlModal;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDelegate } from "../services/delegateService";

function AddDelegate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    country: "",
    profileImage: "",
    bio: "",
    summit: "",
    summitYear: "",
    summitGroup: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createDelegate({
        ...formData,
        summitYear: Number(formData.summitYear),
      });

      navigate("/admin/delegates");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create delegate. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/admin/delegates")}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            ← Back to Delegates
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Add Delegate
          </h1>

          <p className="mt-2 text-gray-600">
            Add a new delegate to the MBS Delegate Directory.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >

          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Delegate Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Austin Isaac Onwuka"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>

                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Managing Director"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Nigeria"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>

                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

            </div>

            {/* Biography */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter delegate biography..."
              />
            </div>
          </section>

          {/* Summit Information */}
          <section className="mt-10 pt-8 border-t">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Summit Participation
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {/* Summit */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summit *
                </label>

                <input
                  type="text"
                  name="summit"
                  value={formData.summit}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Singapore Leadership Summit"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summit Year *
                </label>

                <input
                  type="number"
                  name="summitYear"
                  value={formData.summitYear}
                  onChange={handleChange}
                  required
                  min="2000"
                  max="2100"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2026"
                />
              </div>

              {/* Group */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summit Group
                </label>

                <input
                  type="text"
                  name="summitGroup"
                  value={formData.summitGroup}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Group A"
                />
              </div>

            </div>
          </section>

          {/* Future Recognition Section */}
          <section className="mt-10 pt-8 border-t">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Recognition
            </h2>

            <p className="text-gray-500">
              Certificates and awards will be added after the delegate
              has been created.
            </p>
          </section>

          {/* Buttons */}
          <div className="mt-10 pt-8 border-t flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/admin/delegates")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create Delegate"}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}

export default AddDelegate;
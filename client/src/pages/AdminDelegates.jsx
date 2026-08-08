import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDelegates,
  deleteDelegate,
} from "../services/delegateService";

function AdminDelegates() {
  const [delegates, setDelegates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this delegate?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteDelegate(id);

    setDelegates((current) =>
      current.filter((delegate) => delegate._id !== id)
    );
  } catch (error) {
    console.error(error);

    setError(
      error.response?.data?.message ||
        "Failed to delete delegate."
    );
  }
};

  useEffect(() => {
    const fetchDelegates = async () => {
      try {
        const data = await getDelegates();
        setDelegates(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load delegates.");
      } finally {
        setLoading(false);
      }
    };

    fetchDelegates();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Delegate Administration
            </h1>

            <p className="mt-2 text-gray-600">
              Manage MasterMinds Business School delegates.
            </p>
          </div>

            <button
                onClick={() => navigate("/admin/delegates/new")}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
            + Add Delegate
            </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-600">
              Loading delegates...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">
            {error}
          </div>
        )}

        {/* Delegate List */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow overflow-hidden">

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b font-semibold text-gray-600">
              <div className="col-span-4">
                Delegate
              </div>

              <div className="col-span-2">
                Country
              </div>

              <div className="col-span-3">
                Summit
              </div>

              <div className="col-span-1">
                Year
              </div>

              <div className="col-span-2">
                Actions
              </div>
            </div>

            {/* Delegates */}
            {delegates.map((delegate) => (
              <div
                key={delegate._id}
                className="grid grid-cols-12 gap-4 items-center px-6 py-5 border-b last:border-b-0 hover:bg-gray-50 transition"
              >

                {/* Delegate */}
                <div className="col-span-4 flex items-center gap-4">

                  <img
                    src={
                      delegate.profileImage ||
                      "/images/default-profile.png"
                    }
                    alt={delegate.fullName}
                    className="w-12 h-12 rounded-full object-cover border"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      {delegate.fullName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {delegate.designation}
                    </p>
                  </div>

                </div>

                {/* Country */}
                <div className="col-span-2 text-gray-700">
                  {delegate.country || "—"}
                </div>

                {/* Summit */}
                <div className="col-span-3 text-gray-700">
                  {delegate.summit}
                </div>

                {/* Year */}
                <div className="col-span-1 text-gray-700">
                  {delegate.summitYear}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex gap-2">

                <button
                        onClick={() => navigate(`/admin/delegates/${delegate._id}/edit`)}
                        className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                        Edit
                </button>

                <button
                    onClick={() => handleDelete(delegate._id)}
                    className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                >
                    Delete
                </button>

                </div>

              </div>
            ))}

            {/* Empty State */}
            {delegates.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No delegates found.
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}

export default AdminDelegates;
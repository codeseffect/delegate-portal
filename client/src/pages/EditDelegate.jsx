import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDelegateById,
  updateDelegate,
} from "../services/delegateService";

function EditDelegate() {
  const { id } = useParams();
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
    certificates: [],
    awards: [],
  });

  const [certificateForm, setCertificateForm] = useState({
    type: "EMBA",
    title: "",
    certificateNumber: "",
    issuedDate: "",
    image: "",
  });

  const [awardForm, setAwardForm] = useState({
  title: "",
  certificateNumber: "",
  issuedDate: "",
  image: "",
});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingCertificate, setAddingCertificate] = useState(false);
  const [error, setError] = useState("");

  // Load delegate
  useEffect(() => {
    const fetchDelegate = async () => {
      try {
        const data = await getDelegateById(id);

        setFormData({
          fullName: data.fullName || "",
          designation: data.designation || "",
          country: data.country || "",
          profileImage: data.profileImage || "",
          bio: data.bio || "",
          summit: data.summit || "",
          summitYear: data.summitYear || "",
          summitGroup: data.summitGroup || "",
          certificates: data.certificates || [],
          awards: data.awards || [],
        });
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load delegate."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDelegate();
  }, [id]);

  // Handle delegate information changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Handle certificate form changes
  const handleCertificateChange = (event) => {
    const { name, value } = event.target;

    setCertificateForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAwardChange = (event) => {
  const { name, value } = event.target;

  setAwardForm((current) => ({
    ...current,
    [name]: value,
  }));
};

  // Save delegate information
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      await updateDelegate(id, {
        ...formData,
        summitYear: Number(formData.summitYear),
      });

      navigate("/admin/delegates");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update delegate."
      );
    } finally {
      setSaving(false);
    }
  };

  // Add certificate
  const handleAddCertificate = async (event) => {
    event.preventDefault();

    if (!certificateForm.title.trim()) {
      setError("Please enter a certificate title.");
      return;
    }

    if (!certificateForm.certificateNumber.trim()) {
      setError("Please enter a certificate number.");
      return;
    }

    setError("");
    setAddingCertificate(true);

    try {
      const updatedCertificates = [
        ...formData.certificates,
        {
          title: certificateForm.title.trim(),
          certificateNumber:
            certificateForm.certificateNumber.trim(),
          issuedDate: certificateForm.issuedDate || null,
          image: certificateForm.image.trim(),
        },
      ];

      const updatedDelegate = await updateDelegate(id, {
        ...formData,
        summitYear: Number(formData.summitYear),
        certificates: updatedCertificates,
      });

      setFormData({
        ...formData,
        certificates: updatedDelegate.certificates || updatedCertificates,
      });

      setCertificateForm({
        type: "EMBA",
        title: "",
        certificateNumber: "",
        issuedDate: "",
        image: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to add certificate."
      );
    } finally {
      setAddingCertificate(false);
    }
  };

  // Delete certificate
  const handleDeleteCertificate = async (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this certificate?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedCertificates = formData.certificates.filter(
        (_, certificateIndex) => certificateIndex !== index
      );

      const updatedDelegate = await updateDelegate(id, {
        ...formData,
        summitYear: Number(formData.summitYear),
        certificates: updatedCertificates,
      });

      setFormData({
        ...formData,
        certificates:
          updatedDelegate.certificates || updatedCertificates,
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to remove certificate."
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
          <p className="text-gray-600">
            Loading delegate...
          </p>
        </div>
      </main>
    );
  }

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
            Edit Delegate
          </h1>

          <p className="mt-2 text-gray-600">
            Update delegate information and recognition.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Delegate Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >

          {/* Delegate Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Delegate Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>

                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
          </section>

          {/* Summit */}
          <section className="mt-10 pt-8 border-t">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Summit Participation
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summit Group
                </label>

                <input
                  type="text"
                  name="summitGroup"
                  value={formData.summitGroup}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
            </div>
          </section>

          {/* Save Delegate */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Delegate Changes"}
            </button>
          </div>
        </form>

        {/* Recognition */}
        <section className="mt-8 bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Recognition
          </h2>

          {/* Existing Certificates */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                Certificates
              </h3>

              <span className="text-sm text-gray-500">
                {formData.certificates.length} certificate(s)
              </span>
            </div>

            {formData.certificates.length > 0 ? (
              <div className="space-y-4">

                {formData.certificates.map(
                  (certificate, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {certificate.title}
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          Certificate Number:{" "}
                          {certificate.certificateNumber}
                        </p>

                        {certificate.issuedDate && (
                          <p className="text-sm text-gray-500 mt-1">
                            Issued:{" "}
                            {new Date(
                              certificate.issuedDate
                            ).toLocaleDateString("en-GB")}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteCertificate(index)
                        }
                        className="px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}

              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-5 text-gray-500">
                No certificates added yet.
              </div>
            )}
          </div>

          {/* Add Certificate */}
          <div className="mt-8 pt-8 border-t">

            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Add Certificate
            </h3>

            <form onSubmit={handleAddCertificate}>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Type
                  </label>

                  <select
                    name="type"
                    value={certificateForm.type}
                    onChange={handleCertificateChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                  >
                    <option value="EMBA">
                      EMBA
                    </option>

                    <option value="Honorary Doctorate">
                      Honorary Doctorate
                    </option>

                    <option value="MBS Fellow">
                      MBS Fellow
                    </option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={certificateForm.title}
                    onChange={handleCertificateChange}
                    required
                    placeholder="e.g. Executive MBA"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                {/* Certificate Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Number *
                  </label>

                  <input
                    type="text"
                    name="certificateNumber"
                    value={certificateForm.certificateNumber}
                    onChange={handleCertificateChange}
                    required
                    placeholder="e.g. S000000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    EMBA: S000000 · Honorary Doctorate:
                    HDA00000 · MBS Fellow: MBS/SLS/2026/2225
                  </p>
                </div>

                {/* Issue Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>

                  <input
                    type="date"
                    name="issuedDate"
                    value={certificateForm.issuedDate}
                    onChange={handleCertificateChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

              </div>

              {/* Image */}
              <div className="mt-6">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={certificateForm.image}
                  onChange={handleCertificateChange}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />

                <p className="text-xs text-gray-500 mt-2">
                  We will add proper image uploading later.
                </p>

              </div>

              {/* Add Button */}
              <div className="mt-6 flex justify-end">

                <button
                  type="submit"
                  disabled={addingCertificate}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {addingCertificate
                    ? "Adding..."
                    : "+ Add Certificate"}
                </button>

              </div>

            </form>
          </div>

          {/* Awards */}
          <div className="mt-10 pt-8 border-t">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                Awards
              </h3>

              <span className="text-sm text-gray-500">
                {formData.awards.length} award(s)
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 text-gray-500">
              Awards management will be added next.
            </div>

          </div>

        </section>
      </div>
    </main>
  );
}

export default EditDelegate;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDelegateById } from "../services/delegateService";
import Navbar from "../components/Navbar";

function DelegateProfile() {
  const { id } = useParams();

  const [delegate, setDelegate] = useState(null);
  const [recognitionIndex, setRecognitionIndex] = useState(0);

  useEffect(() => {
    const fetchDelegate = async () => {
      try {
        const data = await getDelegateById(id);
        setDelegate(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDelegate();
  }, [id]);

  if (!delegate) {
    return (
      <>
        <Navbar />

        <main className="max-w-5xl mx-auto p-8">
          <p>Loading delegate...</p>
        </main>
      </>
    );
  }

  const recognitions = [
    ...(delegate.certificates || []).map((item) => ({
      ...item,
      type: "Certificate",
    })),
    ...(delegate.awards || []).map((item) => ({
      ...item,
      type: "Award",
    })),
  ];

  const currentRecognition = recognitions[recognitionIndex];

  const nextRecognition = () => {
    setRecognitionIndex((current) =>
      current === recognitions.length - 1 ? 0 : current + 1
    );
  };

  const previousRecognition = () => {
    setRecognitionIndex((current) =>
      current === 0 ? recognitions.length - 1 : current - 1
    );
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto p-8">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-block mb-6 text-blue-700 hover:text-blue-900 font-medium"
        >
          ← Back to Delegates
        </Link>

        {/* Profile */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="p-8">

            <div className="flex flex-col md:flex-row gap-8">

              {/* Profile Image */}
              <div className="shrink-0">

                <img
                  src={
                    delegate.profileImage ||
                    "/images/default-profile.png"
                  }
                  alt={delegate.fullName}
                  className="w-64 h-64 object-cover rounded-lg"
                />

              </div>

              {/* Delegate Information */}
              <div className="flex-1">

                <h1 className="text-4xl font-bold">
                  {delegate.fullName}
                </h1>

                <p className="text-blue-700 text-xl mt-2">
                  {delegate.designation}
                </p>

                <p className="text-gray-600 mt-3">
                  {delegate.country}
                </p>

                <div className="mt-6">

                  <h2 className="font-bold text-xl">
                    Biography
                  </h2>

                  <p className="mt-2 text-gray-700">
                    {delegate.bio}
                  </p>

                </div>

                <div className="mt-10">

                  <h2 className="text-2xl font-bold mb-4">
                    Summit Information
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-5">

                    <p className="font-semibold">
                      {delegate.summit}
                    </p>

                    <p className="text-gray-600">
                      {delegate.summitYear}
                    </p>

                    <p className="text-gray-600">
                      Group: {delegate.summitGroup}
                    </p>

                  </div>

                </div>



<div className="mt-10">

  <h2 className="text-2xl font-bold mb-4">
    Recognition
  </h2>

  <div className="flex gap-5 overflow-x-auto pb-4">

    {delegate.recognitions?.map((recognition) => (
      <div
        key={recognition._id}
        className="min-w-[300px] bg-gray-50 rounded-xl p-6 border"
      >

        <p className="text-sm text-gray-500">
          {recognition.category}
        </p>

        <h3 className="text-xl font-bold mt-2">
          {recognition.title}
        </h3>

        {recognition.certificateNumber && (
          <div className="mt-5">

            <p className="text-sm text-gray-500">
              Certificate Number
            </p>

            <p className="font-semibold">
              {recognition.certificateNumber}
            </p>

          </div>
        )}

        {recognition.issuedDate && (
          <div className="mt-4">

            <p className="text-sm text-gray-500">
              Issued
            </p>

            <p>
              {new Date(
                recognition.issuedDate
              ).toLocaleDateString()}
            </p>

          </div>
        )}

      </div>
    ))}

  </div>

</div>






              </div>

            </div>

          </div>

        </div>

        {/* Summit Information */}
        <div className="bg-white rounded-xl shadow-lg mt-8 p-8">

          <h2 className="text-2xl font-bold mb-4">
            Summit Participation
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Summit
              </p>

              <p className="font-semibold mt-1">
                {delegate.summit}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Year
              </p>

              <p className="font-semibold mt-1">
                {delegate.summitYear}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Group
              </p>

              <p className="font-semibold mt-1">
                {delegate.summitGroup || "Not specified"}
              </p>
            </div>

          </div>

        </div>

        {/* Recognition Slider */}
        {recognitions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg mt-8 p-6 md:p-10">

            {/* Recognition Heading */}
            <div className="mb-8">

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Recognition
              </h2>

              <p className="text-gray-500 mt-2">
                Certificates and awards earned through MasterMinds Business
                School.
              </p>

            </div>

            {/* Recognition Content */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

              {/* Recognition Image */}
              <div className="w-full lg:w-1/2 flex justify-center">

                <div className="w-full max-w-[520px] bg-gray-50 rounded-2xl p-4 md:p-6 shadow-inner">

                  {currentRecognition.image ? (
                    <img
                      src={currentRecognition.image}
                      alt={currentRecognition.title}
                      className="w-full max-h-[650px] object-contain rounded-xl"
                    />
                  ) : (
                    <div className="h-[450px] flex items-center justify-center bg-gray-100 rounded-xl">

                      <p className="text-gray-500">
                        Certificate image coming soon
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* Recognition Details */}
              <div className="w-full lg:w-1/2">

                {/* Recognition Type */}
                <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 rounded-full mb-5">
                  {currentRecognition.type}
                </span>

                {/* Recognition Title */}
                <h3 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
                  {currentRecognition.title}
                </h3>

                {/* Recognition Information */}
                <div className="mt-8 space-y-6">

                  {/* Certificate Number */}
                  {currentRecognition.certificateNumber && (
                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Certificate Number
                      </p>

                      <p className="text-lg md:text-xl font-semibold text-gray-900">
                        {currentRecognition.certificateNumber}
                      </p>

                    </div>
                  )}

                  {/* Delegate */}
                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Delegate
                    </p>

                    <p className="text-lg md:text-xl font-medium text-gray-900">
                      {delegate.fullName}
                    </p>

                  </div>

                  {/* Summit */}
                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Summit
                    </p>

                    <p className="text-lg md:text-xl font-medium text-gray-900">
                      {delegate.summit}
                    </p>

                  </div>

                  {/* Issue Date */}
                  {currentRecognition.issuedDate && (
                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Issue Date
                      </p>

                      <p className="text-lg md:text-xl font-medium text-gray-900">
                        {formatDate(currentRecognition.issuedDate)}
                      </p>

                    </div>
                  )}

                </div>

                {/* Verification */}
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-semibold">

                  <span className="flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-full text-xs">
                    ✓
                  </span>

                  VERIFIED

                </div>

              </div>

            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center gap-6 mt-10">

              <button
                onClick={previousRecognition}
                aria-label="Previous recognition"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-xl hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
              >
                ←
              </button>

              <span className="min-w-[70px] text-center text-gray-600 font-medium">
                {recognitionIndex + 1} / {recognitions.length}
              </span>

              <button
                onClick={nextRecognition}
                aria-label="Next recognition"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-xl hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
              >
                →
              </button>

            </div>

          </div>
        )}

      </main>
    </>
  );
}

export default DelegateProfile;
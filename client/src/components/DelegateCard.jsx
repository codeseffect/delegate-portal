function DelegateCard({ delegate }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
      <img
        src={
          delegate.profileImage ||
          "https://via.placeholder.com/300x300?text=Delegate"
        }
        alt={delegate.fullName}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">
          {delegate.fullName}
        </h2>

        <p className="text-gray-600">
          {delegate.designation}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {delegate.country}
        </p>
      </div>
    </div>
  );
}

export default DelegateCard;
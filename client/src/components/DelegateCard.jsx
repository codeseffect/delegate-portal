import { Link } from "react-router-dom";

function DelegateCard({ delegate }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden">
      <img
  src="https://picsum.photos/500"
  alt={delegate.fullName}
  className="w-full h-60 object-cover"
      />

      <div className="p-5">
        <h2 className="font-bold text-lg">
          {delegate.fullName}
        </h2>

        <p className="text-blue-700 font-medium">
          {delegate.designation}
        </p>

        <p className="text-gray-500 mt-1">
          {delegate.country}
        </p>

       <Link
  to={`/delegate/${delegate._id}`}
  className="block mt-5 bg-blue-700 text-white text-center py-2 rounded-lg hover:bg-blue-800"
>
  View Profile
</Link>
      </div>
    </div>
  );
}

export default DelegateCard;
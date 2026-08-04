function SearchBar() {
  return (
    <div className="my-8">
      <input
        type="text"
        placeholder="Search delegates..."
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
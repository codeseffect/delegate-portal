function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search delegates..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
    />
  );
}

export default SearchBar;
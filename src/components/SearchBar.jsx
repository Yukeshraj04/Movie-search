import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ onSearch, query, setQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search movies"
      />
      <button type="submit" aria-label="Search">
        <FaSearch />
      </button>
    </form>
  );
};

function Suggestions({ suggestions }) {
  if (!suggestions) return null;

  return (
    <div className="suggestions-list">
      <ul>
        {suggestions.map((s, i) => (
          <li key={i}>💡 {s}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;

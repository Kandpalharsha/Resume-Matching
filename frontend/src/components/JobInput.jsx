function JobInput({ jobText, setJobText }) {
  return (
    <div>
      <h3>Paste Job Description</h3>

      <textarea
        rows="6"
        cols="60"
        placeholder="Paste job requirements here"
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      />
    </div>
  );
}

export default JobInput;

export const analyzeResume = async (resume, jobText) => {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("job_description", jobText);

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

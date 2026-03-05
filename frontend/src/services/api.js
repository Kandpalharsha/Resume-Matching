const API_URL = import.meta.env.VITE_API_URL;

export const analyzeResume = async (resume, jobText) => {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("job_description", jobText);

  const res = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

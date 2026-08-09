const API_URL = "http://localhost:5000/api";

function checkResponse(response) {
  if (!response.ok) {
    return response.json().then((body) => {
      throw body.error || new Error("Request failed");
    });
  }
  return response.json();
}

function analyzeText(text) {
  return fetch(`${API_URL}/analyze/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then(checkResponse);
}

function uploadFile(path, file) {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    body: formData,
  }).then(checkResponse);
}

function extractError(err) {
  if (!err || typeof err !== "object") {
    return "Unable to reach the analysis service. Please check that the backend is running and try again.";
  }
  if (err.error) return err.error;
  return err.message || "An unexpected error occurred.";
}

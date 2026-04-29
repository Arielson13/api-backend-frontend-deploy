const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const jsonHeaders = {
  "Content-Type": "application/json"
};

const handleResponse = async (response: Response) => {
  const payload = await response.json().catch(() => ({ message: "Unexpected error" }));
  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }
  return payload;
};

export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email, password })
  });

  return handleResponse(response);
};

export const registerRequest = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email, password })
  });

  return handleResponse(response);
};

// src/api/auth.ts

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await fetch("https://my-app-backend-8hja.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to register");
  }

  return result;
}

export async function login(email: string, password: string) {
  const res = await fetch("https://my-app-backend-8hja.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  // Save token
  localStorage.setItem("token", data.token);

  return data;
}

export async function getMe() {
  const token = localStorage.getItem("token");

  const res = await fetch("https://my-app-backend-8hja.onrender.com/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}
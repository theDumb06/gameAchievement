// src/api/auth.ts

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await fetch("https://your-app.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response.json();
}
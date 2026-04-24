export interface RegisterData {
  username: string;
  email: string;
  password: string;
  file?: File;
}

export interface UserInformation {
  username: string;
  bio: string;
}

export async function registerUser(data: RegisterData) {
  const response = await fetch(
    "https://my-app-backend-8hja.onrender.com/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error("Invalid JSON from server:", text);
    throw new Error("Server error");
  }

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Save token
  localStorage.setItem("token", data.token);

  return data;
}

export async function getMe() {
  const token = localStorage.getItem("token");

  const res = await fetch("https://my-app-backend-8hja.onrender.com/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text(); // 👈 important

  try {
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("Invalid response from /me:", text);
    throw new Error("Server returned invalid data");
  }
}

export async function updateProfilePic(file: File) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file); // MUST match upload.single("file")

  const res = await fetch(
    "https://my-app-backend-8hja.onrender.com/update-profile",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const data = await res.json();
  return data;
}

export async function updateProfileInfo(info: UserInformation) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://my-app-backend-8hja.onrender.com/update-info",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(info),
    },
  );

  const data = await res.json();
  return data;
}

export async function addAchievement(formData: FormData) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    "https://my-app-backend-8hja.onrender.com/add-achievements",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  const data = await res.json();
  return data;
}


export async function addProgress(userId: string, achievementId: string, progress: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    "https://my-app-backend-8hja.onrender.com/add-user-achievement",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, achievementId, progress }),
    },
  );
  const data = await res.json();
  return data;
}

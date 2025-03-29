import { API_URL, API_KEY } from "@/config/config";

const handleLogin = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}login`, {
      method: "POST",
      body: JSON.stringify({
        username: data.username.trim(),
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY || "",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return errorData;
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { error: "خطای شبکه" };
  }
};

export default handleLogin;

const handleRegister = async (data: any) => {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}register`, {
      method: "POST",
      body: JSON.stringify({
        username: data.username.trim(),
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      return errorData;
    }
    const result = await res.json();
    return result;
  } catch (error: any) {
    return { error: "خطای شبکه" };
  }
};

export default handleRegister;

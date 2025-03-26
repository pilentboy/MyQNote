// get users note with using the uniqe accessKey

const handleGetUserCloudNotes = async (accessKey: any) => {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}user_notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
        Authorization: `Bearer ${accessKey}`,
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
    console.log("Error:", error.message);
  }
};

export default handleGetUserCloudNotes;

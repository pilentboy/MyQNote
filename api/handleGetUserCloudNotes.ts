// get users note with using the uniqe accessKey
import { API_URL, API_KEY } from "@/config/config";

const handleGetUserCloudNotes = async (accessKey: any) => {
  try {
    const res = await fetch(`${API_URL}user_notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY || "",
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

import { API_URL, API_KEY } from "@/config/config";

const handleDeleteCloudNotes = async (accessKey: any) => {
  try {
    const res = await fetch(`${API_URL}delete_notes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        Authorization: `Bearer ${accessKey}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default handleDeleteCloudNotes;

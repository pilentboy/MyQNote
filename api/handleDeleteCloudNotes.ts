const handleDeleteCloudNotes = async (accessKey: any) => {
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}delete_notes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
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

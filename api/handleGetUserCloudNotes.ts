// get users note with using the uniqe accessKey

const handleGetUserCloudNotes = async (accessKey: any) => {
  try {
    const res = await fetch(`https://myqnoteapi.liara.run/user_notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
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

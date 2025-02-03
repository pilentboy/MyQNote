const handleGetUsersNotes = async (accessKey: any) => {
  try {
    const res = await fetch(`http://10.0.2.2:3000/user_notes`, {
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
      return;
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.log("Error:", error.message);
  }
};

export default handleGetUsersNotes;

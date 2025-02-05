const handleDeleteCloudNotes = async (accessKey: any) => {
  try {
    const res = await fetch("https://myqnoteapi.liara.run/delete_notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
        Authorization: `Bearer ${accessKey}`,
      },
    });

    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

export default handleDeleteCloudNotes;

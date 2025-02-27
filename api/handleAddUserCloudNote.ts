const handleAddingCloudNotes = async (
  data: any,
  date: string,
  time: string,
  direction: string,
  accessKey: string
) =>
  await fetch("https://myqnoteapi.liara.run/add_note", {
    method: "POST",
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      date: date,
      time: time,
      direction: direction,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
      Authorization: `Bearer ${22}`,
    },
  });
export default handleAddingCloudNotes;

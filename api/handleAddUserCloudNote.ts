const handleAddingCloudNotes = async (
  data: any,
  date: string,
  time: string,
  direction: string,
  accessKey: string
) =>
  await fetch(`${process.env.EXPO_PUBLIC_API_URL}add_note`, {
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
      "x-api-key": process.env.EXPO_PUBLIC_API_KEY || '',
      Authorization: `Bearer ${accessKey}`,
    },
  });
export default handleAddingCloudNotes;

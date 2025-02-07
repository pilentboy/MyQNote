const handleRegister = async (data: any) => {
  try {
    const res = await fetch("https://myqnoteapi.liara.run/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return errorData;
    }
    const result = await res.json();
    return result;
  } catch (error: any) {
    return { error: "خطای شبکه" };
  }
};

export default handleRegister;

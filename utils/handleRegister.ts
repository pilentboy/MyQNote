import axios from "axios";

const registeURL = "https://tapi.liara.run/api/users/register/";

// username: username,
// first_name: firstName,
// last_name: lastName,
// email: email,
// password: password,

const handleRegister = async (
  username: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const res = await axios.post(registeURL, {
      username,
      email,
      password,
      first_name: "test",
      last_name: "test",
    });
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

export default handleRegister;

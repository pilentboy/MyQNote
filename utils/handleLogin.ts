import axios from "axios";

const loginURL = "https://tapi.liara.run/api/users/login/";

const handleLogin = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    const res = await axios.post(loginURL, {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

export default handleLogin;

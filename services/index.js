import axios from "axios";
import { STRAPI_URL } from "../lib";
import nookies, { destroyCookie, parseCookies } from "nookies";

const login = async ({ identifier, password }) => {
  try {
    const resp = await axios.post(STRAPI_URL + "/api/auth/local", {
      identifier,
      password,
    });
    nookies.set(null, "strapi_token", resp.data.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    return Promise.resolve(resp);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUser = async () => {
  const cookies = parseCookies();
  if (cookies.strapi_token) {
    try {
      const resp = await axios.get(
        STRAPI_URL + "/api/users/me?populate=user_role",
        {
          headers: {
            Authorization: `Bearer ${cookies.strapi_token}`,
          },
        }
      );
      console.log(resp);
      return Promise.resolve(resp);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject("no token provide");
  }
};

export const logout = async () => {
  destroyCookie(null, "strapi_token");
  return Promise.resolve();
};

export { login, getUser };

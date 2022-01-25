import { setUserToken, setUserCookie } from "./utils/userData";
import { request } from "./utils/request";
import { User } from "./types";

export async function loginWithPassword(username: string, password: string) {
  const res = await request({
    url: process.env.API_URL + "/oauth/token",
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      scope: "write",
      grant_type: "password",
      client_id: process.env.APP_CLIENT_ID,
      client_secret: process.env.APP_CLIENT_SECRET,
      username,
      password,
      // TODO: support mobileVerifyCode
    }),
  });
  if (res.ok) {
    const result = await res.json();
    if (result && result["access_token"]) {
      setUserToken(result["access_token"]);
    }
  } else {
    throw new Error("Login failed");
  }
}

export async function loginWithCookie(cookie: string) {
  setUserCookie(cookie);
}

// TODO: other login ways, eg: wechat, dingtalk...

export async function info() {
  const res = await request({
    url: process.env.API_URL + "/users/me",
    method: "GET",
  });
  if (res.ok) {
    const result: User = await res.json();
    return result;
  } else {
    if ([404, 401].includes(res.status)) {
      throw new Error(`Request failed ${res.status} not auth`);
    }
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}

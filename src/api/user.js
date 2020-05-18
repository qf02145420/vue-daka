import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA } from "@/config/settings";
export function login(data) {
  return request({
    url: "/api/nursery/admin/login",
    method: "post",
    data,
  });
}

export function getInfo(accessToken) {
  return request({
    url: "/user/info",
    method: "post",
    data: {
      accessToken,
    },
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

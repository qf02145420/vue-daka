import cookie from "js-cookie";

const bindCodeName = "LOGIN-CODE";
const openIdName = "WX-OPENID";

var openid = "";
// set data
export function setBindCode(code) {
  cookie.set(bindCodeName, code);
}
export function setOpenId(id) {
  cookie.set(openIdName, id);
}
// get data
export function getUserInfo() {
  var bindCode = cookie.get(bindCodeName);
  var wxOpenId = cookie.get(openIdName);
  return {
    bindCode: bindCode,
    openId: wxOpenId,
  };
}

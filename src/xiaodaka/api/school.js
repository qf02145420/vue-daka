import request from "@/utils/request";
export function createSchool(postData) {
  return request({
    url: "/api/nursery/admin/school",
    method: "post",
    data: postData,
  });
}

export function login(formData) {
  return request({
    url: "/api/nursery/admin/login",
    method: "post",
    data: formData,
  });
}

export function getClassByOpenId(formData) {
  return request({
    url: "/api/nursery/classwxgroup/find",
    method: "post",
    data: formData,
  });
}

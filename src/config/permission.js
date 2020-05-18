/**
 * @description 路由守卫
 */
import router from "../router";
import store from "../store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/pageTitle";
import { authentication, loginInterception, routesWhiteList } from "@/config/settings";
import data from "./router";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  console.log(to);
  console.log(from);
  console.log(next);
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  let hasToken = store.getters.accessToken;
  if (!loginInterception) hasToken = true;
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasPermissions = store.getters.userName;
      if (hasPermissions) {
        next();
      } else {
        try {
          // 已经没有getinfo的功能，需要处理
          //const { permissions } = await store.dispatch("user/getInfo");
          permissions = ["admin"];
          let accessRoutes = data;
          if (authentication === "intelligence") {
            accessRoutes = await store.dispatch("permission/setRoutes", permissions);
          } else if (authentication === "all") {
            accessRoutes = await store.dispatch("permission/setAllRoutes");
          }
          router.addRoutes(accessRoutes);
          /*console.log(to);
          let obj1 = { ...to };
          let obj2 = { replace: true };
          console.log(Object.assign(obj1, obj2));
          console.log({ ...to, replace: true });*/
          next({ ...to, replace: true });
        } catch (error) {
          //await store.dispatch("user/resetToken");
          next(`/login?redirect=/login`);
          NProgress.done();
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

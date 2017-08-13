import { AuthService } from "./services/auth-service";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

@inject(AuthService, HttpClient)
export class App {
  constructor(authService, http) {
    this.authService = authService;

    const baseUrl = "http://localhost:8333/api/";

    http.configure(config => {
      config
        .withBaseUrl(baseUrl)
        .withInterceptor(this.authService.tokenInterceptor);
    });
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "My-Books";

    var handleUnknownRoutes = instruction => {
      let path = instruction.fragment.toLowerCase();

      if (path.includes("admin"))
        return "./resources/elements/admin-unknown-route.html";

      return "./resources/elements/what-happened.html";
    };
    
    config.map([
      {
        route: ["", "home"],
        name: "home",
        moduleId: "index",
        title: "home",
        nav: true,
        settings: { icon: "home"},
        layoutViewModel: "main-layout"
      },
      {
        route: "books",
        name: "books",
        moduleId: "./resources/elements/books",
        title: "books",
        nav: true,
        settings: { icon: "book" },
        layoutViewModel: "main-layout"
      },
      {
        route: "users",
        name: "users",
        moduleId: "./resources/elements/users",
        title: "users",
        nav: true,
        settings: { icon: "users"},
        layoutViewModel: "main-layout"
      },
      {
        route: "users/:name/details",
        name: "user-detail",
        moduleId: "./resources/elements/user-details",
        title: "user details",
        settings: { },
        layoutViewModel: "main-layout"
      },
      {
        route: "login",
        name: "login",
        moduleId: "./resources/elements/login",
        title: "login",
        layoutView: "login-layout.html"
      },
      {
        route: "legacy-users",
        redirect: "users"
      }
    ]);

    config.mapUnknownRoutes(handleUnknownRoutes);
  }
}

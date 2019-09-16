const router = require("express").Router();

let _registerRoutes = (routes, methods) => {
  for (key in routes) {
    //Content must be an object, must not be null , must not be an array
    //console.log("Key", key, routes[key], methods);
    if (
      typeof routes[key] === "object" &&
      routes[key] != null &&
      !(routes[key] instanceof Array)
    ) {
      _registerRoutes(routes[key], key);
    }
    if (methods === "get") {
      router.get(key, routes[key]);
    } else if (methods === "post") {
      router.post(key, routes[key]);
    }
  }
};

let routes = routes => {
  _registerRoutes(routes);
  return router;
};

module.exports = {
  routes
};

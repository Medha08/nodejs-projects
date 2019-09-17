const router = require("express").Router();

const _registerRoutes = (routes, method) => {
  for (key in routes) {
    if (
      typeof routes[key] === "object" &&
      routes[key] !== null &&
      !(routes[key] instanceof Array)
    ) {
      _registerRoutes(routes[key], key);
    }

    if (method === "get") {
      router.get(key, routes[key]);
    } else if (method === "post") {
      router.post(key, routes[key]);
    } else if (key === "NA") {
      //console.log("Inside it", routes[key], key);
      router.use(routes[key]);
    }
  }
};

let routes = routeObj => {
  _registerRoutes(routeObj);
  return router;
};

module.exports = {
  routes
};

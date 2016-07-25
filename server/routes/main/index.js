module.exports = {
  init: function(app, middleware, config) {
    // Home page for the application
    app.get("/",
      middleware.clearRedirects,
      middleware.setUserIfTokenExists,
      require("./homepage").bind(app, config));

    // Entry point to the editor for all users
    app.get("/editor",
      middleware.setErrorPrefix("errorMigratingProject"),
      middleware.clearRedirects,
      middleware.setUserIfTokenExists,
      middleware.setPublishUser,
      require("./root").bind(app, config));

    // Load an authenticated user's project
    app.get("/user/:username/:projectId",
      middleware.setErrorPrefix("errorLoadingThimble"),
      middleware.clearRedirects,
      middleware.redirectAnonymousUsers,
      middleware.setUserIfTokenExists,
      middleware.setPublishUser,
      middleware.setProject,
      require("./authenticated").bind(app, config));

    // Load an anonymous user's project
    app.get("/anonymous/:anonymousId/:remixId?",
      middleware.setErrorPrefix("errorLoadingThimble"),
      middleware.clearRedirects,
      middleware.setUserIfTokenExists,
      middleware.setPublishUser,
      require("./anonymous").bind(app, config));
  }
};

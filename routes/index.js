export default (app) => {
  app.get("/", (_req, res) => {
    res.format({
      "text/html": (_) => res.redirect("/atlassian-connect.json"),
      "application/json": (_) => res.redirect("/atlassian-connect.json"),
    });
  });

  app.get("/add", (_req, res) => {
    res.render("add-dialog");
  });

  app.get("/view", (_req, res) => {
    res.render("view-panel");
  });

  app.get("/delete", (_req, res) => {
    res.render("delete-dialog");
  });
};

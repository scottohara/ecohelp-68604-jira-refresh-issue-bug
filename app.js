import { cwd, env } from "node:process";
import ac from "@atlassian/atlassian-connect-express";
import compression from "compression";
import console from "node:console";
import cookieParser from "cookie-parser";
import errorHandler from "errorhandler";
import expiry from "static-expiry";
import express from "express";
import hbs from "express-hbs";
import http from "node:http";
import { join } from "node:path";
import morgan from "morgan";
import os from "node:os";
import routes from "./routes/index.js";

// Needed to fix expiry on Windows
env.PWD ??= cwd();

const root = import.meta.dirname,
  staticDir = join(root, "public"),
  viewsDir = `${root}/views`,
  app = express(),
  addon = ac(app),
  port = addon.config.port(),
  devEnv = "development" === app.get("env");

app.set("port", port);
app.engine("hbs", hbs.express3({ partialsDir: viewsDir }));
app.set("view engine", "hbs");
app.set("views", viewsDir);
app.use(morgan(devEnv ? "dev" : "combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(addon.middleware());
app.use(expiry(app, { dir: staticDir, debug: devEnv }));
hbs.registerHelper("furl", (url) => app.locals.furl(url));
app.use(express.static(staticDir));

if (devEnv) {
  app.use(errorHandler());
}

routes(app);

http.createServer(app).listen(port, () => {
  console.log(`Add-on server running at http://${os.hostname()}:${port}`);

  if (devEnv) {
    addon.register().catch(() => undefined);
  }
});

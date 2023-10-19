const module = await import(`./Server.js`);
const Server = module.Server;

//import { Server } from "./Server.js";
//import { Site } from "./models/Site.js";

//await Site.start("./misc/kv.sqlite3");
//await Site.initializeDb();

Deno.serve(async (request) => {
  return await Server.response(request);
});

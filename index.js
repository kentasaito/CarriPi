import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  const uuid = "https://deno.land/std@0.192.0/uuid/mod.ts";
  const { version } = await import(uuid);
  const ver = version("109156be-c4fb-41ea-b1b4-efe1671c5836");
  return new Response(ver);
});

/*
import { Server } from "./Server.js";
//import { Site } from "./models/Site.js";

//await Site.start("./misc/kv.sqlite3");
//await Site.initializeDb();

Deno.serve(async (request) => {
  return await Server.response(request);
});
*/

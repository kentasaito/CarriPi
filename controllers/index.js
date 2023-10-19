import { Server } from "../Server.js";
//import { Site } from "../models/Site.js";

export default async () => {
  //  const data = await Site.cartridges();
  return Server.responseHtml(
    await Server.loadView(
      "layout",
      null,
      Server.requestController,
    ),
  );
};

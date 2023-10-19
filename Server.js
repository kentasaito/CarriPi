import { contentType } from "https://deno.land/std@0.204.0/media_types/content_type.ts";
import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

export class Server {
  static request;
  static requestUrl;
  static requestPath;
  static requestParameters;
  static requestController;

  static async response(request) {
    this.request = request;
    this.requestUrl = new URL(request.url);

    this.requestPath = this.requestUrl.pathname.replace(/^\/*/, "");
    if (this.requestPath === "sw.js") {
      return new Response(Deno.readFileSync("./static/sw.js"), {
        headers: {
          "Content-Type": "text/javascript",
        },
      });
    }
    if (this.requestPath.match(/^static\//)) {
      return new Response(Deno.readFileSync(`./${this.requestPath}`), {
        headers: {
          "Content-Type": contentType(this.requestPath.replace(/.*\./, ".")),
        },
      });
    }

    if (this.requestPath === "") this.requestPath = "index";
    if (this.requestPath.match(/\/$/)) {
      this.requestPath += "index";
    }
    this.requestParameters = this.requestPath.split("/");
    this.requestController = this.requestParameters.shift();

console.log('Can I use console.log?');
console.log(Deno.readFileSync(`./controllers/${this.requestController}.js`));
return new Response(JSON.stringify(Deno.cwd()), {
  headers: {
    "Content-Type": "text/html",
  },
});

    let module;
    try {
      module = await import(`./controllers/${this.requestController}.js`);
    } catch (error) {
      return new Response(error, { status: 404 });
    }

    try {
      const controller = module.default;
      return await controller(this.requestParameters);
    } catch (error) {
      return new Response(error, { status: 500 });
    }
  }

  static async loadView(path, data, childPath) {
    const module = await import(`./views/${path}.js`);
    return module.default(data, childPath);
  }

  static responseHtml(contents, headers = {}) {
    return new Response(contents, {
      headers: {
        "Content-Type": "text/html",
        ...headers,
      },
    });
  }

  static responseJson(data, headers = {}) {
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }

  static redirect(location, headers = {}) {
    return new Response("", {
      status: 302,
      headers: {
        "Content-Length": 0,
        "Location": location,
        ...headers,
      },
    });
  }

  static map(rows, callback) {
    return rows.map((row) => callback(row)).join("");
  }

  static renderMarkdown(path) {
    const decoder = new TextDecoder("utf-8");
    const markdown = decoder.decode(Deno.readFileSync(`./markdown/${path}.md`));
    const data = marked.parse(markdown);
    return data;
  }
}

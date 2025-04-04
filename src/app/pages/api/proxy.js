import httpProxy from "http-proxy";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  console.log("Original Request URL:", req.url);
  return new Promise((resolve, reject) => {
    req.headers["X-Auth-Token"] = process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN;

    console.log("Original Request URL:", req.url);

    req.url = req.url.replace(/^\/api\/proxy/, "");

    console.log("Forwarding to:", process.env.NEXT_PUBLIC_API_URL + req.url);

    if (!req.url) {
      res.status(400).send("Invalid request path.");
      return reject(new Error("Invalid request path"));
    }

    console.log("Proxying to:", process.env.NEXT_PUBLIC_API_URL + req.url);

    proxy.web(
      req,
      res,
      { target: process.env.NEXT_PUBLIC_API_URL, changeOrigin: true },
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
}

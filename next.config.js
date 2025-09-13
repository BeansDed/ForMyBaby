/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "ForMyBaby"; // <= your repo name

module.exports = {
  output: "export",                 // creates static site in /out
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true },    // next/image works on static export
  trailingSlash: true,              // helps with refresh on nested routes
};

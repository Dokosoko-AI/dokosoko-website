import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const owner = repository[0] ?? "";
const repositoryName = repository[1] ?? "";
const isUserSite = repositoryName.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const inferredBasePath = process.env.GITHUB_ACTIONS === "true" && !isUserSite
  ? `/${repositoryName}`
  : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

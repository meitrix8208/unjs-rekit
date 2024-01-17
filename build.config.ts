import { defineBuildConfig } from "unbuild";
export default defineBuildConfig({
  declaration: true,
  entries: [
    "src/index.ts",
    "src/cli.ts",
    "src/crypto.ts",
    "src/env.ts",
    "src/fetch.ts",
    "src/https.ts",
    "src/object.ts",
    "src/path.ts",
    "src/regex.ts",
    "src/string.ts",
    "src/url.ts",
  ],
  rollup: {
    emitCJS: true,
  },
  clean: true,
  externals: ["h3", "express-get-is-https", "express-get-url"],
});

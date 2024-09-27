import config from "@antfu/eslint-config";

export default config({
  stylistic: {
    semi: true,
    quotes: "double",
    indent: 2,
  },
  rules: {
    "antfu/no-import-dist": "off",
    "antfu/no-top-level-await": "off",
  },
  ignores: ["node_modules", "dist", "coverage"],
});

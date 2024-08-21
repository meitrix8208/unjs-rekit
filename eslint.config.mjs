import config from "@antfu/eslint-config";

export default config({
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  ignores: ["node_modules", "dist", "coverage"],
});

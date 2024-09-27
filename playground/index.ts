import { consola } from "../dist/cli";
import { hash, isEqual, randomUUID } from "../dist/crypto";
import { isWindows, platform, runtimeInfo } from "../dist/env";
import { ofetch } from "../dist/fetch";
import { createApp, eventHandler, toWebHandler } from "../dist/https";
/* eslint-disable no-console */
import { defu, destr } from "../dist/object";
import { join, parse } from "../dist/path";
import { char, createRegExp, digit, maybe, oneOrMore } from "../dist/regex";
import { kebabCase } from "../dist/string";
import { withBase, withQuery } from "../dist/url";

let runtime = destr<{ deno: string; node: string; bun: string }>("{ \"deno\": \"perl\" }");
const other = { deno: "NO-RUST", node: "c++", bun: "zig" };
runtime = defu(runtime, other);
runtime.deno = "rust";
consola.info(runtime.deno, runtime.node, runtime.bun);

const hash1 = hash(runtime.bun);
const hash2 = hash(runtime.bun);
const hash3 = hash(other.bun);

consola.info(hash1, hash2, hash3);
consola.info(isEqual(hash1, hash2));
consola.info(isEqual(hash1, hash3));

consola.info(platform);
consola.info(isWindows);
consola.info(runtimeInfo);

try {
  const res = await ofetch("https://api.github.com/repos/octocat/Hello-World");
  consola.info(res.description);
}
catch (error) {
  consola.error(error);
}

const path = join("a", "b", "c");
const parsed = parse(path);
consola.info(path, parsed);

const base = "https://example.com";
const url = withBase("/foo", base);
const url2 = withQuery(url, { bar: "baz" });
consola.info(url, url2);

const string = "FooBar";
const kebab = kebabCase(string);
consola.info(kebab);

const regex = createRegExp(
  oneOrMore(digit).groupedAs("major"),
  ".",
  oneOrMore(digit).groupedAs("minor"),
  maybe(".", oneOrMore(char).groupedAs("patch")),
);

const match = regex.exec("1.2.3");
if (match?.groups) {
  consola.info({ major: match.groups.major, minor: match.groups.minor, patch: match.groups.patch });
}

const uuid = randomUUID();

consola.info(uuid);

const app = createApp();
app.use("/", eventHandler((event) => {
  console.log(event.method, event.node.req.url, event.node.req.headers);
  return new Response("Hello, World!", { status: 200 });
}));

const handler = toWebHandler(app);
const response = await handler(new Request(
  new URL("/", "http://localhost"),
  { headers: { "x-test": "test" } },
));
const text = await response.text();
consola.info(text);

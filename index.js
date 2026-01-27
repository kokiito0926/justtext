#!/usr/bin/env node

// 下記のようにスクリプトを実行すれば、stdinの問題は発生しない。
// >> $ curl https://example.com/ | ./src/example.js
// >> $ curl https://example.com/ | zx ./src/example.js
// >> 2026/01/27 15:16.

// nodeでスクリプトを実行すると、stdinの問題が発生する。
// なので、コード自体には問題はないので、zxで実行するか、直接的に実行すればいい。
// >> $ curl https://example.com/ | node ./src/example.js
// >> 2026/01/26 19:18.

// nodeで実行すると、stdinの問題が発生する。
// この解決方法は、まだわからないので、あとで調べておくいい。
// >> $ curl https://example.com/ | node ./src/example.js
/*
stdin is not a tty
*/
// >> 2026/01/26 18:27.

// >> $ curl -sSL https://example.com/ | ./index.js
// >> $ curl -sSL https://kokiito.com/ | ./index.js

// >> $ curl -sSL https://kokiito.com/ | ./src/example.js
// >> $ curl -sSL https://kokiito.com/ | ./src/example.js --sanitize

// >> $ curl https://example.com/ | ./src/example.js
// >> $ curl https://example.com/ | zx ./src/example.js

// >> $ curl https://example.com/ > ./example.html
// >> $ cat ./example.html | zx ./src/example.js

import { stdin } from "zx";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

if (process.stdin.isTTY) {
	// console.error("Error: HTML is not piped to stdin.");
	process.exit(1);
}

const html = await stdin();
// console.log(html);

const dom = new JSDOM(html);
// const dom = new JSDOM(html, { url: "http://localhost" });
// const dom = new JSDOM(html, { url: "https://example.com/" });

const reader = new Readability(dom.window.document);
const article = reader.parse();
if (!article) {
	process.exit(1);
}
// console.log(article);

console.log(article?.textContent);

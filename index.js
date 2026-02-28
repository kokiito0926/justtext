#!/usr/bin/env node

// 下記のコマンドを実行すると、エラーが発生してしまう。
// styleのタグを解析するときに問題が発生していたので、styleのタグは削除するようにした。
// >> $ curl -fsSL https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/ | ./index.js
/*
TypeError: Cannot create property 'border-width' on string 'unset'
*/
// >> 2026/02/28 18:13.

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

import { stdin } from "zx";
import sanitizeHtml from "sanitize-html";
import { JSDOM, VirtualConsole } from "jsdom";
import { Readability } from "@mozilla/readability";

if (process.stdin.isTTY) {
	process.exit(1);
}

const html = await stdin();
if (!html) {
	process.exit(1);
}

const cleanHtml = sanitizeHtml(html, {
	nonTextTags: ["style", "script", "noscript"],
});

const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {});
virtualConsole.on("warn", () => {});

const dom = new JSDOM(cleanHtml, {
	pretendToBeVisual: false,
	resources: "usable",
	runScripts: "outside-only",

	features: {
		FetchExternalResources: false,
		ProcessExternalresources: false,
	},

	virtualConsole: virtualConsole,
});

const reader = new Readability(dom.window.document, {
	keepClasses: true,
});

const article = reader.parse();
if (!article) {
	process.exit(1);
}

console.log(article?.textContent);

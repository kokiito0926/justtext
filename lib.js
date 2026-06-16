import sanitizeHtml from "sanitize-html";
import { JSDOM, VirtualConsole } from "jsdom";
import { Readability } from "@mozilla/readability";

export function justtext(html) {
	if (!html) {
		return null;
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
		return null;
	}

	return article?.textContent;
}

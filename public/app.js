import {
	initGlassTerminal,
	renderTerminalLayout,
} from "./js/components/glass-terminal.js";
import { initLensEffect } from "./js/components/lens.js";
import { initHeroEffect } from "./js/effects/liquid-canvas.js";
import { initScrollReveal } from "./js/utils/reveal.js";
import { initScrollIndicator, initSmoothScroll } from "./js/utils/scroll.js";

// ============================================
// STATE
// ============================================

let allCommands = [];

// ============================================
// CONTENT LOADING
// ============================================

async function loadContent() {
	try {
		const [commandsRes, patternsRes] = await Promise.all([
			fetch("/api/commands"),
			fetch("/api/patterns"),
		]);

		allCommands = await commandsRes.json();
		const patternsData = await patternsRes.json();

		// Render commands (Glass Terminal)
		renderTerminalLayout(allCommands);

		// Render patterns and antipatterns
		renderPatterns(patternsData.patterns, "patterns-grid", "pattern");
		renderPatterns(patternsData.antipatterns, "antipatterns-grid", "antipattern");
	} catch (error) {
		console.error("Failed to load content:", error);
	}
}

function renderPatterns(categories, containerId, classPrefix) {
	const container = document.getElementById(containerId);
	if (!container || !categories) return;

	container.innerHTML = categories
		.map(
			(category) => `
		<div class="${classPrefix}-category">
			<h3 class="${classPrefix}-category-title">${category.name}</h3>
			<ul class="${classPrefix}-list">
				${category.items.map((item) => `<li>${item}</li>`).join("")}
			</ul>
		</div>
	`,
		)
		.join("");
}

// ============================================
// EVENT HANDLERS
// ============================================

// Handle bundle download clicks via event delegation
document.addEventListener("click", (e) => {
	const bundleBtn = e.target.closest("[data-bundle]");
	if (bundleBtn) {
		const { bundle: provider } = bundleBtn.dataset;
		window.location.href = `/api/download/bundle/${provider}`;
	}
});

// ============================================
// STARTUP
// ============================================

function init() {
	initSmoothScroll();
	initScrollIndicator();
	initHeroEffect();
	initLensEffect();
	initScrollReveal();
	initGlassTerminal();
	loadContent();

	document.body.classList.add("loaded");
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

// ============================================
// MAIN APP - Entry point and orchestration
// ============================================

import {
	filterCommands,
	renderCommandsGrid,
	renderWorkflowDiagram,
	selectCommand,
	setupCategoryTabs,
} from "./js/commands.js";
import { renderSkillsNav, selectSkill } from "./js/skills.js";

// ============================================
// STATE
// ============================================

let allSkills = [];
let allCommands = [];

// ============================================
// INITIALIZATION
// ============================================

async function loadContent() {
	try {
		const [skillsRes, commandsRes] = await Promise.all([
			fetch("/api/skills"),
			fetch("/api/commands"),
		]);

		allSkills = await skillsRes.json();
		allCommands = await commandsRes.json();

		// Render skills
		renderSkillsNav(allSkills, (skill) => selectSkill(skill, allSkills));

		// Render commands
		renderWorkflowDiagram(allCommands, (cmd) =>
			selectCommand(cmd, allCommands),
		);
		renderCommandsGrid(allCommands, (cmd) => selectCommand(cmd, allCommands));
		setupCategoryTabs(filterCommands);

		// Select first items by default
		if (allSkills.length > 0) selectSkill(allSkills[0], allSkills);
		if (allCommands.length > 0) selectCommand(allCommands[0], allCommands);
	} catch (error) {
		console.error("Failed to load content:", error);
	}
}

// ============================================
// UTILITIES
// ============================================

function animateIn() {
	const elements = document.querySelectorAll("[data-animate]:not(.animated)");
	elements.forEach((el, i) => {
		el.style.animationDelay = `${i * 0.05}s`;
		el.classList.add("animated");
	});
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

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", loadContent);
} else {
	loadContent();
}
window.addEventListener("load", () => {
	document.body.classList.add("loaded");
	animateIn();
});


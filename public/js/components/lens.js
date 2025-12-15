export function initLensEffect() {
	const container = document.getElementById("lens-comparison");
	if (!container) return;

	const lensContainer = container.querySelector(".lens-container");
	const lensAfter = container.querySelector(".lens-after");
	const lensCircle = container.querySelector(".lens-circle");

	if (!lensContainer || !lensAfter || !lensCircle) return;

	let isHovering = false;

	function updateLens(x, y) {
		const rect = lensContainer.getBoundingClientRect();
		const relX = ((x - rect.left) / rect.width) * 100;
		const relY = ((y - rect.top) / rect.height) * 100;

		const clampedX = Math.max(25, Math.min(75, relX));
		const clampedY = Math.max(30, Math.min(70, relY));

		lensAfter.style.clipPath = `circle(120px at ${clampedX}% ${clampedY}%)`;
		lensCircle.style.setProperty("--lens-x", `${clampedX}%`);
		lensCircle.style.setProperty("--lens-y", `${clampedY}%`);
		lensCircle.style.left = `${clampedX}%`;
		lensCircle.style.top = `${clampedY}%`;
	}

	lensContainer.addEventListener("mouseenter", () => {
		isHovering = true;
	});

	lensContainer.addEventListener("mouseleave", () => {
		isHovering = false;
		// Reset to default position
		updateLens(
			lensContainer.getBoundingClientRect().left +
				lensContainer.offsetWidth * 0.7,
			lensContainer.getBoundingClientRect().top +
				lensContainer.offsetHeight * 0.5,
		);
	});

	lensContainer.addEventListener("mousemove", (e) => {
		if (isHovering) {
			updateLens(e.clientX, e.clientY);
		}
	});

	// Touch support
	lensContainer.addEventListener("touchmove", (e) => {
		e.preventDefault();
		const touch = e.touches[0];
		updateLens(touch.clientX, touch.clientY);
	});

	// Initialize at default position
	updateLens(
		lensContainer.getBoundingClientRect().left +
			lensContainer.offsetWidth * 0.7,
		lensContainer.getBoundingClientRect().top +
			lensContainer.offsetHeight * 0.5,
	);
}

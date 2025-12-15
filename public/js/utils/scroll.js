import Lenis from "lenis";

export function initSmoothScroll() {
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
		orientation: "vertical",
		gestureOrientation: "vertical",
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 2,
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	// Handle anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", (e) => {
			e.preventDefault();
			const target = document.querySelector(anchor.getAttribute("href"));
			if (target) {
				lenis.scrollTo(target, { offset: -40 });
			}
		});
	});
    
    return lenis;
}

export function initScrollIndicator() {
	const indicator = document.querySelector(".hero-scroll-indicator");
	if (!indicator) return;

	function update() {
		if (window.scrollY > 20) {
			indicator.classList.add("hidden");
		} else {
			indicator.classList.remove("hidden");
		}
	}

	window.addEventListener("scroll", update, { passive: true });
	update();
}

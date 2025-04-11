// src/lib/actions/viewport.ts

interface ViewportOptions {
	once?: boolean; // Trigger only once
	threshold?: number; // Percentage of element visible (0 to 1)
	rootMargin?: string; // Margin around the root
}

/**
 * Svelte Action to dispatch a 'enterViewport' or 'exitViewport' event
 * when the element enters or exits the viewport.
 */
export function viewport(node: HTMLElement, options?: ViewportOptions) {
	let observer: IntersectionObserver | undefined;

	const handleIntersect: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				node.dispatchEvent(new CustomEvent('enterViewport'));
				if (options?.once) {
					observer?.unobserve(node); // Stop observing after first entry if 'once' is true
				}
			} else {
				// Optionally dispatch exit event if not 'once'
				if (!options?.once) {
					node.dispatchEvent(new CustomEvent('exitViewport'));
				}
			}
		});
	};

	const initObserver = () => {
		const observerOptions = {
			root: null, // relative to document viewport
			rootMargin: options?.rootMargin ?? '0px',
			threshold: options?.threshold ?? 0.1 // Trigger when 10% visible
		};
		observer = new IntersectionObserver(handleIntersect, observerOptions);
		observer.observe(node);
	};

	// Initialize the observer
	// Use timeout to ensure node is fully mounted in complex scenarios
	const timeoutId = setTimeout(initObserver, 0);

	return {
		destroy() {
			clearTimeout(timeoutId);
			if (observer) {
				observer.disconnect();
			}
		}
	};
}

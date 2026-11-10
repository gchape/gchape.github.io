import { useEffect, useRef } from "react";

export function SiteBackground() {
	const light = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = light.current;
		if (!element) return;
		const media = window.matchMedia(
			"(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
		);
		let frame = 0;
		let x = 0;
		let y = 0;
		let positioned = false;

		function move(event: PointerEvent) {
			if (!media.matches || event.pointerType === "touch") return;
			x = event.clientX;
			y = event.clientY;
			if (frame) return;
			frame = window.requestAnimationFrame(() => {
				if (!positioned) element?.style.setProperty("transition-duration", "0s");
				element?.style.setProperty("translate", `${x}px ${y}px`);
				frame = window.requestAnimationFrame(() => {
					element?.style.removeProperty("transition-duration");
					element?.style.setProperty("translate", `${x}px ${y}px`);
					element?.style.setProperty("opacity", "1");
					positioned = true;
					frame = 0;
				});
			});
		}

		function hide() {
			window.cancelAnimationFrame(frame);
			frame = 0;
			positioned = false;
			element?.style.setProperty("opacity", "0");
		}

		window.addEventListener("pointermove", move, { passive: true });
		document.documentElement.addEventListener("pointerleave", hide);
		window.addEventListener("blur", hide);
		media.addEventListener("change", hide);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("pointermove", move);
			document.documentElement.removeEventListener("pointerleave", hide);
			window.removeEventListener("blur", hide);
			media.removeEventListener("change", hide);
		};
	}, []);

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(var(--grid-dot)_0.8px,transparent_0.8px)] bg-size-[24px_24px]" />
			<div className="absolute -top-64 -right-64 size-[44rem] rounded-full bg-primary/7 blur-[100px]" />
			<div className="absolute -bottom-64 -left-64 size-[36rem] rounded-full bg-primary/5 blur-[100px]" />
			<div
				ref={light}
				className="fixed top-0 left-0 hidden size-0 opacity-0 transition-[translate,opacity] duration-500 ease-out pointer-fine:block motion-reduce:hidden motion-reduce:transition-none"
			>
				<div className="absolute size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_70%)]" />
				<div className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70 shadow-[0_0_16px_3px_color-mix(in_oklab,var(--primary)_35%,transparent)]" />
			</div>
		</div>
	);
}

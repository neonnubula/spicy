import React from "react";

const WhySticky: React.FC = () => {
	return (
		<section id="about" className="relative py-12 md:py-20" aria-labelledby="why-title">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-end justify-between">
					<h2 id="why-title" className="text-3xl md:text-5xl font-display font-bold text-[color:var(--foreground)]">
						Why Hackademia
					</h2>
				</div>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 h-[320vh]">
				{/* Card 1 */}
				<article className="sticky top-0 z-10 h-screen rounded-2xl overflow-hidden shadow-lifted bg-[color:var(--card)]">
					<img
						src="/assets/images/vision-blue-1.png"
						alt=""
						aria-hidden="true"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					<div className="relative h-full w-full flex items-end p-6 md:p-10">
						<div className="max-w-2xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
							<span className="block text-sm uppercase tracking-wide opacity-80">The vision</span>
							<p className="mt-2 text-2xl md:text-4xl font-semibold">
								This is the Only AI Tool Built for Academic Integrity.
							</p>
						</div>
					</div>
				</article>

				{/* Card 2 */}
				<article className="sticky top-[48px] z-20 h-screen rounded-2xl overflow-hidden shadow-lifted bg-[color:var(--card)] mt-[100vh]">
					<img
						src="/assets/images/vision-orange-1.png"
						alt=""
						aria-hidden="true"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					<div className="relative h-full w-full flex items-end p-6 md:p-10">
						<div className="max-w-2xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
							<span className="block text-sm uppercase tracking-wide opacity-80">The vision</span>
							<p className="mt-2 text-2xl md:text-4xl font-semibold">
								We’re building skills that last, <span className="text-hacka-brand">not quick fixes</span>
							</p>
						</div>
					</div>
				</article>

				{/* Card 3 */}
				<article className="sticky top-[96px] z-30 h-screen rounded-2xl overflow-hidden shadow-lifted bg-[color:var(--card)] mt-[200vh]">
					<img
						src="/assets/images/vision-blue-2.png"
						alt=""
						aria-hidden="true"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					<div className="relative h-full w-full flex items-end p-6 md:p-10">
						<div className="max-w-2xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
							<span className="block text-sm uppercase tracking-wide opacity-80">The vision</span>
							<p className="mt-2 text-2xl md:text-4xl font-semibold">
								We’re making AI tools shame-free and transparent
							</p>
						</div>
					</div>
				</article>
			</div>
		</section>
	);
};

export default WhySticky;



import React, { useState } from "react";

const BetaForm: React.FC = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [reason, setReason] = useState("");
	const [status, setStatus] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	function validateEmail(value: string) {
		return /.+@.+\..+/.test(value);
	}

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setStatus(null);
		setError(null);
		if (!fullName || !email || !phone || !reason) {
			setError("Please complete all required fields.");
			return;
		}
		if (!validateEmail(email)) {
			setError("Please enter a valid email address.");
			return;
		}
		setSubmitting(true);
		try {
			// Placeholder submission. Hook up to Formspree or API later.
			await new Promise((r) => setTimeout(r, 600));
			setStatus("Thanks! We received your request and will be in touch.");
			setFullName("");
			setEmail("");
			setPhone("");
			setReason("");
		} catch (err) {
			setError("Something went wrong. Please try again later.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<section id="beta" className="py-12 md:py-20 bg-dark-900">
			<div className="section-container">
				<div className="flex items-center gap-3 mb-6">
					<span className="pulse-chip"><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">05</span>Request Access</span>
				</div>
				<h2 className="section-title mb-3">Join Our Beta Testing Program</h2>
				<p className="section-subtitle mb-8 max-w-2xl">
					Limited spots for motivated students. Help shape the future of academic AI and get early access to new capabilities.
				</p>

				<form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
					<div className="col-span-1">
						<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
						<input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500" />
					</div>
					<div className="col-span-1">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
						<input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500" />
					</div>
					<div className="col-span-1">
						<label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (+country)</label>
						<input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500" />
					</div>
					<div className="col-span-1 md:col-span-2">
						<label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
						<textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows={4} required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500"></textarea>
					</div>
					<div className="col-span-1 md:col-span-2 flex items-center gap-3">
						<button type="submit" disabled={submitting} className="button-primary">
							{submitting ? "Submitting..." : "Request Beta Access"}
						</button>
						{status && <span className="text-green-600 text-sm" role="status" aria-live="polite">{status}</span>}
						{error && <span className="text-red-600 text-sm" role="alert">{error}</span>}
					</div>
				</form>
			</div>
		</section>
	);
};

export default BetaForm;



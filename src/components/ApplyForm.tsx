import React, { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.interest || !formData.message) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    // TODO: Actual submission logic
    setTimeout(() => {
      toast.success("Request submitted successfully!");
      setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
      setSubmitting(false);
      setError(null);
    }, 1000);
  };

  return (
    <>
      <h2 className="text-xl font-display font-bold mb-6 text-center text-gray-900">Apply for Early Access as a Tester</h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="interest" className="block text-sm font-medium text-gray-700">I am interested in</label>
          <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
            <SelectTrigger className="mt-1 w-full rounded-xl">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free-testing">Free Testing Access Only</SelectItem>
              <SelectItem value="free-or-paid">Free Testing Access or Paid Full Access</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">One sentence on what most interested in testing it for</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pulse-500"
          ></textarea>
        </div>
        <div>
          <button type="submit" disabled={submitting} className="w-full px-6 py-3 bg-pulse-500 hover:bg-pulse-600 text-white font-medium rounded-full transition-colors duration-300">
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ApplyForm;

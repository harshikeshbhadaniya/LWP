import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call to send email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-brand-200 bg-white p-8 shadow-panel">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Send an inquiry</p>

      {submitStatus === 'success' && (
        <div className="flex items-start gap-3 rounded-3xl bg-green-50 p-4 text-green-800">
          <CheckCircle size={20} className="mt-0.5 flex-shrink-0 text-green-600" />
          <div>
            <p className="font-semibold">Message sent successfully</p>
            <p className="text-sm">We'll get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="flex items-start gap-3 rounded-3xl bg-red-50 p-4 text-red-800">
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-red-600" />
          <div>
            <p className="font-semibold">Failed to send message</p>
            <p className="text-sm">Please try again or contact us directly.</p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-brand-700">
          <span>Name *</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`w-full rounded-3xl border bg-brand-100 px-4 py-3 text-sm text-brand-900 outline-none transition focus:border-brand-900 ${
              errors.name ? 'border-red-500' : 'border-brand-200'
            }`}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </label>

        <label className="space-y-2 text-sm text-brand-700">
          <span>Email *</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className={`w-full rounded-3xl border bg-brand-100 px-4 py-3 text-sm text-brand-900 outline-none transition focus:border-brand-900 ${
              errors.email ? 'border-red-500' : 'border-brand-200'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </label>

        <label className="space-y-2 text-sm text-brand-700">
          <span>Phone *</span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={`w-full rounded-3xl border bg-brand-100 px-4 py-3 text-sm text-brand-900 outline-none transition focus:border-brand-900 ${
              errors.phone ? 'border-red-500' : 'border-brand-200'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
        </label>

        <label className="space-y-2 text-sm text-brand-700">
          <span>Subject *</span>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Inquiry subject"
            className={`w-full rounded-3xl border bg-brand-100 px-4 py-3 text-sm text-brand-900 outline-none transition focus:border-brand-900 ${
              errors.subject ? 'border-red-500' : 'border-brand-200'
            }`}
          />
          {errors.subject && <p className="text-xs text-red-600">{errors.subject}</p>}
        </label>
      </div>

      <label className="space-y-2 text-sm text-brand-700">
        <span>Message *</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your hydraulic piping requirements"
          className={`w-full rounded-3xl border bg-brand-100 px-4 py-3 text-sm text-brand-900 outline-none transition focus:border-brand-900 ${
            errors.message ? 'border-red-500' : 'border-brand-200'
          }`}
        />
        {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-50 hover:bg-brand-800"
      >
        {isSubmitting ? (
          <>
            <Loader size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}

export default ContactForm;

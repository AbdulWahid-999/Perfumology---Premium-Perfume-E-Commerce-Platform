import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 animate-slide-down">Contact Us</h1>
          <p className="text-base md:text-lg lg:text-xl text-orange-100 animate-slide-up">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-primary-100 animate-scale-in">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send us a Message
            </h2>

            {success && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 md:px-6 py-3 md:py-4 rounded-xl mb-4 md:mb-6 flex items-center animate-scale-in text-sm md:text-base">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 md:px-6 py-3 md:py-4 rounded-xl mb-4 md:mb-6 flex items-center animate-scale-in text-sm md:text-base">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none text-sm md:text-base"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 md:py-4 rounded-2xl hover:from-primary-700 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-500 font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 h-4 md:h-5 md:w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8 animate-slide-up">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-primary-100">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Have questions about our products or need assistance? We're here to help!
                Fill out the form and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm md:text-base">wahidnarejo11234@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Response Time</h3>
                    <p className="text-gray-600 text-sm md:text-base">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">100% Secure</h3>
                    <p className="text-gray-600 text-sm md:text-base">Your information is safe with us</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-6 md:p-8 rounded-3xl shadow-2xl text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Why Choose Perfumology?</h3>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                <li className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100% Authentic Products
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Shipping Worldwide
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Expert Customer Support
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure Payment Options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

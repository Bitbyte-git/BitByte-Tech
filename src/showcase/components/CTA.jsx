export default function CTA() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main CTA block */}
        <div className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-indigo-950 rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-16 text-center overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-4 right-8 text-white/5 text-8xl font-black select-none">✦</div>
            <div className="absolute bottom-4 left-8 text-white/5 text-6xl font-black select-none">◆</div>
          </div>

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex max-w-full items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-300 text-xs sm:text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Currently Accepting New Projects
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Ready to Build Your{' '}
              <span className="text-gradient">Dream Website?</span>
            </h2>

            <p className="text-sm sm:text-lg text-gray-400 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Let's turn your vision into a stunning, high-performing website.
              Get a free consultation and quote — no commitment required.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="mailto:reachus@bitbytetech.org"
                className="group px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-navy-950 font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-400/30 text-center"
               title="Email reachus@bitbytetech.org">
                Contact Us
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
              </a>
              <a
                href="https://bitbytetech.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-center backdrop-blur-sm"
               title="Open bitbytetech.org">
                📅 Schedule a Meeting
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-gray-400 text-sm">
              {[
                { icon: '✓', text: 'Free Consultation' },
                { icon: '✓', text: 'No Hidden Fees' },
                { icon: '✓', text: 'Fast Delivery' },
                { icon: '✓', text: '100% Satisfaction' },
              ].map((b) => (
                <span key={b.text} className="flex items-center gap-1.5">
                  <span className="text-green-400 font-bold">{b.icon}</span>
                  {b.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form below */}
        <div className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: info */}
          <div>
            <h3 className="text-2xl font-black text-navy-900 mb-4">Get in Touch</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Fill in your details and we'll get back to you within 24 hours with
              a tailored proposal and timeline.
            </p>
            <ul className="space-y-4">
              {[
                { icon: '📧', label: 'Email', value: 'reachus@bitbytetech.org' },
                { icon: '📞', label: 'Phone', value: '+91 99437 43136 (Only Whatsapp)' },
                { icon: '📍', label: 'Location', value: 'BitByte Technologies 2nd Floor, Raja Complex West Wing, Opp:Sago Serve,Omalur Main Road,Salem-636302, Tamil Nadu, India. ' },
              ].map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                    {c.icon}
                  </span>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{c.label}</div>
                    <div className="text-sm font-semibold text-gray-800 break-words">{c.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks! We will contact you within 24 hours.');
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <input
              type="text"
              placeholder="Business / Project Name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <div className="relative w-full">
              <select
                className="custom-select w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                defaultValue=""
              >
                <option value="" disabled>Select a Design Template</option>
                <option>Textile Website</option>
                <option>Photoshop Website</option>
                <option>Furniture Website</option>
                <option>Billing Software Website</option>
                <option>HRMS Website</option>
                <option>Restaurant Website</option>
                <option>Gym &amp; Fitness Website</option>
                <option>Real Estate Website</option>
                <option>Interior Design Website</option>
                <option>Medical &amp; Clinic Website</option>
                <option>E-Commerce Store</option>
                <option>Custom Design</option>
              </select>
            </div>
            <textarea
              rows={4}
              placeholder="Tell us about your project and requirements..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}



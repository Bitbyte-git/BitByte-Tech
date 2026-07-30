import { features } from '../data/websites';

export default function Customization() {
  return (
    <section id="customization" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full mb-4 border border-indigo-100">
            Tailored Just for You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 mb-4">
            We Also Offer{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Full Customization
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            No template is delivered as-is. We transform every design to match your
            brand identity, business goals, and audience perfectly.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom comparison block */}
        <div className="bg-gradient-to-br from-navy-950 to-indigo-950 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl font-black mb-4">
                Template → Your{' '}
                <span className="text-gradient">Unique Brand</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We start with a proven design structure, then customize everything —
                from the color palette and typography to micro-animations and custom
                functionality — until it feels 100% yours.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-navy-950 font-bold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                Start Customizing
                <span>→</span>
              </a>
            </div>

            {/* Checklist */}
            <ul className="space-y-3">
              {[
                'Your brand colors applied to every element',
                'Custom logo, typography & icon set',
                'Unique sections built for your industry',
                'Integrated payment, booking or CRM systems',
                'SEO configuration from day one',
                'Performance optimized for Core Web Vitals',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 border border-green-400/30 flex items-center justify-center text-green-400 text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}



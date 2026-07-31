import { steps } from '../data/websites';

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-600 text-sm font-semibold rounded-full mb-4 border border-cyan-100">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            From the first click to a live website — our streamlined process
            gets you online fast, without the headaches.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="group relative text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                {/* Number bubble */}
                <div className="relative inline-flex flex-col items-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300 mb-2">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-black flex items-center justify-center border-2 border-white shadow-md">
                    {i + 1}
                  </span>
                </div>


                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline mobile version note */}
        <p className="text-center text-xs text-gray-400 mt-12">
          Average time from first meeting to launch:{' '}
          <strong className="text-gray-600">7–14 business days</strong>
        </p>
      </div>
    </section>
  );
}



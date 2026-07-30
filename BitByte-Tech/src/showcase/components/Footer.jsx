import { X, Link, Users, Camera } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Services: ['Web Design', 'Web Development', 'E-Commerce', 'SEO Optimization', 'Maintenance'],
    Designs: ['Textile', 'Photoshop', 'Furniture', 'Billing', 'HRMS', 'Restaurant', 'Gym & Fitness'],
    Company: ['About Us', 'Portfolio', 'Blog', 'Careers', 'Contact'],
  };

  return (
    <footer className="bg-navy-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/showcase-assets/BB-Logo.png"
                alt="BitByte Logo"
                className="h-[80px] w-auto object-contain drop-shadow-lg"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-extrabold text-base bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent tracking-wide">
                  Bit Byte
                </span>
                <span className="font-bold text-[9px] text-white uppercase tracking-widest mt-0.5">
                  Technologies
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              We design and build premium websites that help businesses grow online.
              From templates to fully custom solutions, we've got you covered.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: X, href: 'https://twitter.com', label: 'X' },
                { Icon: Link, href: 'https://www.linkedin.com', label: 'LinkedIn' },
                { Icon: Users, href: 'https://www.facebook.com', label: 'Facebook' },
                { Icon: Camera, href: 'https://www.instagram.com', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-1 hover:scale-110 hover:bg-white/15 hover:border-white/20 shadow-sm shadow-slate-900/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {year} BitByte. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <div className="text-xs text-gray-600">
            Made with <span className="text-red-400">♥</span> for great businesses
          </div>
        </div>
      </div>
    </footer>
  );
}



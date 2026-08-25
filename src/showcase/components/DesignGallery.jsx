import { useState } from 'react';
import { categoryDesigns } from '../data/websites';

// ─── Individual design variant card ──────────────────────────────────────────
function DesignCard({ design, accent, index, onChoose }) {
  return (
    <div
      className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 70}ms`, animationFillMode: 'both' }}
    >
      {/* Top accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${accent}`}></div>

      {/* Preview image with browser chrome */}
      <div className="relative h-44 overflow-hidden border-b border-gray-100 bg-gray-100 sm:h-48">

        {/* Browser top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-3 py-2 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
          <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
          <div className="flex-1 mx-2 bg-gray-100 rounded-full h-4 flex items-center px-2">
            <span className="text-gray-400 text-[9px] truncate">
              demo/{design.name.toLowerCase().replace(/ /g, '-')}
            </span>
          </div>
          <a
            href={design.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${design.name} preview`}
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 text-[9px] text-blue-500 hover:text-blue-700 font-semibold"
          >
            visit ↗
          </a>
        </div>

        {/* Actual screenshot image */}
        <img
          src={design.image}
          alt={`${design.name} website design preview`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ marginTop: 28 }}
          loading="lazy"
          onError={e => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        {/* Fallback if image fails */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent} hidden items-center justify-center`}
          style={{ marginTop: 28 }}
        >
          <span className="text-white/60 text-4xl">🖼️</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 z-20">
          <span className="text-white text-xs font-semibold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            Click Live Preview to open demo ↗
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{design.name}</h3>
            <span className="text-xs text-gray-400 font-medium">{design.style}</span>
          </div>
          <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${design.badgeColor}`}>
            {design.badge}
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-4">{design.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {design.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={design.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r ${accent} rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md`}
           title="Open link">
            Live Preview ↗
          </a>
          <button
            onClick={() => onChoose(design)}
            className="flex-1 py-2.5 text-center text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            Choose This
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── "Chosen" confirmation modal ──────────────────────────────────────────────
function ChosenModal({ design, category, accent, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-3xl mx-auto mb-5`}>
          ✓
        </div>
        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Great Choice!</h3>
        <p className="text-gray-500 text-center text-sm mb-1">
          You selected <strong className="text-gray-800">{design.name}</strong>
        </p>
        <p className="text-gray-400 text-center text-xs mb-6">
          from {category} — {design.style}
        </p>
        <p className="text-sm text-gray-500 text-center leading-relaxed mb-7">
          Fill out our quick contact form and we'll get back to you within 24 hours
          with a custom proposal based on this design.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Back to Gallery
          </button>
          <a
            href="/showcase/#contact"
            onClick={onClose}
            className={`flex-1 py-3 text-center text-white font-bold rounded-xl bg-gradient-to-r ${accent} hover:opacity-90 transition-opacity text-sm shadow-lg`}
           title="Go to showcase">
            Contact Us →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Design Gallery Page ─────────────────────────────────────────────────
export default function DesignGallery({ slug, categoryName, onBack }) {
  const [chosenDesign, setChosenDesign] = useState(null);
  const data = categoryDesigns[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Gallery not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-16 flex items-center justify-between gap-2 py-2 sm:gap-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-navy-900 transition-colors group"
          >
            <span className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors text-base leading-none">
              ←
            </span>
            <span className="hidden sm:inline">Back to Home</span>
          </button>

          {/* Breadcrumb */}
          <div className="min-w-0 flex flex-1 items-center justify-center gap-1.5 text-xs text-gray-400 sm:flex-none sm:gap-2 sm:text-sm">
            <span
              className="hover:text-blue-600 cursor-pointer transition-colors"
              onClick={onBack}
            >
              Home
            </span>
            <span>/</span>
            <span className="text-gray-700 font-semibold truncate max-w-[130px] sm:max-w-none">
              {data.icon} {categoryName}
            </span>
          </div>

          {/* CTA */}
          <a
            href="/showcase/#contact"
            onClick={onBack}
            className={`hidden sm:flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r ${data.accent} hover:opacity-90 transition-opacity shadow-md`}
           title="Go to showcase">
            Get Quote →
          </a>
        </div>
      </div>

      {/* Hero header */}
      <div className={`bg-gradient-to-br from-navy-950 to-indigo-950 py-12 sm:py-16 px-4 sm:px-6 text-center`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl sm:text-5xl mb-4">{data.icon}</div>
          <div className={`inline-block max-w-full px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-white/70 mb-4`}>
            7 Design Variants Available
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            {categoryName}{' '}
            <span className={`bg-gradient-to-r ${data.accent} bg-clip-text text-transparent`}>
              Designs
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto">
            Browse all 7 design styles below. Click <strong className="text-white">Live Preview</strong> to
            open the real demo, then <strong className="text-white">Choose This</strong> when you find the one.
          </p>
        </div>
      </div>

      {/* Designs grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Count + info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <p className="text-gray-500 text-sm">
            Showing <strong className="text-gray-800">{data.designs.length} designs</strong> for {categoryName}
          </p>
          <div className="flex w-full items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-700 font-medium sm:w-auto">
            <span>💡</span>
            All designs open in a new tab · 100% customizable for your brand
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {data.designs.map((design, i) => (
            <DesignCard
              key={design.id}
              design={design}
              accent={data.accent}
              index={i}
              onChoose={setChosenDesign}
            />
          ))}
        </div>

        {/* Back to all categories */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">Not finding what you need in this category?</p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-gray-300 hover:shadow-md transition-all duration-200 text-sm"
          >
            ← View All Categories
          </button>
        </div>
      </div>

      {/* Chosen modal */}
      {chosenDesign && (
        <ChosenModal
          design={chosenDesign}
          category={categoryName}
          accent={data.accent}
          onClose={() => setChosenDesign(null)}
        />
      )}
    </div>
  );
}



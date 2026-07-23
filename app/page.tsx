import Link from 'next/link';

// This is a static homepage — in production you'd fetch recent content from the _generated_index.json
export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Gaming Hot Words, <span className="text-blue-400">Real-Time</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            We track gaming trends 24/7, find the keywords with explosive search volume and
            low competition, then build guides before anyone else.
          </p>
          <Link
            href="/games"
            className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg"
          >
            Browse All Games →
          </Link>
        </div>
      </section>

      {/* Latest Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">🔥 Trending Now</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Article Card */}
          <Link
            href="/games/assassins-creed-black-flag-resynced/beginners-guide-tips"
            className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2" />
            <div className="p-6">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                Guide
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                AC Black Flag Resynced — 15 Beginner Tips I Wish I Knew Before Playing
              </h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                Ship combat, early upgrades, money farming, and the 5 biggest mistakes new players make.
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span>📅 July 22, 2026</span>
                <span>⏱ 12 min read</span>
              </div>
            </div>
          </Link>

          {/* Placeholder cards for pipeline-generated content */}
          {['Coming Soon', 'Coming Soon', 'Coming Soon', 'Coming Soon'].map((label, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] text-slate-400"
            >
              <div className="text-3xl mb-2">🕹️</div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs mt-1">Pipeline-generated content will appear here</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How We Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Discover', desc: '6 data sources scan for breakout gaming keywords 24/7' },
              { step: '2', title: 'Filter', desc: '4-dimension scoring picks high-volume, low-competition winners' },
              { step: '3', title: 'Generate', desc: 'AI drafts deep guides with real player experience injected' },
              { step: '4', title: 'Deploy', desc: 'Pages go live in minutes, indexed by Google within hours' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

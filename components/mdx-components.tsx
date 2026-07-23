// ============================================
// mdx-components.tsx — Custom MDX Components
// Renders ProTip, CommonMistake, FAQ sections,
// comparison tables, and other structured content.
// ============================================

import React from 'react';

// ─── Callout: Pro Tip ───────────────────────
export function ProTip({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-pro" role="note">
      <span className="callout-label">💡 Pro Tip{title ? `: ${title}` : ''}</span>
      <div className="text-sm leading-relaxed mt-1">{children}</div>
    </div>
  );
}

// ─── Callout: Common Mistake ────────────────
export function CommonMistake({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-mistake" role="alert">
      <span className="callout-label">⚠️ Common Mistake{title ? `: ${title}` : ''}</span>
      <div className="text-sm leading-relaxed mt-1">{children}</div>
    </div>
  );
}

// ─── Callout: Info Box ──────────────────────
export function InfoBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-info" role="note">
      {title && <span className="callout-label">{title}</span>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// ─── FAQ Section ────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-section my-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2" id="faq">
        Frequently Asked Questions
      </h2>
      {items.map((item, i) => (
        <details key={i}>
          <summary>{item.q}</summary>
          <div className="faq-answer">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

// ─── Comparison Table ───────────────────────
interface ComparisonColumn {
  key: string;
  label: string;
}

interface ComparisonRow {
  [key: string]: string;
}

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="comparison-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Step-by-Step ───────────────────────────
interface Step {
  title: string;
  desc: string;
}

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-4 my-6 pl-0 list-none">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
            {i + 1}
          </span>
          <div>
            <strong className="text-slate-900">{step.title}</strong>
            <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Platform Tag ───────────────────────────
export function PlatformTag({ platform }: { platform: string }) {
  const colors: Record<string, string> = {
    PC: 'bg-slate-100 text-slate-700',
    PS5: 'bg-blue-100 text-blue-700',
    PS4: 'bg-blue-50 text-blue-600',
    Xbox: 'bg-green-100 text-green-700',
    Switch: 'bg-red-100 text-red-700',
    Mobile: 'bg-yellow-100 text-yellow-700',
    Steam: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
        colors[platform] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {platform}
    </span>
  );
}

// ─── Breadcrumb Schema ──────────────────────
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Aggregate: All custom MDX components ───
export const mdxComponents = {
  ProTip,
  CommonMistake,
  InfoBox,
  FaqSection,
  ComparisonTable,
  StepList,
  PlatformTag,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 scroll-mt-24" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-slate-800 scroll-mt-24" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-left" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className="px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 border-b-2 border-slate-200" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td className="px-4 py-3 border-b border-slate-100 text-sm" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className="rounded-xl my-6 mx-auto max-w-full shadow-md" loading="lazy" {...props} alt={props.alt || ''} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-600 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
      {...props}
      {...(props.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-blue-400 bg-blue-50 pl-5 py-3 rounded-r-lg text-slate-600 italic" {...props} />
  ),
};

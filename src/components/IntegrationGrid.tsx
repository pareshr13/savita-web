'use client';

import { useState } from 'react';
import { integrationCats, integrations } from '@/lib/data';

const mono = (n: string) => n.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export default function IntegrationGrid({ initial = 'all' }: { initial?: string }) {
  const [cat, setCat] = useState(initial);
  const list = integrations.filter((i) => cat === 'all' || i.c === cat);
  const cats = [['all', `All · ${integrations.length}`], ...Object.entries(integrationCats).map(([k, v]) => [k, v.name])] as [string, string][];
  return (
    <>
      <div role="tablist" aria-label="Integration category" className="chips" style={{ marginBottom: 28 }}>
        {cats.map(([k, l]) => <button key={k} role="tab" aria-selected={k === cat} className="chip" onClick={() => setCat(k)}>{l}</button>)}
      </div>
      <ul className="grid g4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {list.map((i) => {
          const c = integrationCats[i.c];
          return (
            <li key={i.n} className="int-card">
              <div className="int-mono" style={{ background: c.tint, color: c.color }} aria-hidden="true">{mono(i.n)}</div>
              <div><b>{i.n}</b><span>{i.api}</span></div>
            </li>
          );
        })}
      </ul>
      <p className="fineprint">Names and trademarks belong to their respective owners and are shown to indicate API compatibility, not partnership or endorsement.</p>
    </>
  );
}

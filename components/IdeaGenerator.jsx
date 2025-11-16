'use client';

import { useMemo, useState } from 'react';

const CATEGORIES = [
  'Survival',
  'Household',
  'Workshop',
  'Art & Design',
  'STEM',
  'Game',
  'Repair',
  'Teaching',
  'Productivity',
  'Hobby'
];

const TEMPLATES = [
  (item) => `Turn ${item} into a constraint to spark creativity: limit yourself to solutions that must use it at least once. Document the best outcome.`,
  (item) => `Use ${item} as a jig/fixture to hold small parts steady while gluing or soldering.`,
  (item) => `Repurpose ${item} as a sensor: detect motion, pressure, or light and log it with a microcontroller.`,
  (item) => `Design a 5-minute game around ${item}: clear rules, scoring, and a surprising twist.`,
  (item) => `Convert ${item} into a teaching prop that explains a concept (torque, leverage, circuits, probability).`,
  (item) => `Harvest materials from ${item} and catalog them: fasteners, optics, motors, plastic panels, heat sinks.`,
  (item) => `Prototype a productivity hack: how can ${item} reduce context switching or help batching tasks?`,
  (item) => `Create wall art or a desktop sculpture from ${item} that encodes a secret message or pattern.`,
  (item) => `Build a tiny service jig: with ${item}, accelerate a repetitive task by 3x; time it before/after.`,
  (item) => `Design a safety checklist for using ${item}; laminate it and attach with a clip.`
];

function hashToIndex(text, modulo) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h % modulo;
}

function generateIdeas(rawItems, perItem = 4) {
  const items = rawItems
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.toLowerCase());

  const results = [];
  for (const item of items) {
    const usedTemplateIdx = new Set();
    for (let i = 0; i < perItem; i++) {
      let idx = (hashToIndex(item + ':' + i, TEMPLATES.length) + i) % TEMPLATES.length;
      // ensure variety per item
      let guard = 0;
      while (usedTemplateIdx.has(idx) && guard++ < TEMPLATES.length) {
        idx = (idx + 1) % TEMPLATES.length;
      }
      usedTemplateIdx.add(idx);
      const category = CATEGORIES[hashToIndex(item + '/cat/' + i, CATEGORIES.length)];
      results.push({
        item,
        category,
        text: TEMPLATES[idx](item)
      });
    }
  }
  return results;
}

export default function IdeaGenerator({ defaultItems = '' }) {
  const [items, setItems] = useState(defaultItems);
  const [count, setCount] = useState(4);
  const [groupByItem, setGroupByItem] = useState(true);

  const ideas = useMemo(() => generateIdeas(items, count), [items, count]);

  return (
    <section>
      <div className="card">
        <label htmlFor="items">Items (comma-separated)</label>
        <textarea
          id="items"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="e.g., rope, coin, broken dvd player"
        />
        <div className="controls">
          <div className="toggle">
            <input
              id="groupBy"
              type="checkbox"
              checked={groupByItem}
              onChange={(e) => setGroupByItem(e.target.checked)}
            />
            <label htmlFor="groupBy">Group by item</label>
          </div>
          <div className="toggle">
            <label htmlFor="count">Ideas per item</label>
            <button
              className="secondary"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              aria-label="decrease count"
            >?</button>
            <span className="badge">{count}</span>
            <button
              className="secondary"
              onClick={() => setCount((c) => Math.min(8, c + 1))}
              aria-label="increase count"
            >+</button>
          </div>
        </div>
      </div>

      {groupByItem ? (
        <div>
          {Array.from(new Set(ideas.map((i) => i.item))).map((it) => (
            <div key={it} style={{ marginTop: 16 }}>
              <h3 style={{ margin: '0 0 8px' }}>{it}</h3>
              <div className="grid">
                {ideas.filter((i) => i.item === it).map((idea, idx) => (
                  <article className="card" key={it + idx}>
                    <span className="badge">{idea.category}</span>
                    <div>{idea.text}</div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 16 }}>
          {ideas.map((idea, idx) => (
            <article className="card" key={idx}>
              <span className="badge">{idea.item}</span>
              <span className="badge">{idea.category}</span>
              <div>{idea.text}</div>
            </article>
          ))}
        </div>
      )}

      <div className="footer">No AI calls. Deterministic, offline templates for speed and privacy.</div>
    </section>
  );
}

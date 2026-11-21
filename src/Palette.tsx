import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface Item { l: string; h: string; f: () => void }

interface Props { items: Item[]; open: boolean; onClose: () => void }

export default function Palette({ items, open, onClose }: Props) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const cur = useMemo(() => items.filter(i => (i.l + " " + i.h).toLowerCase().includes(q.toLowerCase())), [items, q]);
  useEffect(() => {
    if (open) { setQ(""); setSel(0); setTimeout(() => input.current?.focus(), 0); }
  }, [open]);
  const run = (i?: Item) => { if (i) { onClose(); i.f(); } };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, cur.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); run(cur[sel]); }
  };
  return (
    <div id="pal" className={open ? "open" : ""} role="dialog" aria-modal="true" aria-label="Search"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="box">
        <input ref={input} value={q} onChange={e => { setQ(e.target.value); setSel(0); }} onKeyDown={onKey}
          placeholder="Search projects, skills, links" autoComplete="off" />
        <ul>
          {cur.length ? cur.map((i, n) => (
            <li key={i.l} className={n === sel ? "sel" : ""} onMouseDown={() => run(i)}>
              <span>{i.l}</span><small>{i.h}</small>
            </li>
          )) : <li><span>No match. Try a project name or a skill.</span></li>}
        </ul>
      </div>
    </div>
  );
}
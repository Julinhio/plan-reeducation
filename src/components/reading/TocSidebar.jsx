import { useEffect, useRef, useState } from "react";

export default function TocSidebar({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-160px 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const link = list.querySelector(`[data-toc-link="${activeId}"]`);
    if (!link) return;
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({
      top: linkRect.top - listRect.top,
      height: linkRect.height,
      opacity: 1,
    });
  }, [activeId]);

  function handleClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setActiveId(id);
  }

  return (
    <aside
      className="lg:sticky lg:top-32 lg:self-start no-print"
      aria-label="Sommaire de la phase"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute mb-4">
        Sommaire
      </p>
      <ul
        ref={listRef}
        className="flex lg:flex-col lg:border-l lg:border-rule lg:relative gap-2 lg:gap-0 flex-wrap"
      >
        <span
          aria-hidden
          className="hidden lg:block absolute -left-px w-0.5 bg-teal transition-all duration-200 ease-out"
          style={{
            top: `${indicator.top}px`,
            height: `${indicator.height}px`,
            opacity: indicator.opacity,
          }}
        />
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-toc-link={item.id}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => handleClick(e, item.id)}
                className={[
                  "block text-sm leading-snug transition-colors duration-200",
                  "lg:px-4 lg:py-2",
                  "px-3 py-1.5 lg:rounded-r-sm rounded-md bg-paper-card lg:bg-transparent border border-rule-soft lg:border-0",
                  isActive
                    ? "text-teal-deep font-medium"
                    : "text-ink-mute hover:text-ink",
                ].join(" ")}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

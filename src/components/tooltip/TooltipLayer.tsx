import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { registerTooltipLayer, type TooltipState } from "./tooltipBus";

const MARGIN = 8;
const GAP = 10;

/** The white tooltip card, positioned above its anchor (below when there is no room) */
export function TooltipLayer() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const element = useRef<HTMLDivElement>(null);
  const current = useRef(tooltip);
  current.current = tooltip;

  const place = () => {
    const state = current.current;
    if (!state || !element.current) return;
    if (!state.anchor.isConnected) { setTooltip(null); return; }
    const anchor = state.anchor.getBoundingClientRect();
    const { offsetWidth: width, offsetHeight: height } = element.current;
    const left = Math.max(MARGIN, Math.min(window.innerWidth - width - MARGIN, anchor.left + anchor.width / 2 - width / 2));
    const above = anchor.top - height - GAP;
    setPosition({ left, top: above < MARGIN ? anchor.bottom + GAP : above });
  };
  useLayoutEffect(place, [tooltip]);

  useEffect(() => {
    registerTooltipLayer({
      show: (state) => { setPosition(null); setTooltip(state); },
      hideIfHovering: () => { if (current.current && !current.current.pinned) setTooltip(null); },
      hide: () => setTooltip(null),
      isPinned: () => !!current.current?.pinned,
    });
    const onPointerDown = (event: PointerEvent) => {
      const state = current.current;
      const target = event.target as Node;
      if (state && !element.current?.contains(target) && !state.anchor.contains(target)) setTooltip(null);
    };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setTooltip(null); };
    const onScrollOrResize = () => {
      if (current.current?.pinned) place();
      else if (current.current) setTooltip(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      registerTooltipLayer(null);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  if (!tooltip) return null;
  return (
    <div
      ref={element}
      className={"tooltip" + (tooltip.pinned ? " pinned" : "")}
      role="tooltip"
      style={{ left: (position?.left ?? -9999) + "px", top: (position?.top ?? -9999) + "px" }}
    >
      {tooltip.content}
    </div>
  );
}

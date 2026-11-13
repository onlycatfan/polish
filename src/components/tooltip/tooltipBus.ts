import type { KeyboardEvent, ReactNode, SyntheticEvent } from "react";

/*
 * One shared tooltip for the whole page. Hover or focus shows it,
 * a click pins it until a click elsewhere or Esc. TooltipLayer registers itself here.
 */
export interface TooltipState { anchor: HTMLElement; content: ReactNode; pinned: boolean }
interface TooltipLayerApi {
  show: (state: TooltipState) => void;
  hideIfHovering: () => void;
  hide: () => void;
  isPinned: () => boolean;
}

let layer: TooltipLayerApi | null = null;
export const registerTooltipLayer = (api: TooltipLayerApi | null) => { layer = api; };

export function openTooltip(anchor: HTMLElement | null, content: ReactNode, pinned = false) {
  if (anchor) layer?.show({ anchor, content, pinned });
}
export const closeTooltip = () => layer?.hide();

/** Event handlers that attach a tooltip to an element */
export function tooltipHandlers(makeContent: () => ReactNode) {
  const show = (event: SyntheticEvent<HTMLElement>) => {
    if (!layer?.isPinned()) openTooltip(event.currentTarget, makeContent());
  };
  const pin = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
    openTooltip(event.currentTarget, makeContent(), true);
  };
  return {
    onMouseEnter: show,
    onFocus: show,
    onMouseLeave: () => layer?.hideIfHovering(),
    onBlur: () => layer?.hideIfHovering(),
    onClick: pin,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      pin(event);
    },
  };
}

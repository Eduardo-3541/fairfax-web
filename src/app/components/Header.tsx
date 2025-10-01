"use client";

import InlineNavHeader from "./headers/InlineNavHeader";
import OverlayMenuHeader from "./headers/OverlayMenuHeader";
import SplitNavHeader from "./headers/SplitNavHeader";

const HEADER_VARIANTS = {
  inline: InlineNavHeader,
  overlay: OverlayMenuHeader,
  split: SplitNavHeader,
};

type HeaderVariantKey = keyof typeof HEADER_VARIANTS;

const ACTIVE_HEADER_VARIANT = (process.env.NEXT_PUBLIC_HEADER_VARIANT as HeaderVariantKey | undefined) ?? "split";

const HeaderComponent = HEADER_VARIANTS[ACTIVE_HEADER_VARIANT] ?? HEADER_VARIANTS.inline;

export default HeaderComponent;

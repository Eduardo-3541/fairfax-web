"use client";

import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type EnterDirection = "bottom" | "left" | "right";

type FadeSectionProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
  threshold?: number;
  disableExitFade?: boolean;
  enterFrom?: EnterDirection;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function FadeSection<T extends ElementType = "section">({
  as,
  className = "",
  children,
  threshold = 0.18,
  disableExitFade = false,
  enterFrom = "bottom",
  ...rest
}: FadeSectionProps<T>) {
  const Component = (as ?? "section") as ElementType;
  const ref = useRef<Element | null>(null);
  const [visible, setVisible] = useState(false);
  const setRef = useCallback((node: Element | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (!disableExitFade) {
          setVisible(false);
        }
      },
      {
        threshold,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, disableExitFade]);

  const hiddenTransforms: Record<EnterDirection, string> = {
    bottom: "translate-y-8",
    left: "-translate-x-8",
    right: "translate-x-8",
  };
  const visibleTransforms: Record<EnterDirection, string> = {
    bottom: "translate-y-0",
    left: "translate-x-0",
    right: "translate-x-0",
  };

  const stateClasses = visible
    ? `opacity-100 ${visibleTransforms[enterFrom]}`
    : `opacity-0 ${hiddenTransforms[enterFrom]}`;

  return (
    <Component
      ref={setRef}
      className={`transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform] ${stateClasses} ${className}`}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      {children}
    </Component>
  );
}

"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

export type RevealVariant =
  | "up"
  | "fade"
  | "left"
  | "right"
  | "scale"
  | "clip"
  | "blur";

export type RevealDelay = "d1" | "d2" | "d3" | "d4" | "d5" | "d6";

type RevealProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  delay?: RevealDelay;
  variant?: RevealVariant;
  as?: T;
  once?: boolean;
  threshold?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export const Reveal = <T extends ElementType = "div">({
  children,
  className = "",
  delay,
  variant = "up",
  as,
  once = true,
  threshold = 0.14,
  ...rest
}: RevealProps<T>): React.ReactElement => {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove("in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const classes = ["reveal", `reveal--${variant}`, delay, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
};

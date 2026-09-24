"use client";

import {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  type HTMLAttributes,
  type CSSProperties,
} from "react";

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
    fontVariantNumeric: "tabular-nums",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

export type DecryptedTextProps = HTMLAttributes<HTMLSpanElement> & {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "inViewHover" | "click";
  clickMode?: "once" | "toggle";
};

const DEFAULT_CHARS = "0123456789ABCDEF0123456789XYZ";

export default function DecryptedText({
  text,
  speed = 35,
  maxIterations = 12,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = "",
  parentClassName = "",
  encryptedClassName = "text-accent font-bold opacity-90",
  animateOn = "inViewHover",
  style,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set(Array.from({ length: text.length }, (_, i) => i))
  );
  const [isDecrypted, setIsDecrypted] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedOnView = useRef(false);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join("");
    },
    [availableChars]
  );

  const triggerDecrypt = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    setIsAnimating(true);
    setIsDecrypted(false);

    const totalSteps = maxIterations;
    const len = text.length;

    intervalRef.current = setInterval(() => {
      iteration++;
      const progress = iteration / totalSteps;
      const charsToReveal = sequential ? Math.floor(progress * (len + 1)) : 0;

      const newRevealed = new Set<number>();
      for (let i = 0; i < len; i++) {
        if (sequential) {
          if (revealDirection === "start" && i < charsToReveal) newRevealed.add(i);
          else if (revealDirection === "end" && i >= len - charsToReveal) newRevealed.add(i);
          else if (revealDirection === "center") {
            const mid = Math.floor(len / 2);
            const dist = Math.abs(i - mid);
            if (dist <= charsToReveal / 2) newRevealed.add(i);
          }
        } else {
          if (Math.random() < progress) newRevealed.add(i);
        }
      }

      setRevealedIndices(newRevealed);
      setDisplayText(shuffleText(text, newRevealed));

      if (iteration >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsAnimating(false);
        setIsDecrypted(true);
        setDisplayText(text);
        setRevealedIndices(new Set(Array.from({ length: len }, (_, i) => i)));
      }
    }, speed);
  }, [text, maxIterations, speed, sequential, revealDirection, shuffleText]);

  /* Hover Handler */
  const handleMouseEnter = () => {
    if (animateOn === "hover" || animateOn === "inViewHover") {
      triggerDecrypt();
    }
  };

  /* Click Handler */
  const handleClick = () => {
    if (animateOn === "click") {
      triggerDecrypt();
    }
  };

  /* Intersection Observer for View Animation */
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedOnView.current) {
          hasAnimatedOnView.current = true;
          triggerDecrypt();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animateOn, triggerDecrypt]);

  const [prevText, setPrevText] = useState(text);
  if (text !== prevText) {
    setPrevText(text);
    setDisplayText(text);
    setRevealedIndices(new Set(Array.from({ length: text.length }, (_, i) => i)));
    setIsDecrypted(true);
  }

  const animateProps = {
    onMouseEnter: handleMouseEnter,
    onClick: handleClick,
  };

  return (
    <span
      ref={containerRef}
      className={`select-none cursor-default inline-flex flex-wrap items-center ${parentClassName}`.trim()}
      style={{ ...styles.wrapper, ...style }}
      {...animateProps}
      {...props}
    >
      <span style={styles.srOnly}>{text}</span>

      <span aria-hidden="true" className="inline-flex flex-wrap items-center">
        {displayText.split("").map((char, index) => {
          const isRevealed =
            revealedIndices.has(index) || (!isAnimating && isDecrypted);

          if (char === " ") {
            return (
              <span key={index} className="inline-block w-[0.28em]">
                {"\u00A0"}
              </span>
            );
          }

          return (
            <span
              key={index}
              className={`inline-block text-center font-mono tabular-nums ${
                isRevealed ? className : encryptedClassName
              }`.trim()}
              style={{ minWidth: "0.58em" }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}

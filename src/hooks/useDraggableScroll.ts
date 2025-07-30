import { useRef, useEffect } from "react";

export const useDraggableScroll = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mouseDown = (e: MouseEvent) => {
      isDown.current = true;
      el.classList.add("cursor-grabbing");
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const mouseLeave = () => {
      isDown.current = false;
      el.classList.remove("cursor-grabbing");
    };

    const mouseUp = () => {
      isDown.current = false;
      el.classList.remove("cursor-grabbing");
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      el.scrollLeft = scrollLeft.current - walk;
    };

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("mouseleave", mouseLeave);
    el.addEventListener("mouseup", mouseUp);
    el.addEventListener("mousemove", mouseMove);

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("mouseleave", mouseLeave);
      el.removeEventListener("mouseup", mouseUp);
      el.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return { ref };
};

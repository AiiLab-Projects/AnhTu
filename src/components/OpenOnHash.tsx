"use client";

import { useEffect } from "react";

// Mở phần đang gập khi em bấm vào mục tương ứng trong thanh các phần của bài (hoặc vào trang với #phần).
export function OpenOnHash() {
  useEffect(() => {
    function open() {
      const target = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
      if (target instanceof HTMLDetailsElement) target.open = true;
    }
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}

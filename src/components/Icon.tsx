import type { SVGProps } from "react";

export type IconName =
  | "home" | "book" | "pencil" | "trophy" | "star" | "mail"
  | "sparkles" | "speaker" | "speaker-off" | "play" | "check" | "check-circle"
  | "arrow-right" | "arrow-left" | "chevron-right" | "flame"
  | "target" | "palette" | "medal" | "rocket" | "compass"
  | "map" | "lightbulb" | "heart" | "phone" | "chat"
  | "clock" | "user" | "x" | "warning" | "sun" | "backpack"
  | "pin" | "info" | "lock" | "music" | "cat" | "balloon" | "wave"
  | "menu";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 20, strokeWidth = 2.2, ...rest }: IconProps) {
  const common = {
    width: size, height: size,
    viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
  switch (name) {
    case "home": return (<svg {...common}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>);
    case "book": return (<svg {...common}><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z" /><path d="M8 7h7M8 11h7" /></svg>);
    case "pencil": return (<svg {...common}><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="M14 6l4 4" /></svg>);
    case "trophy": return (<svg {...common}><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" /><path d="M4 5h4v3a3 3 0 0 1-3 3H4V5ZM20 5h-4v3a3 3 0 0 0 3 3h1V5Z" /><path d="M10 14h4v3h-4z" /><path d="M8 20h8" /><path d="M10 17v3M14 17v3" /></svg>);
    case "star": return (<svg {...common} fill={rest.fill ?? "none"}><path d="m12 3 2.6 5.6 6.1.6-4.5 4.2 1.3 6-5.5-3.1-5.5 3.1 1.3-6L3.3 9.2l6.1-.6L12 3Z" /></svg>);
    case "mail": return (<svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
    case "sparkles": return (<svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>);
    case "speaker": return (<svg {...common}><path d="M4 10v4a1 1 0 0 0 1 1h3l4 3V6L8 9H5a1 1 0 0 0-1 1Z" /><path d="M16 8a5 5 0 0 1 0 8" /><path d="M19 5a9 9 0 0 1 0 14" /></svg>);
    case "speaker-off": return (<svg {...common}><path d="M4 10v4a1 1 0 0 0 1 1h3l4 3V6L8 9H5a1 1 0 0 0-1 1Z" /><path d="m16 10 5 5M21 10l-5 5" /></svg>);
    case "menu": return (<svg {...common}><path d="M4 6h16M4 12h16M4 18h16" /></svg>);
    case "play": return (<svg {...common}><path d="M7 5v14l12-7-12-7Z" /></svg>);
    case "check": return (<svg {...common}><path d="m5 12 5 5 9-11" /></svg>);
    case "check-circle": return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>);
    case "arrow-right": return (<svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>);
    case "arrow-left": return (<svg {...common}><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>);
    case "chevron-right": return (<svg {...common}><path d="m9 6 6 6-6 6" /></svg>);
    case "flame": return (<svg {...common}><path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4-1 3 2 3 2 1 0-2 0-5 0-5Z" /></svg>);
    case "target": return (<svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>);
    case "palette": return (<svg {...common}><path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 1.5-3.3 1.5 1.5 0 0 1 1.1-2.5h2a4 4 0 0 0 4-4 9 9 0 0 0-8.6-8.2Z" /><circle cx="7.5" cy="11" r="1" fill="currentColor" /><circle cx="10" cy="7" r="1" fill="currentColor" /><circle cx="15" cy="7.5" r="1" fill="currentColor" /><circle cx="17" cy="11.5" r="1" fill="currentColor" /></svg>);
    case "medal": return (<svg {...common}><circle cx="12" cy="14" r="6" /><path d="M8 5h8l-2 6M8 5l2 6M8 5 6 2M16 5l2-3" /></svg>);
    case "rocket": return (<svg {...common}><path d="M14 4c3 0 6 3 6 6l-7 7-4-4 5-9Z" /><path d="M9 13 6 16c-1 1 0 3 1 3l3-3" /><path d="M15 9h.01" /></svg>);
    case "compass": return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="m15 9-2 5-5 2 2-5 5-2Z" /></svg>);
    case "map": return (<svg {...common}><path d="M3 6v15l6-3 6 3 6-3V3l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></svg>);
    case "lightbulb": return (<svg {...common}><path d="M9 18h6M10 21h4" /><path d="M8 14a5 5 0 1 1 8 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3Z" /></svg>);
    case "heart": return (<svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10Z" /></svg>);
    case "phone": return (<svg {...common}><path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>);
    case "chat": return (<svg {...common}><path d="M4 5h16v11H8l-4 4V5Z" /></svg>);
    case "clock": return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    case "user": return (<svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>);
    case "x": return (<svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>);
    case "warning": return (<svg {...common}><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></svg>);
    case "sun": return (<svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>);
    case "backpack": return (<svg {...common}><path d="M6 10a6 6 0 0 1 12 0v10H6V10Z" /><path d="M10 4h4v3h-4z" /><path d="M6 14h12" /><path d="M10 17h4" /></svg>);
    case "pin": return (<svg {...common}><path d="M12 22s7-7 7-13a7 7 0 1 0-14 0c0 6 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></svg>);
    case "info": return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v5h1" /></svg>);
    case "lock": return (<svg {...common}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);
    case "music": return (<svg {...common}><path d="M9 18V6l10-2v12" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="16" r="2" /></svg>);
    case "cat": return (<svg {...common}><path d="M5 7v6a6 6 0 0 0 12 0V7l-3 2h-6L5 7Z" /><circle cx="9" cy="12" r=".8" fill="currentColor" stroke="none" /><circle cx="13" cy="12" r=".8" fill="currentColor" stroke="none" /><path d="M11 15h.01" /></svg>);
    case "balloon": return (<svg {...common}><path d="M12 3a5 5 0 0 1 5 5c0 3.5-2.5 6-5 7-2.5-1-5-3.5-5-7a5 5 0 0 1 5-5Z" /><path d="M11 15l1 2h.01l-1 3" /></svg>);
    case "wave": return (<svg {...common}><path d="M4 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" /><path d="M4 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" /></svg>);
  }
}

type TeacherAvatarProps = {
  className?: string;
  title?: string;
};

export function TeacherAvatar({
  className = "",
  title = "Minh họa anime Cô Tú",
}: TeacherAvatarProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 360"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFEAF6" />
          <stop offset="1" stopColor="#FFDCA8" />
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6A3D37" />
          <stop offset="1" stopColor="#9F5B44" />
        </linearGradient>
        <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7457E9" />
          <stop offset="1" stopColor="#E84BA5" />
        </linearGradient>
      </defs>
      <circle cx="180" cy="180" r="180" fill="url(#avatarBg)" />
      <circle cx="64" cy="83" r="24" fill="#fff" opacity=".42" />
      <circle cx="304" cy="105" r="15" fill="#fff" opacity=".56" />
      <path d="M50 335c24-75 80-109 130-109s106 34 130 109" fill="url(#shirt)" />
      <path d="M92 183c-8-99 29-146 88-146 67 0 99 48 88 146l-7 103H99z" fill="url(#hair)" />
      <path d="M126 242c-9 25-17 45-32 72 44 39 122 44 173-2-16-22-27-49-33-73z" fill="#704038" />
      <path d="M154 221h52v54c-14 16-37 16-52 0z" fill="#F9C9A7" />
      <path d="M110 142c0-54 28-85 71-85 44 0 72 31 72 85v37c0 52-31 90-73 90-41 0-70-38-70-90z" fill="#FFD9B7" />
      <path d="M111 143c13-7 23-22 25-41 26 19 78 28 115 12-5-47-31-77-70-77-44 0-76 35-70 106z" fill="url(#hair)" />
      <path d="M114 119c-12 38-7 90 9 124-23-14-30-43-28-89 1-37 16-76 44-96-10 16-19 40-25 61z" fill="#73443C" />
      <path d="M250 114c15 42 10 95-7 130 25-15 30-48 25-91-4-37-22-70-49-89 14 17 25 33 31 50z" fill="#73443C" />
      <ellipse cx="143" cy="175" rx="7" ry="10" fill="#493343" />
      <ellipse cx="218" cy="175" rx="7" ry="10" fill="#493343" />
      <circle cx="145" cy="172" r="2.5" fill="#fff" />
      <circle cx="220" cy="172" r="2.5" fill="#fff" />
      <path d="M132 155c9-7 21-7 30-2M202 153c9-5 21-5 30 2" fill="none" stroke="#69443F" strokeWidth="5" strokeLinecap="round" />
      <path d="M169 207c7 5 15 5 22 0" fill="none" stroke="#E5967B" strokeWidth="4" strokeLinecap="round" />
      <path d="M163 228c10 12 28 13 38 0" fill="none" stroke="#A84F5E" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="127" cy="203" rx="17" ry="9" fill="#F7A7A8" opacity=".48" />
      <ellipse cx="234" cy="203" rx="17" ry="9" fill="#F7A7A8" opacity=".48" />
      <rect x="113" y="153" width="53" height="39" rx="18" fill="none" stroke="#6D4B78" strokeWidth="5" />
      <rect x="194" y="153" width="53" height="39" rx="18" fill="none" stroke="#6D4B78" strokeWidth="5" />
      <path d="M166 169c9-6 18-6 28 0M113 166l-11-4M247 166l11-4" fill="none" stroke="#6D4B78" strokeWidth="5" strokeLinecap="round" />
      <path d="M158 270l22 25 22-25 14 16-36 40-36-40z" fill="#fff" />
      <path d="M50 335c24-75 80-109 130-109s106 34 130 109" fill="none" stroke="#fff" strokeWidth="7" opacity=".28" />
      <path d="M292 50l4 11 11 4-11 4-4 11-4-11-11-4 11-4z" fill="#fff" />
    </svg>
  );
}

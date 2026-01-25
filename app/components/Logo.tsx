"use client";

type Props = {
  className?: string;
  size?: number;
};

export function Logo({ className = "", size = 28 }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M12 2.5c-3.5 3.8-6 7-6 10.3 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-3.34-2.52-6.46-7-10.3Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M12 2.5c-3.5 3.8-6 7-6 10.3 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-3.34-2.52-6.46-7-10.3Z" />
      <path d="M8.2 13.2c1.3 1.2 2.8 1.2 4.1 0 1.3-1.2 2.8-1.2 4.1 0" />
    </svg>
  );
}
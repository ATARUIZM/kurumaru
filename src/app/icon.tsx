import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#2563eb",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* car body */}
          <path
            d="M5 11L7 6h10l2 5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2"
            y="11"
            width="20"
            height="6"
            rx="2"
            fill="white"
            opacity="0.95"
          />
          {/* wheels */}
          <circle cx="7" cy="17" r="2" fill="#2563eb" stroke="white" strokeWidth="1.5" />
          <circle cx="17" cy="17" r="2" fill="#2563eb" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
    ),
    size
  );
}

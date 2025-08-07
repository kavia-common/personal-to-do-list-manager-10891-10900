import React from "react";

/**
 * PUBLIC_INTERFACE
 * Generic SVG icon component for use in todo app, with different glyph options.
 * @param {string} name One of: edit, delete, check, back.
 * @param {string|number} size
 * @param {string} color
 */
export function Icon({ name, size = 24, color = "#8b8787" }) {
  switch (name) {
    case "edit":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Edit" fill="none">
          <path d="M15.13 5.66l3.21 3.21M4 20h4.93l9.29-9.29a1.75 1.75 0 0 0-2.47-2.47L6.46 17.53V20z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "delete":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Delete" fill="none">
          <rect x="3" y="6" width="18" height="15" rx="2" stroke={color} strokeWidth="2"/>
          <line x1="9" y1="10" x2="9" y2="17" stroke={color} strokeWidth="2"/>
          <line x1="15" y1="10" x2="15" y2="17" stroke={color} strokeWidth="2"/>
          <line x1="5" y1="6" x2="19" y2="6" stroke={color} strokeWidth="2"/>
          <line x1="10" y1="3" x2="14" y2="3" stroke={color} strokeWidth="2"/>
        </svg>
      );
    case "check":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Mark as complete" fill="none">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
          <path d="M16 8l-5 8-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      );
    case "back":
      return (
        <svg width={size} height={size} viewBox="0 0 25 25" aria-label="Back" fill="none">
          <polyline points="17,5 7,12.5 17,20" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
}

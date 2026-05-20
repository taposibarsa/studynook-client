"use client";

import Image from "next/image";

/**
 * Uses next/image for local paths; plain img for external URLs
 * so any room/avatar URL works without updating next.config.
 */
export default function ExternalImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  sizes,
}) {
  if (!src) return null;

  const isLocal = src.startsWith("/");

  if (isLocal) {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt || ""}
          fill
          className={className}
          priority={priority}
          sizes={sizes}
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={width || 400}
        height={height || 300}
        className={className}
        priority={priority}
      />
    );
  }

  if (fill) {
    return (
      <img
        src={src}
        alt={alt || ""}
        className={className}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}

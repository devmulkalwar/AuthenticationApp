import React from "react";
import { cn } from "@/lib/utils"; // Ensure you have this utility for className merging

const Avatar = React.forwardRef(({ src, alt, fallback, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {src && <img src={src} alt={alt} className="aspect-square h-full w-full" />}
      {!src && fallback && (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {fallback}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));

AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
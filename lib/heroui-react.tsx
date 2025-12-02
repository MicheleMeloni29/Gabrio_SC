"use client";

import NextLink from "next/link";
import { ComponentProps, ReactNode, forwardRef } from "react";

const cn = (...classes: Array<string | null | undefined | false>) =>
  classes.filter(Boolean).join(" ");

type NavbarProps = ComponentProps<"nav"> & {
  isBordered?: boolean;
  disableAnimation?: boolean;
};

export function Navbar({
  className,
  children,
  isBordered,
  ...props
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-4 rounded-3xl px-4 py-3",
        isBordered && "border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

type NavbarContentProps = ComponentProps<"div"> & {
  justify?: "start" | "center" | "end";
};

const justifyClasses: Record<
  NonNullable<NavbarContentProps["justify"]>,
  string
> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

export function NavbarContent({
  className,
  justify = "start",
  children,
  ...props
}: NavbarContentProps) {
  return (
    <div
      className={cn("flex items-center gap-3", justifyClasses[justify], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function NavbarBrand({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-2", className)} {...props} />;
}

export function NavbarItem({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("flex items-center", className)} {...props} />;
}

type NavbarMenuProps = ComponentProps<"div"> & {
  isOpen?: boolean;
};

export function NavbarMenu({
  className,
  children,
  isOpen = false,
  ...props
}: NavbarMenuProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-black/60 p-4",
        !isOpen && "hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function NavbarMenuItem({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-xl bg-white/5 text-sm font-medium", className)}
      {...props}
    />
  );
}

type ToggleProps = ComponentProps<"button"> & {
  isOpen?: boolean;
};

export function NavbarMenuToggle({
  className,
  isOpen,
  children,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className={cn(
        "rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em]",
        className
      )}
      {...props}
    >
      {children ?? (isOpen ? "Chiudi" : "Menu")}
    </button>
  );
}

type LinkProps = ComponentProps<typeof NextLink> & {
  color?: "foreground" | "warning" | "danger";
};

const linkColors: Record<NonNullable<LinkProps["color"]>, string> = {
  foreground: "text-white/90",
  warning: "text-amber-300",
  danger: "text-red-400",
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, color = "foreground", ...props }, ref) => (
    <NextLink
      ref={ref}
      className={cn("transition hover:text-white", linkColors[color], className)}
      {...props}
    />
  )
);
Link.displayName = "Link";

type BaseButtonProps = {
  color?: "primary" | "warning";
  variant?: "solid" | "flat";
  className?: string;
  children?: ReactNode;
};

type NativeButtonProps = BaseButtonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    as?: undefined;
    href?: undefined;
  };

type LinkButtonProps = BaseButtonProps &
  Omit<ComponentProps<typeof NextLink>, "className" | "children"> & {
    as: typeof NextLink;
    href: ComponentProps<typeof NextLink>["href"];
  };

type ButtonProps = NativeButtonProps | LinkButtonProps;

export function Button(props: ButtonProps) {
  const { className, color = "primary", variant = "solid", children } = props;
  const palette =
    color === "warning"
      ? "bg-amber-400 text-black hover:bg-amber-300"
      : "bg-[#d6b15b] text-black hover:bg-[#f1d58e]";
  const flatPalette =
    color === "warning"
      ? "bg-amber-400/15 text-amber-200 hover:bg-amber-400/30"
      : "bg-white/10 text-white hover:bg-white/20";
  if (!props.as) {
    const { as, href, ...buttonProps } = props as NativeButtonProps;
    return (
      <button
        className={cn(
          "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]",
          variant === "flat" ? flatPalette : palette,
          className
        )}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }

  const { as: Component, href, ...linkProps } = props as LinkButtonProps;
  return (
    <Component
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]",
        variant === "flat" ? flatPalette : palette,
        className
      )}
      {...linkProps}
    >
      {children}
    </Component>
  );
}

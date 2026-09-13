import Link from "next/link";

type Variant = "dark" | "light" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  dark: "bg-pws-green text-white hover:bg-pws-teal",
  light: "bg-white text-pws-green hover:bg-off-white",
  outline: "border border-line bg-transparent text-charcoal hover:border-pws-sage",
  ghost: "border border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  onDark = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`font-semibold underline decoration-1 underline-offset-4 transition-colors ${
        onDark
          ? "text-pws-sage decoration-pws-sage/40 hover:text-white hover:decoration-white"
          : "text-pws-green decoration-pws-green/30 hover:text-pws-teal hover:decoration-pws-teal"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

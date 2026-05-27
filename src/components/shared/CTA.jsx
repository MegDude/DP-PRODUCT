import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * CTA — Unified call-to-action button component
 * Variants: primary, secondary, tertiary
 * Handles both Link and anchor for internal/external routes
 */
export default function CTA({
  label,
  href = "#",
  variant = "primary",
  size = "standard",
  icon = true,
  external = false,
  onClick,
  disabled = false,
  ...props
}) {
  const variants = {
    primary: "bg-[#0B1F33] text-white hover:bg-[#132238] shadow-[0_14px_34px_rgba(11,31,51,0.04)]",
    secondary: "bg-white border border-[#0B1F33]/10 text-[#0B1F33] hover:border-[#0B1F33]/20 hover:bg-[#F7F8FB]",
    tertiary: "text-[#0B1F33] hover:text-[#B38F4F]",
  };

  const sizes = {
    small: "h-9 px-4 text-[12px]",
    standard: "h-10 px-5 text-[13px]",
    large: "h-10 px-5 text-[13px]",
  };

  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  const classes = `inline-flex items-center justify-center gap-2 rounded-[6px] font-medium transition-all duration-300 ${variantClass} ${sizeClass} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  }`;

  const content = (
    <>
      {label}
      {icon && <ArrowRight className="w-4 h-4" />}
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto")) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={!disabled ? { y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <Link to={href} className={classes} onClick={onClick} {...props}>
        {content}
      </Link>
    </motion.div>
  );
}

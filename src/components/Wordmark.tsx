/**
 * Typographic wordmark. Set in the display face rather than drawn, so it stays
 * crisp at any size and needs no asset pipeline. The ember rule under "EDGE" is
 * the mark: the edge is literally drawn.
 */
export function Wordmark({
  size = "sm",
  className,
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const scale = size === "lg" ? "text-3xl sm:text-4xl" : "text-lg";

  return (
    <span
      className={["inline-flex items-baseline gap-1.5 font-display font-bold uppercase leading-none tracking-tight", scale, className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="text-bone">Your</span>
      <span className="relative text-bone">
        Gym
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[3px] w-full bg-ember"
        />
      </span>
    </span>
  );
}

export function FloatingElements() {
  return (
    <>
      <div
        data-float="dot1"
        className="fixed top-20 left-5 md:left-10 w-1 h-1 md:w-2 md:h-2 bg-white/30 rounded-full z-10"
        style={{ opacity: 0.3 }}
      />

      <div
        data-float="dot2"
        className="fixed top-32 md:top-40 right-10 md:right-20 w-1 h-1 bg-white/40 rounded-full z-10"
        style={{ opacity: 0.4 }}
      />
    </>
  );
}

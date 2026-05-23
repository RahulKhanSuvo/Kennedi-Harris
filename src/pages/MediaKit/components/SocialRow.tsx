export default function SocialRow() {
  const socials = [
    {
      id: 1,
      name: "INSTAGRAM",
      handle: "@kennediharrishoops",
      href: "https://instagram.com/kennediharrishoops",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "TIKTOK",
      handle: "@kennediharrishoops",
      href: "https://tiktok.com/@KennediHarrisHoops",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "X (TWITTER)",
      handle: "@kennedihoops",
      href: "https://x.com/kennedihoops",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "YOUTUBE",
      handle: "KennediHarrisHoops",
      href: "https://youtube.com/@KennediHarrisHoops",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-kh-dark border-t border-white/5 relative overflow-hidden">
      {/* Background element */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[200px] bg-kh-pink/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left column */}
        <div className="flex flex-col gap-2 text-center lg:text-left shrink-0">
          <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-xs">
            SOCIAL MEDIA
          </span>
          <p className="text-gray-400 text-xs md:text-sm font-sans font-light leading-relaxed">
            Follow Kennedi's journey on and off the court.
          </p>
        </div>

        {/* Right columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {socials.map((social) => {
            const IconComponent = social.Icon;
            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 border border-white/5 rounded-md bg-kh-dark-2/40 hover:border-kh-pink/30 hover:bg-white/5 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-full border border-kh-pink bg-black/40 flex items-center justify-center text-kh-pink group-hover:bg-kh-pink group-hover:text-white transition-colors duration-300 shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-condensed font-black text-[10px] tracking-wider text-gray-400 uppercase">
                    {social.name}
                  </span>
                  <span className="text-white text-xs font-semibold truncate group-hover:text-kh-pink transition-colors mt-0.5">
                    {social.handle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

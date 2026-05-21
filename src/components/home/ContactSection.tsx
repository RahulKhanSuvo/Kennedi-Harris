import { MailIcon, ChevronDownIcon } from "./icons";

export default function ContactSection() {
  return (
    <>
      <div className="section-divider" />
      <section id="contact" className="bg-kh-dark py-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div
            style={{
              background: "rgba(232,23,106,0.07)",
              border: "1px solid rgba(232,23,106,0.2)",
              borderRadius: "6px",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {/* Icon + text */}
            <div className="flex items-start gap-4 flex-1 min-w-[200px]">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(232,23,106,0.15)",
                  border: "1px solid rgba(232,23,106,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#E8176A",
                  flexShrink: 0,
                }}
              >
                <MailIcon size={18} />
              </div>
              <div>
                <p className="font-condensed font-black text-white text-base uppercase tracking-wider">
                  RECRUITING, MEDIA &amp; BRAND INQUIRIES
                </p>
                <p className="text-white/50 text-xs mt-1">
                  Let's connect! Fill out the form and we'll be in touch.
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              id="contact-form"
              className="flex items-center gap-2 flex-wrap"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                id="contact-name"
                type="text"
                placeholder="Name"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  padding: "0.55rem 0.9rem",
                  color: "#fff",
                  fontSize: "0.8rem",
                  outline: "none",
                  minWidth: "130px",
                }}
              />
              <input
                id="contact-email"
                type="email"
                placeholder="Email"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  padding: "0.55rem 0.9rem",
                  color: "#fff",
                  fontSize: "0.8rem",
                  outline: "none",
                  minWidth: "150px",
                }}
              />
              <div style={{ position: "relative" }}>
                <select
                  id="contact-inquiry-type"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    padding: "0.55rem 2rem 0.55rem 0.9rem",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.8rem",
                    outline: "none",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Inquiry Type</option>
                  <option value="recruiting">Recruiting</option>
                  <option value="media">Media</option>
                  <option value="brand">Brand Partnership</option>
                  <option value="nil">NIL</option>
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.4)",
                    pointerEvents: "none",
                  }}
                >
                  <ChevronDownIcon />
                </span>
              </div>
              <button
                id="btn-send-message"
                type="submit"
                className="btn-primary"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

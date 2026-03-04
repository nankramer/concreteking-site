"use client";

import { useState, useEffect } from "react";

// ============================================================
// CONFIG — Edit these for the client
// ============================================================
const CONFIG = {
  business: {
    name: "ConcreteKing",
    tagline: "Concrete & Roofing Specialists",
    phone: "+27 XX XXX XXXX",
    whatsapp: "27XXXXXXXXXX",
    email: "info@concreteking.co.za",
    address: "Durban, KwaZulu-Natal",
    established: "2015",
  },
  services: [
    {
      id: "concrete-driveways",
      title: "Concrete Driveways",
      description:
        "Precision-poured, reinforced driveways built to handle KZN's climate. Exposed aggregate, brushed, or polished finishes.",
      icon: "◧",
    },
    {
      id: "concrete-slabs",
      title: "Concrete Slabs & Foundations",
      description:
        "Structural slabs for residential and commercial. Engineered sub-base preparation, steel reinforcement, and power-floated finishes.",
      icon: "⊞",
    },
    {
      id: "roof-construction",
      title: "Roof Construction",
      description:
        "Full roof builds from truss erection to final tile or sheet installation. IBR, corrugated, Harvey tile, and concrete tile systems.",
      icon: "⌂",
    },
    {
      id: "roof-repairs",
      title: "Roof Repairs & Waterproofing",
      description:
        "Leak detection, tile replacement, flashing repairs, and torch-on waterproofing for flat and pitched roofs.",
      icon: "◉",
    },
    {
      id: "retaining-walls",
      title: "Retaining Walls",
      description:
        "Gravity walls, reinforced concrete cantilever walls, and segmental block systems. Engineered for KZN's slopes and soil conditions.",
      icon: "▥",
    },
    {
      id: "general-construction",
      title: "General Construction",
      description:
        "Extensions, renovations, boundary walls, paving, and structural alterations. NHBRC-aligned workmanship.",
      icon: "⊡",
    },
  ],
  projects: [
    { id: 1, title: "Umhlanga Ridge — 280m² Exposed Aggregate Driveway", category: "concrete-driveways", status: "Completed" },
    { id: 2, title: "Hillcrest — Full Roof Replacement, Harvey Tile", category: "roof-construction", status: "Completed" },
    { id: 3, title: "Ballito Estate — Reinforced Slab + Retaining Wall", category: "concrete-slabs", status: "In Progress" },
    { id: 4, title: "Pinetown Commercial — 1,200m² Warehouse Slab", category: "concrete-slabs", status: "Completed" },
    { id: 5, title: "Westville — Torch-On Waterproofing, Flat Roof", category: "roof-repairs", status: "Completed" },
    { id: 6, title: "Durban North — 45m Cantilever Retaining Wall", category: "retaining-walls", status: "Completed" },
  ],
  credentials: [
    "Master Builders KZN Member",
    "NHBRC Registered",
    "Fully Insured — R5M Public Liability",
    "CIDB Graded",
  ],
};

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
];

// ============================================================
// COLORS
// ============================================================
const C = {
  black: "#0A0A0A",
  charcoal: "#1A1A1A",
  dark: "#2A2A2A",
  mid: "#666666",
  light: "#E8E8E8",
  off: "#F5F5F0",
  white: "#FFFFFF",
  accent: "#D4A017",
  accentDark: "#B8860B",
  green: "#27AE60",
  wa: "#25D366",
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: C.white,
        padding: 40,
        borderLeft: `3px solid ${hovered ? C.accent : "transparent"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 32, marginBottom: 20, display: "block", color: C.accent }}>
        {service.icon}
      </span>
      <h3
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 24,
          letterSpacing: "0.04em",
          marginBottom: 12,
          color: C.charcoal,
        }}
      >
        {service.title}
      </h3>
      <p style={{ fontSize: 14, color: C.mid, lineHeight: 1.7, marginBottom: 20 }}>
        {service.description}
      </p>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.accent,
        }}
      >
        View Details →
      </span>
    </div>
  );
}

function ProjectCard({ project, image }) {
  const [hovered, setHovered] = useState(false);
  const cat = CONFIG.services.find((s) => s.id === project.category);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" }}
    >
      <img
        src={image}
        alt={project.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 28,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.accent,
            marginBottom: 8,
          }}
        >
          {cat?.title || project.category}
        </span>
        <h3
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: 22,
            color: C.white,
            letterSpacing: "0.03em",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            marginTop: 12,
            backgroundColor: project.status === "In Progress" ? C.accent : C.green,
            color: project.status === "In Progress" ? C.black : C.white,
            alignSelf: "flex-start",
          }}
        >
          {project.status}
        </span>
      </div>
    </div>
  );
}

function StickyQuoteBox() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log("Quote request:", form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    }, 3000);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    fontSize: 13,
    border: `1px solid ${C.light}`,
    backgroundColor: C.off,
    marginBottom: 10,
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box",
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 999,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          backgroundColor: C.accent,
          color: C.black,
          padding: "20px 14px",
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: 16,
          letterSpacing: "0.12em",
          cursor: "pointer",
          border: "none",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
        }}
      >
        GET A FREE QUOTE
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        width: 320,
        backgroundColor: C.white,
        boxShadow: "0 16px 64px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: C.charcoal,
          color: C.white,
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: 18,
            letterSpacing: "0.06em",
          }}
        >
          Quick Quote
        </span>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: C.mid,
            fontSize: 20,
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
      <div style={{ padding: 20 }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                letterSpacing: "0.04em",
              }}
            >
              Quote Request Sent
            </div>
            <p style={{ fontSize: 13, color: C.mid, marginTop: 8 }}>
              We&apos;ll get back to you within 2 hours.
            </p>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your Name *"
              style={inputStyle}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              style={inputStyle}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              style={inputStyle}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select
              style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option value="">Select Service *</option>
              {CONFIG.services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Brief project description..."
              style={{ ...inputStyle, resize: "vertical", minHeight: 70 }}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                backgroundColor: C.accent,
                color: C.black,
                padding: 14,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Request Free Quote
            </button>
            <p style={{ fontSize: 11, color: C.mid, textAlign: "center", marginTop: 10 }}>
              Response within 2 hours · No obligation
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function StickyWhatsApp() {
  const url = `https://wa.me/${CONFIG.business.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to enquire about your concrete/roofing services."
  )}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: C.wa,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 998,
        boxShadow: "0 4px 24px rgba(37,211,102,0.4)",
      }}
    >
      <WhatsAppIcon />
    </a>
  );
}

// ============================================================
// PAGE
// ============================================================
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? CONFIG.projects
      : CONFIG.projects.filter((p) => p.category === activeFilter);

  const bebas = "'Bebas Neue', Impact, sans-serif";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.charcoal, backgroundColor: C.off }}>
      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.dark}`,
          padding: "0 24px",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.3)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: bebas,
              fontSize: 28,
              color: C.white,
              letterSpacing: "0.08em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: C.accent }}>■</span> {CONFIG.business.name}
          </a>

          {/* Desktop links */}
          <ul
            className="desktop-nav"
            style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {["Services", "Projects", "Reviews", "Contact"].map((label) => (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  style={{
                    color: C.light,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`tel:${CONFIG.business.phone}`}
                style={{
                  backgroundColor: C.accent,
                  color: C.black,
                  padding: "10px 24px",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Call Now
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: C.white,
              fontSize: 28,
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            backgroundColor: "rgba(10,10,10,0.98)",
            padding: 24,
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {["Services", "Projects", "Reviews", "Contact"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: C.light, textDecoration: "none", fontSize: 16, fontWeight: 500 }}
            >
              {label}
            </a>
          ))}
          <a
            href={`tel:${CONFIG.business.phone}`}
            style={{
              backgroundColor: C.accent,
              color: C.black,
              padding: "12px 0",
              textAlign: "center",
              fontWeight: 700,
              textDecoration: "none",
              textTransform: "uppercase",
              fontSize: 14,
            }}
          >
            Call Now
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: C.black,
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Background photo grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: 2,
            opacity: 0.4,
          }}
        >
          {PLACEHOLDER_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading={i < 2 ? "eager" : "lazy"}
            />
          ))}
        </div>
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.3) 100%)",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px 80px",
            width: "100%",
          }}
        >
          <span
            style={{
              display: "inline-block",
              backgroundColor: C.accent,
              color: C.black,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "6px 16px",
              marginBottom: 24,
            }}
          >
            Durban&apos;s Trusted Contractor
          </span>
          <h1
            style={{
              fontFamily: bebas,
              fontSize: "clamp(48px, 8vw, 96px)",
              color: C.white,
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              marginBottom: 24,
              maxWidth: 800,
            }}
          >
            Concrete Work
            <br />
            <span style={{ color: C.accent }}>&amp;</span> Roofing
            <br />
            Done Right
          </h1>
          <p
            style={{
              fontSize: 18,
              color: C.light,
              maxWidth: 560,
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            From reinforced driveways to full roof builds — we deliver structural quality that
            lasts decades. Serving KZN homeowners, developers, and commercial clients since{" "}
            {CONFIG.business.established}.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              style={{
                backgroundColor: C.accent,
                color: C.black,
                padding: "16px 40px",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              Get a Free Quote
            </button>
            <a
              href="#projects"
              style={{
                color: C.white,
                padding: "16px 40px",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: `1px solid ${C.mid}`,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              View Our Work
            </a>
          </div>
          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 60,
              paddingTop: 32,
              borderTop: `1px solid ${C.dark}`,
              flexWrap: "wrap",
            }}
          >
            {[
              { n: "250+", l: "Projects Completed" },
              { n: "10+", l: "Years Experience" },
              { n: "4.9", l: "Google Rating" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: bebas, fontSize: 48, color: C.accent, lineHeight: 1 }}>
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.mid,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS BAR ── */}
      <div style={{ backgroundColor: C.charcoal, padding: "40px 24px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          {CONFIG.credentials.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: C.light,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: C.accent,
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.accent,
            marginBottom: 12,
          }}
        >
          What We Do
        </div>
        <h2
          style={{
            fontFamily: bebas,
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            marginBottom: 16,
          }}
        >
          Our Services
        </h2>
        <p style={{ fontSize: 16, color: C.mid, maxWidth: 600, lineHeight: 1.6, marginBottom: 60 }}>
          Specialist concrete and roofing services for residential, commercial, and industrial
          clients across KwaZulu-Natal.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 2,
          }}
        >
          {CONFIG.services.map((s, i) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ backgroundColor: C.charcoal }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.accent,
              marginBottom: 12,
            }}
          >
            Our Work
          </div>
          <h2
            style={{
              fontFamily: bebas,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              marginBottom: 16,
              color: C.white,
            }}
          >
            Recent Projects
          </h2>
          <p style={{ fontSize: 16, color: C.mid, maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
            Real results on real sites. Every image is from our portfolio — no stock photos.
          </p>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
            {[{ id: "all", label: "All" }, ...CONFIG.services.map((s) => ({ id: s.id, label: s.title }))].map(
              (f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    padding: "8px 20px",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    border: `1px solid ${activeFilter === f.id ? C.accent : C.dark}`,
                    backgroundColor: activeFilter === f.id ? C.accent : "transparent",
                    color: activeFilter === f.id ? C.black : C.mid,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {f.label}
                </button>
              )
            )}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: 16,
            }}
          >
            {filteredProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                image={PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.accent,
            marginBottom: 12,
          }}
        >
          Client Reviews
        </div>
        <h2
          style={{
            fontFamily: bebas,
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            marginBottom: 16,
          }}
        >
          What Our Clients Say
        </h2>
        <p style={{ fontSize: 16, color: C.mid, maxWidth: 600, lineHeight: 1.6, marginBottom: 60 }}>
          We don&apos;t just promise quality — our clients confirm it.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              text: "Exceptional quality on our driveway. The team was professional from day one, finished ahead of schedule, and the exposed aggregate finish is stunning.",
              author: "James van der Merwe",
              role: "Homeowner, Umhlanga",
            },
            {
              text: "We had a major roof leak that three other contractors couldn't fix. These guys diagnosed it in an hour and had it sealed permanently. Genuine expertise.",
              author: "Priya Naidoo",
              role: "Property Manager, Westville",
            },
            {
              text: "Our warehouse slab was completed on time and to spec — 1,200 square metres with zero defects. Their attention to levels and finishing was impressive.",
              author: "David Gillespie",
              role: "Director, Pinetown Industrial",
            },
          ].map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: C.white,
                padding: 36,
                borderTop: `3px solid ${C.accent}`,
              }}
            >
              <div style={{ color: C.accent, fontSize: 16, letterSpacing: 2, marginBottom: 16 }}>
                ★★★★★
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: C.charcoal,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: 20,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.charcoal }}>{t.author}</div>
              <div style={{ fontSize: 12, color: C.mid }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ backgroundColor: C.accent, padding: "80px 24px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: bebas,
            fontSize: "clamp(36px, 5vw, 56px)",
            color: C.black,
            letterSpacing: "0.02em",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Ready to Start Your Project?
        </h2>
        <p
          style={{
            fontSize: 16,
            color: C.charcoal,
            maxWidth: 500,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Get a detailed, no-obligation quote within 2 hours. We&apos;ll come to your site, assess
          the scope, and give you an honest price.
        </p>
        <button
          style={{
            backgroundColor: C.black,
            color: C.white,
            padding: "16px 48px",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
          }}
        >
          Get Your Free Quote
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{ backgroundColor: C.black, color: C.mid, padding: "60px 24px 32px" }}>
        <div
          className="footer-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: bebas,
                fontSize: 24,
                color: C.white,
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              <span style={{ color: C.accent }}>■</span> {CONFIG.business.name}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7 }}>
              {CONFIG.business.tagline}. Professional concrete and roofing contractor serving Durban
              and KwaZulu-Natal since {CONFIG.business.established}. Master Builders KZN member.
              Fully insured.
            </p>
          </div>
          <div>
            <h4
              style={{
                fontFamily: bebas,
                fontSize: 16,
                color: C.white,
                letterSpacing: "0.08em",
                marginBottom: 20,
              }}
            >
              Services
            </h4>
            {CONFIG.services.map((s) => (
              <a
                key={s.id}
                href={`/services/${s.id}`}
                style={{ display: "block", fontSize: 13, color: C.mid, textDecoration: "none", marginBottom: 10 }}
              >
                {s.title}
              </a>
            ))}
          </div>
          <div>
            <h4
              style={{
                fontFamily: bebas,
                fontSize: 16,
                color: C.white,
                letterSpacing: "0.08em",
                marginBottom: 20,
              }}
            >
              Company
            </h4>
            {["About Us", "Projects", "Reviews", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(" ", "")}`}
                style={{ display: "block", fontSize: 13, color: C.mid, textDecoration: "none", marginBottom: 10 }}
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <h4
              style={{
                fontFamily: bebas,
                fontSize: 16,
                color: C.white,
                letterSpacing: "0.08em",
                marginBottom: 20,
              }}
            >
              Contact
            </h4>
            <a
              href={`tel:${CONFIG.business.phone}`}
              style={{ display: "block", fontSize: 13, color: C.mid, textDecoration: "none", marginBottom: 10 }}
            >
              {CONFIG.business.phone}
            </a>
            <a
              href={`mailto:${CONFIG.business.email}`}
              style={{ display: "block", fontSize: 13, color: C.mid, textDecoration: "none", marginBottom: 10 }}
            >
              {CONFIG.business.email}
            </a>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 8 }}>{CONFIG.business.address}</p>
          </div>
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            paddingTop: 32,
            marginTop: 48,
            borderTop: `1px solid ${C.dark}`,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
          }}
        >
          <span>© {new Date().getFullYear()} {CONFIG.business.name}. All rights reserved.</span>
          <span>Built with precision.</span>
        </div>
      </footer>

      {/* ── STICKY ELEMENTS ── */}
      <StickyQuoteBox />
      <StickyWhatsApp />

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { A } from "./config";

loadFont();
const F = 30,
  B = "#050505",
  W = "#fff",
  P = "#7C3AED",
  I = "#151515",
  M = "#858585",
  L = "#E8E8E8",
  S = "#F6F6F6";
const e = (x: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
const up = (f: number, s = 0, d = 18) => {
  const p = e(
    interpolate(f, [s, s + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return { opacity: p, transform: `translateY(${(1 - p) * d}px)` };
};
const K = ({
  children,
  size = 90,
  color = I,
  delay = 0,
}: {
  children: React.ReactNode;
  size?: number;
  color?: string;
  delay?: number;
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: A.font,
        fontSize: size,
        fontWeight: 750,
        letterSpacing: "-.065em",
        lineHeight: 0.88,
        color,
        display: "flex",
        flexWrap: "wrap",
        gap: "0 .2em",
      }}
    >
      {String(children)
        .split(" ")
        .map((w, i) => {
          const p = spring({
            frame: Math.max(0, f - delay - i * 2),
            fps: F,
            config: { damping: 18, stiffness: 190, mass: 0.55 },
          });
          return (
            <span
              key={i}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 65}px) scale(${0.86 + 0.14 * p})`,
                display: "inline-block",
              }}
            >
              {w}
            </span>
          );
        })}
    </div>
  );
};
const Label = ({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    style={{
      fontFamily: A.font,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: dark ? "#999" : P,
    }}
  >
    {children}
  </div>
);
const Pill = ({
  children,
  on = false,
}: {
  children: React.ReactNode;
  on?: boolean;
}) => (
  <span
    style={{
      fontFamily: A.font,
      fontSize: 11,
      fontWeight: 650,
      color: on ? W : M,
      background: on ? B : S,
      padding: "8px 12px",
      borderRadius: 999,
    }}
  >
    {children}
  </span>
);
const Tile = ({ n, sel = false }: { n: number; sel?: boolean }) => {
  const c = ["#D9D6D2", "#E7E1DB", "#CFCFCF", "#DDD8E8", "#D3D3D3", "#E4E4E4"][
    n % 6
  ];
  return (
    <div
      style={{
        height: 130,
        borderRadius: 12,
        background: c,
        border: sel ? `3px solid ${P}` : "1px solid rgba(0,0,0,.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "rgba(255,255,255,.55)",
          left: "36%",
          top: "22%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "76%",
          height: "38%",
          borderRadius: "50% 50% 0 0",
          background: "rgba(30,30,30,.15)",
          left: "12%",
          bottom: -5,
        }}
      />
      {sel && (
        <b
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: P,
            color: W,
            display: "grid",
            placeItems: "center",
            fontFamily: A.font,
            fontSize: 12,
          }}
        >
          ✓
        </b>
      )}
    </div>
  );
};
const Chrome = ({
  active = "Projects",
  children,
}: {
  active?: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      position: "absolute",
      inset: 65,
      border: `1px solid ${L}`,
      borderRadius: 20,
      background: W,
      overflow: "hidden",
      boxShadow: "0 30px 100px rgba(0,0,0,.10)",
    }}
  >
    <aside
      style={{
        position: "absolute",
        inset: "0 auto 0 0",
        width: 215,
        background: "#FAFAFA",
        borderRight: `1px solid ${L}`,
        padding: 22,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: A.font,
          fontSize: 19,
          fontWeight: 800,
          color: I,
          letterSpacing: "-.06em",
          marginBottom: 28,
        }}
      >
        kliqAt
      </div>
      {["Dashboard", "Projects", "Clients", "Team", "Finance"].map((x) => (
        <div
          key={x}
          style={{
            height: 37,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 10px",
            marginBottom: 5,
            borderRadius: 9,
            background: x === active ? "#F1ECFF" : "transparent",
            color: x === active ? P : M,
            fontFamily: A.font,
            fontSize: 12,
            fontWeight: x === active ? 700 : 500,
          }}
        >
          <i
            style={{
              width: 7,
              height: 7,
              borderRadius: 2,
              background: x === active ? P : "#C8C8C8",
            }}
          />
          {x}
        </div>
      ))}
    </aside>
    <header
      style={{
        position: "absolute",
        left: 215,
        right: 0,
        top: 0,
        height: 62,
        borderBottom: `1px solid ${L}`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        boxSizing: "border-box",
        fontFamily: A.font,
        fontSize: 14,
        fontWeight: 700,
        color: I,
      }}
    >
      {active}
      <span
        style={{
          marginLeft: "auto",
          width: 29,
          height: 29,
          borderRadius: "50%",
          background: B,
        }}
      />
    </header>
    {children}
  </div>
);
const Cursor = ({ x, y }: { x: number; y: number }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      zIndex: 20,
      width: 0,
      height: 0,
      borderLeft: "9px solid transparent",
      borderRight: "4px solid transparent",
      borderTop: "25px solid #111",
      transform: "rotate(-18deg)",
      filter: "drop-shadow(0 2px 2px rgba(0,0,0,.2))",
    }}
  />
);

const Intro = () => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f,
    fps: F,
    config: { damping: 16, stiffness: 170 },
  });
  return (
    <AbsoluteFill style={{ background: B, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: P,
          left: "50%",
          top: "50%",
          transform: `translate(-50%,-50%) scale(${p * 48})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: B,
          opacity: interpolate(f, [0, 14, 25], [1, 0.18, 0], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div style={{ position: "absolute", left: 90, top: 82 }}>
        <Label dark>A workspace built for</Label>
      </div>
      <div style={{ position: "absolute", left: 85, top: 175 }}>
        <K color={W} size={150}>
          PHOTOGRAPHERS.
        </K>
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          bottom: 78,
          fontFamily: A.font,
          color: W,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: ".1em",
        }}
      >
        KLIQAT
      </div>
    </AbsoluteFill>
  );
};

const Account = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: W }}>
      <div style={{ position: "absolute", left: 120, top: 145, width: 650 }}>
        <Label>01 / START</Label>
        <div style={{ marginTop: 24 }}>
          <K size={94}>Create your workspace.</K>
        </div>
        <p
          style={{
            fontFamily: A.font,
            fontSize: 18,
            color: M,
            lineHeight: 1.5,
            maxWidth: 570,
            marginTop: 25,
          }}
        >
          One account for your shoots, clients, team, delivery and money.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          left: 980,
          top: 105,
          width: 610,
          height: 770,
          border: `1px solid ${L}`,
          borderRadius: 24,
          padding: 48,
          boxSizing: "border-box",
          boxShadow: "0 30px 100px rgba(0,0,0,.08)",
        }}
      >
        <b style={{ fontFamily: A.font, fontSize: 21, color: I }}>kliqAt</b>
        <div
          style={{
            fontFamily: A.font,
            fontSize: 30,
            fontWeight: 750,
            color: I,
            marginTop: 68,
          }}
        >
          Set up your account
        </div>
        {["Your name", "Studio name", "Email address"].map((x, i) => (
          <div key={x} style={{ marginTop: i ? 18 : 30, ...up(f, 8 + i * 5) }}>
            <div
              style={{
                fontFamily: A.font,
                fontSize: 11,
                color: M,
                marginBottom: 8,
              }}
            >
              {x}
            </div>
            <div
              style={{
                height: 53,
                border: `1px solid ${i === 0 && f > 18 ? P : "#DCDCDC"}`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                padding: "0 15px",
                fontFamily: A.font,
                fontSize: 14,
                color: I,
              }}
            >
              {["Aarav Sharma", "Aarav Studio", "hello@aaravstudio.com"][i]}
            </div>
          </div>
        ))}
        <div
          style={{
            marginTop: 30,
            height: 55,
            borderRadius: 10,
            background: B,
            color: W,
            display: "grid",
            placeItems: "center",
            fontFamily: A.font,
            fontSize: 13,
            fontWeight: 700,
            opacity: interpolate(f, [28, 38], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Create workspace →
        </div>
      </div>
      <Cursor x={1415} y={815} />
    </AbsoluteFill>
  );
};

const Upload = () => {
  const f = useCurrentFrame();
  const q = interpolate(f, [18, 58], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: W }}>
      <Chrome>
        <main style={{ position: "absolute", left: 250, top: 96, right: 42 }}>
          <Label>02 / BUILD THE SHOOT</Label>
          <div style={{ marginTop: 18 }}>
            <K size={76}>Start with the shoot.</K>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr .9fr",
              gap: 18,
              marginTop: 38,
            }}
          >
            <section
              style={{
                border: `1px solid ${L}`,
                borderRadius: 16,
                padding: 24,
                height: 450,
                boxSizing: "border-box",
              }}
            >
              <small style={{ fontFamily: A.font, color: M }}>PROJECT</small>
              <h2
                style={{
                  fontFamily: A.font,
                  fontSize: 24,
                  color: I,
                  margin: "10px 0",
                }}
              >
                Aarav & Meera — Wedding
              </h2>
              <div style={{ display: "flex", gap: 7 }}>
                <Pill on>Wedding</Pill>
                <Pill>24 Aug 2026</Pill>
                <Pill>Jaipur</Pill>
              </div>
              <div
                style={{
                  marginTop: 30,
                  height: 220,
                  border: "2px dashed #D5D5D5",
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: A.font,
                  textAlign: "center",
                }}
              >
                <div>
                  <b style={{ fontSize: 32, color: P }}>↑</b>
                  <div style={{ fontSize: 14, fontWeight: 700, color: I }}>
                    Drop your shoot data
                  </div>
                  <div style={{ fontSize: 11, color: M, marginTop: 5 }}>
                    RAW files, folders, metadata
                  </div>
                </div>
              </div>
            </section>
            <section
              style={{
                border: `1px solid ${L}`,
                borderRadius: 16,
                padding: 24,
                height: 450,
                boxSizing: "border-box",
              }}
            >
              <small style={{ fontFamily: A.font, color: M }}>
                UPLOAD QUEUE
              </small>
              {[
                "RAW — 124 files",
                "CEREMONY — 86 files",
                "PORTRAITS — 42 files",
              ].map((x, i) => {
                const v = Math.max(0, Math.min(100, q - i * 18));
                return (
                  <div key={x} style={{ marginTop: 26 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: A.font,
                        fontSize: 12,
                        color: I,
                      }}
                    >
                      <span>{x}</span>
                      <span>{Math.round(v)}%</span>
                    </div>
                    <div
                      style={{
                        height: 7,
                        background: S,
                        borderRadius: 9,
                        marginTop: 8,
                      }}
                    >
                      <div
                        style={{
                          height: 7,
                          width: v + "%",
                          background: P,
                          borderRadius: 9,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: 65,
                  padding: 14,
                  borderRadius: 10,
                  background: "#FAFAFA",
                  fontFamily: A.font,
                  fontSize: 11,
                  color: M,
                }}
              >
                Everything lands inside the project — ready for the next step.
              </div>
            </section>
          </div>
        </main>
      </Chrome>
    </AbsoluteFill>
  );
};

const Selection = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#F4F4F4" }}>
      <div style={{ position: "absolute", left: 110, top: 90 }}>
        <Label>03 / CLIENT SELECTION</Label>
        <div style={{ marginTop: 20 }}>
          <K size={94}>Let the client choose.</K>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 330,
          width: 1260,
          borderRadius: 22,
          background: W,
          padding: 26,
          boxSizing: "border-box",
          boxShadow: "0 30px 90px rgba(0,0,0,.10)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <b style={{ fontFamily: A.font, fontSize: 22, color: I }}>
              Aarav & Meera
            </b>
            <div
              style={{
                fontFamily: A.font,
                fontSize: 11,
                color: M,
                marginTop: 4,
              }}
            >
              Client selection gallery
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Pill>148 photos</Pill>
            <span
              style={{
                background: P,
                color: W,
                padding: "9px 15px",
                borderRadius: 999,
                fontFamily: A.font,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Share gallery ↗
            </span>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 10,
            marginTop: 22,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Tile key={i} n={i} sel={i % 3 === 1 && f > 14 + i * 2} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 18,
            fontFamily: A.font,
            fontSize: 12,
            color: M,
          }}
        >
          <span>
            <b style={{ color: I }}>
              {Math.max(0, Math.min(4, Math.floor((f - 12) / 7)))}
            </b>{" "}
            selected
          </span>
          <b
            style={{
              background: B,
              color: W,
              padding: "11px 16px",
              borderRadius: 9,
            }}
          >
            Confirm selection
          </b>
        </div>
      </div>
      <Cursor x={1110} y={585} />
    </AbsoluteFill>
  );
};

const Editor = () => {
  const f = useCurrentFrame();
  const p = e(
    interpolate(f, [18, 48], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <AbsoluteFill style={{ background: B }}>
      <div style={{ position: "absolute", left: 110, top: 90 }}>
        <Label dark>04 / TEAM WORKFLOW</Label>
        <div style={{ marginTop: 20 }}>
          <K color={W} size={102}>
            Approved. Send it on.
          </K>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 350,
            padding: 24,
            borderRadius: 18,
            background: "#111",
            border: "1px solid #292929",
          }}
        >
          <small style={{ fontFamily: A.font, color: "#999" }}>
            SELECTED BY CLIENT
          </small>
          <h3
            style={{
              fontFamily: A.font,
              color: W,
              fontSize: 24,
              margin: "10px 0",
            }}
          >
            38 approved photos
          </h3>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Tile key={i} n={i} />
            ))}
          </div>
        </div>
        <div
          style={{
            width: 480,
            height: 3,
            background: "#282828",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: p * 100 + "%",
              height: 3,
              background: P,
            }}
          />
          <i
            style={{
              position: "absolute",
              left: p * 90 + "%",
              top: -6,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: P,
              boxShadow: "0 0 0 8px rgba(124,58,237,.15)",
            }}
          />
        </div>
        <div
          style={{ width: 350, padding: 24, borderRadius: 18, background: W }}
        >
          <small style={{ fontFamily: A.font, color: M }}>EDITOR</small>
          <h3
            style={{
              fontFamily: A.font,
              color: I,
              fontSize: 24,
              margin: "10px 0",
            }}
          >
            Retouching queue
          </h3>
          <div
            style={{
              padding: 13,
              borderRadius: 9,
              background: "#F1ECFF",
              fontFamily: A.font,
              fontSize: 12,
              color: P,
              fontWeight: 700,
            }}
          >
            Aarav & Meera — 38 files
          </div>
          <div
            style={{
              fontFamily: A.font,
              fontSize: 11,
              color: M,
              marginTop: 12,
            }}
          >
            Status: {f > 43 ? "IN EDITING" : "ASSIGNED"}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          bottom: 80,
          fontFamily: A.font,
          fontSize: 13,
          color: "#999",
        }}
      >
        No exports. No scattered folders. Just an assignment.
      </div>
    </AbsoluteFill>
  );
};

const Delivery = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: W }}>
      <div style={{ position: "absolute", left: 115, top: 90 }}>
        <Label>05 / DELIVERY</Label>
        <div style={{ marginTop: 20 }}>
          <K size={88}>Edited. Approved. Delivered.</K>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 335,
          width: 850,
          border: `1px solid ${L}`,
          borderRadius: 20,
          padding: 25,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <b style={{ fontFamily: A.font, fontSize: 22, color: I }}>
              Final gallery
            </b>
            <div
              style={{
                fontFamily: A.font,
                fontSize: 11,
                color: M,
                marginTop: 5,
              }}
            >
              38 edited photos
            </div>
          </div>
          <Pill on={f > 18}>READY</Pill>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 9,
            marginTop: 22,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Tile key={i} n={i + 2} />
          ))}
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
          <b
            style={{
              background: B,
              color: W,
              padding: "11px 16px",
              borderRadius: 9,
              fontFamily: A.font,
              fontSize: 12,
            }}
          >
            Deliver to client ↗
          </b>
          <b
            style={{
              border: `1px solid ${L}`,
              color: I,
              padding: "11px 16px",
              borderRadius: 9,
              fontFamily: A.font,
              fontSize: 12,
            }}
          >
            Download ZIP
          </b>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 145,
          top: 390,
          width: 390,
          padding: 25,
          borderRadius: 18,
          background: B,
          color: W,
          opacity: interpolate(f, [18, 30], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(f, [18, 30], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <Label dark>CLIENT DELIVERY</Label>
        <div
          style={{
            fontFamily: A.font,
            fontSize: 27,
            fontWeight: 750,
            marginTop: 14,
          }}
        >
          Your photos are ready.
        </div>
        <div
          style={{
            fontFamily: A.font,
            fontSize: 11,
            color: "#999",
            marginTop: 10,
          }}
        >
          Private gallery • 38 photos • 1 link
        </div>
        <div
          style={{
            marginTop: 24,
            height: 44,
            borderRadius: 9,
            background: P,
            display: "grid",
            placeItems: "center",
            fontFamily: A.font,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          Open gallery
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Finance = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: W }}>
      <Chrome active="Finance">
        <main style={{ position: "absolute", left: 250, top: 92, right: 42 }}>
          <Label>06 / MONEY</Label>
          <div style={{ marginTop: 18 }}>
            <K size={78}>Get paid. Stay organized.</K>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 12,
              marginTop: 35,
            }}
          >
            {[
              ["Revenue", "₹ 1,84,000"],
              ["Pending", "₹ 42,000"],
              ["Paid", "₹ 1,42,000"],
            ].map(([a, b], i) => (
              <div
                key={a}
                style={{
                  padding: 21,
                  border: `1px solid ${L}`,
                  borderRadius: 15,
                }}
              >
                <small style={{ fontFamily: A.font, color: M }}>{a}</small>
                <div
                  style={{
                    fontFamily: A.font,
                    fontSize: 28,
                    fontWeight: 750,
                    color: i === 2 && f > 18 ? P : I,
                    marginTop: 10,
                  }}
                >
                  {b}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr .9fr",
              gap: 12,
              marginTop: 15,
            }}
          >
            <div
              style={{
                border: `1px solid ${L}`,
                borderRadius: 15,
                padding: 21,
              }}
            >
              <small style={{ fontFamily: A.font, color: M }}>
                RECENT PAYMENTS
              </small>
              {[
                "Aarav & Meera — ₹65,000",
                "Vayrea Studio — ₹48,000",
                "CN Films — ₹29,000",
              ].map((x) => (
                <div
                  key={x}
                  style={{
                    fontFamily: A.font,
                    fontSize: 12,
                    color: I,
                    padding: "16px 0",
                    borderBottom: `1px solid ${L}`,
                  }}
                >
                  {x}
                  <span style={{ float: "right", color: P, fontWeight: 700 }}>
                    PAID ✓
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                border: `1px solid ${L}`,
                borderRadius: 15,
                padding: 21,
              }}
            >
              <small style={{ fontFamily: A.font, color: M }}>INVOICE</small>
              <div
                style={{
                  fontFamily: A.font,
                  fontSize: 21,
                  fontWeight: 750,
                  color: I,
                  marginTop: 12,
                }}
              >
                INV-2026-0824
              </div>
              <div
                style={{
                  fontFamily: A.font,
                  fontSize: 12,
                  color: M,
                  marginTop: 6,
                }}
              >
                Aarav & Meera
              </div>
              <div
                style={{
                  marginTop: 25,
                  padding: 13,
                  borderRadius: 9,
                  background: "#F1ECFF",
                  fontFamily: A.font,
                  fontSize: 12,
                  color: P,
                  fontWeight: 700,
                }}
              >
                Generate & share invoice ↗
              </div>
            </div>
          </div>
        </main>
      </Chrome>
    </AbsoluteFill>
  );
};

const Team = () => {
  const f = useCurrentFrame();
  const people = [
    ["YOU", "Photographer"],
    ["MAYA", "Editor"],
    ["ROHAN", "Retoucher"],
    ["NEHA", "Manager"],
  ];
  return (
    <AbsoluteFill style={{ background: B }}>
      <div style={{ position: "absolute", left: 115, top: 90 }}>
        <Label dark>07 / TEAM</Label>
        <div style={{ marginTop: 20 }}>
          <K color={W} size={92}>
            Everyone sees the same work.
          </K>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 145,
          right: 145,
          top: 400,
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 13,
        }}
      >
        {people.map(([n, r], i) => (
          <div
            key={n}
            style={{
              background: "#111",
              border: "1px solid #292929",
              borderRadius: 17,
              padding: 21,
              ...up(f, i * 3, 30),
            }}
          >
            <div
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                background: i === 0 ? P : "#777",
                color: W,
                display: "grid",
                placeItems: "center",
                fontFamily: A.font,
                fontWeight: 800,
                fontSize: 11,
              }}
            >
              {n[0]}
            </div>
            <div
              style={{
                fontFamily: A.font,
                color: W,
                fontSize: 16,
                fontWeight: 750,
                marginTop: 16,
              }}
            >
              {n}
            </div>
            <div
              style={{
                fontFamily: A.font,
                color: "#999",
                fontSize: 11,
                marginTop: 4,
              }}
            >
              {r}
            </div>
            <div
              style={{
                marginTop: 22,
                height: 5,
                background: "#252525",
                borderRadius: 9,
              }}
            >
              <div
                style={{
                  height: 5,
                  width: 55 + i * 12 + "%",
                  background: i === 0 ? P : "#777",
                  borderRadius: 9,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 145,
          bottom: 78,
          fontFamily: A.font,
          color: "#999",
          fontSize: 13,
        }}
      >
        Projects • assignments • approvals • delivery — connected.
      </div>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f,
    fps: F,
    config: { damping: 20, stiffness: 150 },
  });
  return (
    <AbsoluteFill
      style={{ background: B, display: "grid", placeItems: "center" }}
    >
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(124,58,237,.4)",
          transform: `scale(${0.7 + 0.4 * p})`,
        }}
      />
      <div style={{ position: "relative", textAlign: "center" }}>
        <Img src={staticFile("logo.svg")} style={{ width: 370 }} />
        <div
          style={{ marginTop: 40, display: "flex", justifyContent: "center" }}
        >
          <K color={W} size={62}>
            ONE PLACE. EVERY SHOOT.
          </K>
        </div>
        <div
          style={{
            fontFamily: A.font,
            fontSize: 13,
            color: "#999",
            marginTop: 22,
            letterSpacing: ".08em",
          }}
        >
          CLIENTS · PROJECTS · FILES · TEAM · FINANCE · DELIVERY
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const KliqAtFilm = () => (
  <AbsoluteFill style={{ background: B }}>
    <Audio src={staticFile("kliqat-audio-mix.mp3")} volume={1} />
    <Sequence from={0} durationInFrames={58}>
      <Intro />
    </Sequence>
    <Sequence from={54} durationInFrames={70}>
      <Account />
    </Sequence>
    <Sequence from={118} durationInFrames={92}>
      <Upload />
    </Sequence>
    <Sequence from={204} durationInFrames={82}>
      <Selection />
    </Sequence>
    <Sequence from={280} durationInFrames={78}>
      <Editor />
    </Sequence>
    <Sequence from={352} durationInFrames={86}>
      <Delivery />
    </Sequence>
    <Sequence from={432} durationInFrames={83}>
      <Finance />
    </Sequence>
    <Sequence from={505} durationInFrames={66}>
      <Team />
    </Sequence>
    <Sequence from={563} durationInFrames={37}>
      <Outro />
    </Sequence>
  </AbsoluteFill>
);

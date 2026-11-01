
import React from "react";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing
} from "remotion";

const LIME = "#D7FF32";
const WHITE = "#F7F7F2";
const BLACK = "#050706";
const GREY = "#A8ADA7";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
};

const FadeText = ({
  children,
  size = 70,
  color = WHITE,
  delay = 0,
  tracking = -2,
  style = {}
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [delay, delay + 12],
    [0, 1],
    clamp
  );

  const y = interpolate(
    frame,
    [delay, delay + 15],
    [55, 0],
    clamp
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        color,
        fontFamily: "Arial Black, Arial, sans-serif",
        fontSize: size,
        fontWeight: 900,
        letterSpacing: tracking,
        lineHeight: 0.98,
        textTransform: "uppercase",
        ...style
      }}
    >
      {children}
    </div>
  );
};

const Background = () => {
  const frame = useCurrentFrame();

  const light = 0.12 + Math.sin(frame * 0.07) * 0.04;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(160deg,#111711 0%,#050706 48%,#101910 100%)"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -150,
          left: -100,
          width: 650,
          height: 1000,
          background: `radial-gradient(ellipse,rgba(215,255,50,${light}),transparent 70%)`,
          transform: "rotate(25deg)"
        }}
      />

      <div
        style={{
          position: "absolute",
          top: -120,
          right: -180,
          width: 600,
          height: 1000,
          background:
            "radial-gradient(ellipse,rgba(255,255,255,.13),transparent 68%)",
          transform: "rotate(-25deg)"
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          backgroundImage:
            "repeating-linear-gradient(90deg,transparent 0px,transparent 95px,rgba(255,255,255,.025) 96px,transparent 98px)"
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: -180,
          left: "-20%",
          width: "140%",
          height: "50%",
          borderTop: "2px solid rgba(255,255,255,.12)",
          transform: "perspective(600px) rotateX(55deg)",
          background:
            "repeating-linear-gradient(0deg,rgba(60,110,55,.08) 0px,rgba(60,110,55,.08) 80px,rgba(5,20,8,.12) 80px,rgba(5,20,8,.12) 160px)"
        }}
      />
    </AbsoluteFill>
  );
};

const Ball = ({ size = 240 }) => {
  const frame = useCurrentFrame();
  const rotation = frame * 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 30% 25%,#fff 0%,#dce0da 40%,#555d56 100%)",
        boxShadow:
          "0 35px 90px rgba(0,0,0,.55),0 0 40px rgba(215,255,50,.12)",
        transform: `rotate(${rotation}deg)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <g fill="#101510" stroke="#101510" strokeWidth="2">
          <polygon points="100,65 126,83 116,112 84,112 74,83" />
          <polygon points="100,8 125,24 125,48 100,65 75,48 75,24" />
          <polygon points="29,48 53,42 75,48 74,83 50,92 27,75" />
          <polygon points="171,48 147,42 125,48 126,83 150,92 173,75" />
          <polygon points="50,92 74,83 84,112 70,135 42,128 27,105" />
          <polygon points="150,92 126,83 116,112 130,135 158,128 173,105" />
          <polygon points="70,135 84,112 116,112 130,135 119,160 81,160" />
        </g>
      </svg>
    </div>
  );
};

const Brand = ({ scale = 1 }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transform: `scale(${scale})`
    }}
  >
    <div
      style={{
        color: WHITE,
        fontFamily: "Arial Black, Arial, sans-serif",
        fontWeight: 950,
        fontSize: 122,
        letterSpacing: -8
      }}
    >
      BALL<span style={{ color: LIME }}>Z</span>Y
    </div>

    <div
      style={{
        width: 320,
        height: 5,
        background: LIME,
        transform: "skewX(-25deg)",
        marginTop: 14,
        marginBottom: 20
      }}
    />

    <div
      style={{
        color: WHITE,
        fontSize: 23,
        fontFamily: "Arial, sans-serif",
        fontWeight: 700,
        letterSpacing: 4
      }}
    >
      CULTURE BEHIND THE GAME
    </div>
  </div>
);

const Scene = ({ children }) => (
  <AbsoluteFill
    style={{
      background: BLACK,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Background />
    {children}
  </AbsoluteFill>
);

// SCENE 1 — OPENING HOOK
const Opening = () => (
  <Scene>
    <div
      style={{
        position: "absolute",
        top: 390,
        textAlign: "center"
      }}
    >
      <FadeText size={30} color={LIME} tracking={7}>
        NOT JUST A GAME
      </FadeText>

      <div style={{ height: 30 }} />

      <FadeText size={90} delay={8}>
        MORE THAN
      </FadeText>

      <FadeText size={120} color={LIME} delay={16}>
        FOOTBALL.
      </FadeText>
    </div>

    <div style={{ position: "absolute", top: 930 }}>
      <Ball size={310} />
    </div>
  </Scene>
);

// SCENE 2 — BRAND REVEAL
const BrandReveal = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [0, 25, 40],
    [0.65, 1.06, 1],
    clamp
  );

  const lineX = interpolate(frame, [0, 35], [-1000, 1000], clamp);

  return (
    <Scene>
      <div style={{ transform: `scale(${scale})` }}>
        <Brand />
      </div>

      <div
        style={{
          position: "absolute",
          left: -300,
          top: 1000,
          width: 1700,
          height: 5,
          background: LIME,
          transform: `translateX(${lineX}px) rotate(-15deg)`
        }}
      />

      <div style={{ position: "absolute", bottom: 330 }}>
        <FadeText size={26} color={GREY} tracking={4}>
          BUILT FOR THE LOVE OF THE GAME
        </FadeText>
      </div>
    </Scene>
  );
};

// SCENE 3 — FOOTBALL CULTURE
const Culture = () => {
  const frame = useCurrentFrame();

  const lines = [
    ["THE PASSION.", "Every touch means something."],
    ["THE BROTHERHOOD.", "One team. One heartbeat."],
    ["THE COMPETITION.", "Earn every moment."],
    ["THE CULTURE.", "This is where we belong."]
  ];

  const index = Math.min(3, Math.floor(frame / 30));
  const local = frame % 30;

  const opacity = interpolate(
    local,
    [0, 6, 23, 30],
    [0, 1, 1, 0],
    clamp
  );

  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 70,
          right: 70,
          opacity
        }}
      >
        <FadeText size={66} color={index % 2 ? LIME : WHITE}>
          {lines[index][0]}
        </FadeText>

        <div style={{ height: 28 }} />

        <div
          style={{
            fontFamily: "Arial, sans-serif",
            color: GREY,
            fontSize: 31
          }}
        >
          {lines[index][1]}
        </div>
      </div>

      <div style={{ position: "absolute", top: 950 }}>
        <Ball size={300} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 330,
          display: "flex",
          gap: 12
        }}
      >
        {lines.map((line, i) => (
          <div
            key={line[0]}
            style={{
              width: 150,
              height: 5,
              background: i <= index ? LIME : "#3b413b"
            }}
          />
        ))}
      </div>
    </Scene>
  );
};

// SCENE 4 — KOLKATA LAUNCH
const Kolkata = () => (
  <Scene>
    <div style={{ position: "absolute", left: 72, right: 72 }}>
      <FadeText size={28} color={LIME} tracking={5}>
        THE GAME IS CALLING
      </FadeText>

      <div style={{ height: 40 }} />

      <FadeText size={100}>KOLKATA,</FadeText>
      <FadeText size={100} delay={8}>IT'S YOUR</FadeText>
      <FadeText size={130} color={LIME} delay={16}>
        TIME.
      </FadeText>

      <div style={{ height: 45 }} />

      <div
        style={{
          border: `2px solid ${LIME}`,
          padding: "22px 25px",
          display: "inline-block",
          color: WHITE,
          fontSize: 28,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          letterSpacing: 2
        }}
      >
        FIRST TIME IN KOLKATA
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 310, right: 75 }}>
      <Ball size={190} />
    </div>
  </Scene>
);

// SCENE 5 — ENTRY FEE
const EntryFee = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [0, 20, 32],
    [0.65, 1.08, 1],
    clamp
  );

  return (
    <Scene>
      <div style={{ textAlign: "center" }}>
        <FadeText size={29} color={LIME} tracking={3}>
          YOUR GAME. YOUR CULTURE.
        </FadeText>

        <div style={{ height: 75 }} />

        <FadeText size={35} color={GREY} tracking={7}>
          ENTRY FEE
        </FadeText>

        <div
          style={{
            marginTop: 30,
            color: LIME,
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 250,
            fontWeight: 950,
            letterSpacing: -12,
            transform: `scale(${scale})`,
            textShadow: "0 20px 80px rgba(0,0,0,.4)"
          }}
        >
          ₹299
        </div>

        <div
          style={{
            width: 500,
            height: 5,
            background: WHITE,
            margin: "45px auto"
          }}
        />

        <FadeText size={30} tracking={3}>
          YOUR NEXT GAME STARTS HERE.
        </FadeText>
      </div>
    </Scene>
  );
};

// SCENE 6 — FINAL CALL TO ACTION
const CallToAction = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.15) * 0.025;

  return (
    <Scene>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${pulse})`
        }}
      >
        <Brand scale={0.82} />

        <div style={{ height: 105 }} />

        <div
          style={{
            background: LIME,
            color: BLACK,
            padding: "30px 35px",
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 43,
            fontWeight: 950,
            letterSpacing: 1,
            boxShadow: "0 15px 70px rgba(215,255,50,.15)"
          }}
        >
          DM TO REGISTER
        </div>

        <div style={{ height: 40 }} />

        <FadeText size={34} tracking={4}>
          ENTRY FEE ₹299
        </FadeText>

        <div style={{ height: 100 }} />

        <FadeText size={24} color={GREY} tracking={4}>
          YOUR GAME. YOUR CULTURE.
        </FadeText>
      </div>
    </Scene>
  );
};

// MAIN VIDEO TIMELINE
export const BallzyPromo = () => (
  <AbsoluteFill style={{ background: BLACK }}>
    <Sequence from={0} durationInFrames={120}>
      <Opening />
    </Sequence>

    <Sequence from={120} durationInFrames={150}>
      <BrandReveal />
    </Sequence>

    <Sequence from={270} durationInFrames={120}>
      <Culture />
    </Sequence>

    <Sequence from={390} durationInFrames={150}>
      <Kolkata />
    </Sequence>

    <Sequence from={540} durationInFrames={210}>
      <EntryFee />
    </Sequence>

    <Sequence from={750} durationInFrames={300}>
      <CallToAction />
    </Sequence>
  </AbsoluteFill>
);

import type { Metadata } from "next";
import GivingBackCaseStudyTemplate from "@/components/GivingBackCaseStudyTemplate";

export const metadata: Metadata = {
  title: "Giving Back — Museum of Iris",
  description:
    "Design Thinking Final Project — UT West Campus unhoused community support through empathy research, two prototype cycles, and a Jumbotron video campaign. Fall 2025.",
};

const IMAGE_BASE = "/images/west-campus";

export default function GivingBackCaseStudyPage() {
  return (
    <GivingBackCaseStudyTemplate
      title="Giving Back"
      subtitle="Design thinking capstone — empathy research, two prototype cycles, one Jumbotron pitch."
      subtitleHtml='Design thinking capstone — <strong>empathy research → two cycles → Jumbotron campaign</strong> for West Campus&apos;s unhoused community.'
      metadata={[
        { label: "Timeline", value: "Fall 2025 · One Semester" },
        { label: "Role", value: "UX Researcher" },
        { label: "Method", value: "Design Thinking · 2 cycles" },
        { label: "Course", value: "Integrated Design Thinking · UT Austin" },
      ]}
      accent={{
        heroGradient:
          "linear-gradient(148deg, #FAF0E6 0%, #E8D5C4 42%, #D4B896 100%)",
        bulletColor: "#BF5700",
        heroEyebrow: "Impact at a glance",
        heroMetrics: [
          { label: "Cycles", num: "2", sub: "Prototype & test" },
          { label: "Themes", num: "4", sub: "From empathy research" },
          { label: "Participants", num: "12+", sub: "Cycle 01 testing" },
        ],
        heroImage: {
          src: `${IMAGE_BASE}/impact-glance.png`,
          alt: "Giving Back project impact — empathy research through Jumbotron video prototype",
          placeholderLabel: `${IMAGE_BASE}/impact-glance.png`,
        },
      }}
      overview={{
        heading: "An invisible problem in a community we actually live in.",
        team: [
          { name: "Emily Araiza" },
          { name: "Frida Balderas" },
          { role: "UX Researcher", name: "Iris Wang", isMe: true },
          { name: "Manay Divatia" },
        ],
        bullets: [
          "<strong>Led prototyping</strong> both cycles — t-shirt → Jumbotron video",
          "Interviews with student orgs, volunteer boards, and anonymous peers",
          "<em>Owned</em> Cycle 01 t-shirt designs + Cycle 02 video concept & on-camera content",
        ],
      }}
      theQuestion={{
        heading: 'Right problem. Wrong "how might we."',
        bullets: [
          "Framed around homelessness broadly — <strong>no target user, no behavior</strong>",
          "Cycle 01 would force us to <em>rewrite the question entirely</em>",
        ],
        hmwLabel: "Original How Might We",
        hmwHtml:
          '"How might we create a supportive environment for <span style="color:#BF5700">people who face homelessness</span> around West Campus?"',
      }}
      research={{
        heading: "Four interview themes. One design target.",
        bullets: [
          "Affinity-mapped real quotes on Miro — <strong>4 themes</strong> from org boards + students",
          "Systemic hostility <em>and</em> individual fear — both had to shape the design",
        ],
        images: [
          {
            src: `${IMAGE_BASE}/miro-board.png`,
            alt: "Miro board affinity map — interview quotes clustered into 4 themes",
            placeholderLabel: `${IMAGE_BASE}/miro-board.png`,
            caption: "Miro affinity map · clustering interview quotes",
          },
          {
            src: `${IMAGE_BASE}/interviews.png`,
            alt: "Team conducting user interviews on campus and at volunteer organizations",
            placeholderLabel: `${IMAGE_BASE}/interviews.png`,
            caption: "Conducting interviews · West Campus & partner orgs",
          },
        ],
        themes: [
          {
            num: "THEME 01",
            title: "External Factor Effects",
            body: "West Campus is hostile. Policies push removal — exclusion creates <em>unwantedness</em>.",
            quote: '"Policies lead to the removal of unhoused individuals."',
            source: "— Org Board Member",
          },
          {
            num: "THEME 02",
            title: "Government Intervention",
            body: "Policing over support. Treated as a <strong>safety issue</strong>, not a humane crisis.",
            quote: '"The unhoused are not dangerous, just underserved."',
            source: "— Org Board Member",
          },
          {
            num: "THEME 03",
            title: "Awareness & Ignorance",
            body: "Students <em>want to help</em> — but fear wins without resource knowledge.",
            quote: '"Students want to help out but have no knowledge of resources."',
            source: "— Anonymous student",
          },
          {
            num: "THEME 04",
            title: "Action & Engagement",
            body: "Volunteer care shows up in <strong>bursts</strong>, not patterns.",
            quote: '"I never know when you are ready to give me the attention I need."',
            source: "— Breakup-letter prompt response",
          },
        ],
        pullQuote:
          "Students want to help — but they have no knowledge of resources, and fear wins.",
        closingBullets: [
          "<strong>Theme 03</strong> — Awareness & Ignorance — is where the leverage lived",
          "Information gap, not values gap → <em>that</em> became our user",
        ],
      }}
      prototypeOne={{
        heading: "Wearable awareness — t-shirt as portable resource map.",
        bullets: [
          "Front: call-to-action · Back: <strong>shelter & resource map</strong>",
          "UT Coop vs. Nike-style — tested head-to-head with 12 participants",
        ],
        images: [
          {
            src: `${IMAGE_BASE}/tshirt-ut.png`,
            alt: "UT Co-op version — burnt orange, longhorn graphic, resource map on back",
            placeholderLabel: `${IMAGE_BASE}/tshirt-ut.png`,
            caption: "UT Coop version · burnt orange",
          },
          {
            src: `${IMAGE_BASE}/tshirt-nike.png`,
            alt: "Nike-style minimalist version — black and white, minimal graphic",
            placeholderLabel: `${IMAGE_BASE}/tshirt-nike.png`,
            caption: "Nike-style minimalist version",
          },
        ],
        calloutLabel: "The bigger idea",
        calloutText:
          'Yearly student design contest — <em>President-selected</em> — keeps awareness <strong>fresh and student-owned</strong>.',
      }}
      testOne={{
        heading: "12 participants. One clear signal.",
        bullets: [
          "UT version: <strong>looked right</strong>, message unclear",
          "Nike version: readable, but <em>not eye-catching enough</em> to spread",
        ],
        highlightImage: {
          src: `${IMAGE_BASE}/test-cycle-01.png`,
          alt: "Cycle 01 testing synthesis — participant feedback themes and insights",
          placeholderLabel: `${IMAGE_BASE}/test-cycle-01.png`,
          caption: "Cycle 01 · testing synthesis",
        },
        quotes: [
          {
            text: '"I think a QR code would be a great idea for the shirt."',
            source: "Participant 03",
          },
          {
            text: '"Housing crisis — people would appreciate it, out in the open raising awareness."',
            source: "Participant 02",
          },
          {
            text: '"Remove figure in the front, change the list of locations on the back."',
            source: "Participant 09",
          },
        ],
        insights: {
          worked: [
            "<strong>Intent landed</strong> immediately",
            "Burnt orange = instant campus belonging",
            "Resource map felt genuinely useful",
          ],
          didnt: [
            "Front message visually muddy",
            "Nike too plain for awareness",
            "Back-side list hard to read",
          ],
        },
      }}
      redefine={{
        heading: "Prototype worked. Question didn't.",
        bullets: [
          "We tested <strong>student response</strong> — not unhoused experience",
          "Rewrote HMW to match the user we were <em>actually</em> designing for",
        ],
        hmwImage: {
          src: `${IMAGE_BASE}/changing-how-might-we.png`,
          alt: "How might we refinement — original question narrowed to student engagement and awareness",
          placeholderLabel: `${IMAGE_BASE}/changing-how-might-we.png`,
          caption: "Original → refined how might we",
        },
        needed: [
          "<strong>Clearer</strong> message",
          "<em>Engaging</em> content",
          'The "why care?"',
        ],
        kept: [
          "100% UT branding",
          "Resource-as-call-to-action",
          "QR code <span class=\"accent\">from testing</span>",
        ],
      }}
      prototypeTwo={{
        heading: "Jumbotron — meet students where attention already is.",
        bullets: [
          "<strong>60K students</strong> at DKR · captive eyes between plays",
          "Sports-reel aesthetic — <em>not</em> an ad parachuted into game day",
        ],
        contributions: [
          {
            step: "My Role · Video Production",
            heading: "Concept to a story that earns the scan.",
            bullets: [
              "<strong>Owned concept + content</strong> end to end",
              "Native to Jumbotron grammar — 30 sec that <em>belongs</em> on the screen",
            ],
            image: {
              alt: "Jumbotron awareness video — UT sports-reel aesthetic with giving back messaging",
              placeholderLabel: "/videos/jumbotron-video.mp4",
              videoSrc: "/videos/jumbotron-video.mp4",
            },
          },
          {
            step: "Messaging",
            heading: '"Stop doomscrolling. Fall in love with giving back."',
            bullets: [
              '<span class="lead"><em>Reframes the scroll</em></span> — better than doomscrolling',
              "QR closes the loop → <strong>volunteer ops, calendar, shelters</strong>",
            ],
            image: {
              src: `${IMAGE_BASE}/qr-website.png`,
              alt: "QR landing page — volunteer opportunities, calendar, shelters, ways to get involved",
              placeholderLabel: `${IMAGE_BASE}/qr-website.png`,
            },
          },
        ],
      }}
      testTwo={{
        heading: "We faked game day in an apartment.",
        bullets: [
          "Sports on TV, friends, simulated timeouts — <strong>then cut to the video</strong>",
          "Four questions: mood, habits, attention hooks, community connection",
        ],
        images: [
          {
            src: `${IMAGE_BASE}/test-setup.png`,
            alt: "Apartment simulated game-day viewing setup",
            placeholderLabel: `${IMAGE_BASE}/test-setup.png`,
            caption: "Apartment simulation · pre-prototype",
          },
          {
            src: `${IMAGE_BASE}/test-playing.png`,
            alt: "Prototype video played during simulated commercial break",
            placeholderLabel: `${IMAGE_BASE}/test-playing.png`,
            caption: 'Prototype playing during "timeout"',
          },
        ],
        quotes: [
          {
            text: '"It would catch my attention immediately because of the song."',
            source: "Pre · Game-day viewer",
          },
          {
            text: '"I don\'t feel connected to what is happening in the community."',
            source: "Pre · Mood check",
          },
          {
            text: '"I was more inclined to scan because the video was put together."',
            source: "Post · Post-prototype",
          },
          {
            text: '"I wish the website links to ways to help actually worked."',
            source: "Post · Constructive",
          },
        ],
        insights: {
          worked: [
            "People felt <strong>moved</strong>",
            "Visuals + music were extremely engaging",
            "QR code felt like a <em>real</em> next step",
          ],
          didnt: [
            "Overlay text slightly hard to read",
            "Closing QR graphic needs polish",
            "Bright lights + music distracted some viewers",
          ],
        },
      }}
      futureWork={{
        heading: "Where this goes next.",
        label: "Scale",
        items: [
          "<strong>UT Athletics partnership</strong> — launch at DKR full scale",
          "Empathy & Safety Training on the landing page",
          "Adapt for <em>all sporting events</em>, not just football",
          "Refresh visuals yearly — keep the message, match TikTok/IG trends",
        ],
      }}
      reflection={{
        heading: "What two cycles taught me.",
        cards: [
          {
            label: "What I Learned",
            title: "Empathy needs research.",
            bullets: [
              "Four themes only emerged because we <strong>talked to people in person</strong>",
              "Affinity-mapping their words on Miro — <em>that's</em> where insight lives",
            ],
          },
          {
            label: "What Surprised Me",
            title: "Think bigger.",
            bullets: [
              "Jumbotron was on our list from day one — we cut it as <em>intangible</em>",
              "Turns out it was the right fallback after Cycle 01",
            ],
          },
          {
            label: "What's Next",
            title: "Research-driven design.",
            bullets: [
              "Research isn't a checkbox — it's the <strong>foundation</strong>",
              "Interview → synthesize → prototype fast → test with real users. <em>That cycle moves people.</em>",
            ],
          },
        ],
      }}
      backHref="/experience"
      backLabel="← Back to experience"
      footerCrumb="Experience · Giving Back · UX Research"
    />
  );
}

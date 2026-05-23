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
      subtitle="A semester-long design thinking project exploring how UT students can engage with and support the unhoused community in West Campus — from empathy interviews through two prototype-and-test cycles to a Jumbotron video campaign."
      metadata={[
        { label: "Timeline", value: "Fall 2025 · One Semester" },
        { label: "Role", value: "UX Researcher" },
        { label: "Method", value: "Design Thinking · 2 cycles" },
        { label: "Course", value: "Integrated Design Thinking · UT Austin" },
      ]}
      overview={{
        heading:
          "A four-person team tackling an invisible problem in a community we live in.",
        body: "Our team worked across UX research, ideation, and two full prototype-and-test cycles to address how UT students engage with the unhoused community surrounding West Campus. We conducted user interviews with student org members, volunteer organizations, and anonymous students; surfaced four themes from the research; and iterated from a wearable awareness tool to a Jumbotron video campaign.",
        team: [
          { name: "Emily Araiza" },
          { name: "Frida Balderas" },
          { role: "UX Researcher", name: "Iris Wang", isMe: true },
          { name: "Manay Divatia" },
        ],
        bullets: [
          "Proposed the prototype directions and led the prototyping workstream across both cycles.",
          "Conducted user interviews across student organizations and volunteer groups supporting the unhoused.",
          "Created the t-shirt designs (Prototype #1) and led video production content for the Jumbotron concept (Prototype #2).",
        ],
      }}
      theQuestion={{
        heading: 'We started with a "how might we" — but the wrong scope.',
        body: "Our original framing pointed at the problem but didn't give us a target user or behavior to design for. The research would show us how to refine it.",
        hmwLabel: "Original How Might We",
        hmwHtml:
          '"How might we create a supportive environment for <span style="color:#BF5700">people who face homelessness</span> around West Campus?"',
      }}
      research={{
        heading:
          "User interviews surfaced four themes, leading us to our design target.",
        body: "We interviewed student org members, volunteer-organization board members, and anonymous students. We affinity-mapped quotes on a Miro board and clustered them into four themes capturing both the systemic friction and the individual fear-and-ignorance gaps.",
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
            body: 'The environment around West Campus is actively hostile. Policies push for the removal of unhoused individuals; exclusion creates a "feeling of unwantedness."',
            quote: '"Policies lead to the removal of unhoused individuals."',
            source: "— Org Board Member",
          },
          {
            num: "THEME 02",
            title: "Government Intervention",
            body: "Policing and surveillance are prioritized over support. Homelessness gets treated as a safety issue rather than a humane crisis.",
            quote: '"The unhoused are not dangerous, just underserved."',
            source: "— Org Board Member",
          },
          {
            num: "THEME 03",
            title: "Awareness & Ignorance",
            body: 'Fear is the priority — students "can\'t walk anywhere without fear." Students want to help but lack resource knowledge, leading to aid that is "inconsistent and insufficient."',
            quote: '"Students want to help out but have no knowledge of resources."',
            source: "— Anonymous student",
          },
          {
            num: "THEME 04",
            title: "Action & Engagement",
            body: "Available support is inadequate. Volunteer efforts are short-lived. Community care is unreliable — it shows up in bursts, not patterns.",
            quote: '"I never know when you are ready to give me the attention I need."',
            source: "— Breakup-letter prompt response",
          },
        ],
        pullQuote:
          "Despite empathy, students want to help out — but they have no knowledge of resources, and are overcome by fear.",
        closingBody:
          "Theme three — <strong>Awareness &amp; Ignorance</strong> — was where the leverage lived. Students are the largest group on campus capable of consistent supportive action, but they're held back by an information gap, not a values gap. That gave us our user.",
      }}
      prototypeOne={{
        heading: "A wearable awareness tool — the t-shirt as a portable resource map.",
        body: 'The first prototype used a t-shirt as a dual-purpose object: a visible call-to-action on the front and a portable map of shelters and resources on the back. We designed two variants — a UT-branded burnt-orange "Coop" version and a minimalist Nike-style version and ran them against each other.',
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
          "A yearly student t-shirt design contest — chosen by the University President — to keep the awareness campaign fresh and student-owned every year.",
      }}
      testOne={{
        heading: "12 participants. Structured questionnaire. Clear signal on what wasn't working.",
        body: "We collected feedback from 12 participants through a structured questionnaire comparing the two designs. The signal was sharper than expected — the UT version landed visually but the message was unclear, and the Nike version was readable but not eye-catching.",
        quotes: [
          {
            text: '"I think a QR code would be a great idea for the shirt."',
            source: "Participant 03",
          },
          {
            text: '"Not difficult to understand the message of the t-shirt at all, but at the same time not that easy."',
            source: "Participant 07",
          },
          {
            text: '"The Nike black and white is too plain — not eye-catching enough."',
            source: "Participant 11",
          },
          {
            text: '"Way too busy and overstimulating."',
            source: "Participant 04",
          },
          {
            text: '"Remove figure in the front, change the list of locations on the back, pin-point map on locations."',
            source: "Participant 09",
          },
          {
            text: '"Housing crisis — people would appreciate it, out in the open raising awareness."',
            source: "Participant 02",
          },
        ],
        insights: {
          worked: [
            "Visual prototype communicated intent immediately",
            "UT branding (burnt orange) created instant campus belonging",
            "The resource map concept resonated as genuinely useful",
          ],
          didnt: [
            "Front-side message was visually unclear",
            "Nike version was too plain to function as awareness",
            "Readability of the back-side resource list was poor",
          ],
        },
      }}
      redefine={{
        heading: "The prototype was working — the question wasn't.",
        body: 'The clearest finding from Cycle 1 wasn\'t about the shirt. It was that our "how might we" was scoped too broadly. Our prototype was actually testing the <em>student</em> response — not the unhoused community\'s experience. So we rewrote the question to match the user we were really designing for.',
        originalHmw:
          '"How might we create a supportive environment for people who face homelessness around West Campus?"',
        refinedHmw:
          '"How might we increase student engagement & awareness towards supporting the unhoused community in West Campus?"',
        needed: [
          "Clearer message",
          "Engaging content",
          "Action-oriented & to the point",
          'The "why care?"',
        ],
        kept: [
          "100% UT branding",
          "Resource-as-call-to-action concept",
          "QR-code idea from testing",
          "Burnt orange as identity",
        ],
      }}
      prototypeTwo={{
        heading: "The Jumbotron — meeting students where their attention already is.",
        body: "Sixty thousand students sit in DKR Stadium on game day. The Jumbotron between plays is the rare moment where attention is captive and consent is implicit. We pivoted from wearable to broadcast — a video styled like the TikTok and Instagram reels UT already posts, but reframed to highlight the realities of homelessness and a concrete way to help.",
        contributions: [
          {
            step: "My Role · Led Video Production Content",
            heading: "From concept to a story that earns the scan.",
            paragraphs: [
              "I owned the video concept and content direction. Pulled directly from UT's existing sports-reel aesthetic so the spot wouldn't feel like an \"ad\" — it had to live inside the same visual grammar as the game-day footage around it.",
              "Our marketing lead handled the actual cutting; I led the concept, the messaging direction, and the on-camera content. The result was a 30-second piece that felt native to the Jumbotron, not parachuted into it.",
            ],
            image: {
              src: `${IMAGE_BASE}/jumbotron-video.png`,
              alt: "Jumbotron video frame — UT sports-reel aesthetic with awareness messaging",
              placeholderLabel: `${IMAGE_BASE}/jumbotron-video.png`,
            },
          },
          {
            step: "Messaging",
            heading: '"Stop doomscrolling. Fall in love with giving back."',
            paragraphs: [
              "The core line of the video reframes the scroll. The video doesn't tell students they're bad for ignoring the unhoused — it tells them there's a more interesting way to spend their attention than the doomscroll.",
              "The video closes on a QR code that opens a mock website with volunteer opportunities, community calendar, local shelters, and ways to get involved — turning passive viewing into one tappable next step.",
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
        heading: "We rebuilt game day in an apartment to test it for real.",
        body: 'We recreated a game-like environment in our apartment — sports on the TV, friends watching, simulated commercial breaks. During a "timeout" we cut to the prototype video, then asked four questions: a mood check, game-day viewing habits, what captures attention during breaks, and sense of community connection.',
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
            text: '"There are bigger issues going on in the world. We as a community need to get involved — we\'re consumed by other things."',
            source: "Post · Post-prototype",
          },
          {
            text: '"Music makes me look up or pay attention during game breaks."',
            source: "Pre · Attention habits",
          },
          {
            text: '"I wish the website links to ways to help actually worked."',
            source: "Post · Constructive",
          },
        ],
        insights: {
          worked: [
            "People felt moved by the video",
            "Visuals and music were extremely engaging",
            "Viewers appreciated the QR code as a real next step",
          ],
          didnt: [
            "Font of overlay text was slightly hard to read",
            "Closing QR graphic was basic — needs polish",
            "Bright lights + music distracted some viewers",
          ],
        },
      }}
      futureWork={{
        heading: "Where this goes from here.",
        label: "Scale",
        items: [
          "Secure official partnership with UT Athletics / DKR Stadium to launch the Jumbotron Video at full scale",
          "Develop and host Empathy & Safety Training on the landing page to directly address student fear and ignorance",
          "Adapt the video for different sporting events — not just football",
          "Update concept yearly to match new trends on TikTok and Instagram; keep the core message, refresh visuals",
        ],
      }}
      reflection={{
        heading: "What two prototype cycles taught me.",
        cards: [
          {
            label: "What I Learned",
            title: "Empathy exists with research.",
            body: "The four themes only emerged because we actually went out and talked to students and org board members in person. Affinity-mapping their actual words on the Miro board was where we pulled insights. From there, we were able to understand and create a design!",
          },
          {
            label: "What Surprised Me",
            title: "Think bigger!",
            body: 'Originally, we had our jumbotron idea in out list of prototypes. However, we slashed it because it seemed intangible. TUrns out, it was important to think bigger as it may be your best fall back after all.',
          },
          {
            label: "What's Next",
            title: "I want to lead research-driven design.",
            body: "This project brought a new perspective on research-driven design. While conducting interviews, synthesizing themes, prototyping fast, and iterating with real users in the loop, mastering these concepts create the best designs to make impact.",
          },
        ],
      }}
      backHref="/experience"
      backLabel="← Back to experience"
      footerCrumb="Experience · Giving Back · UX Research"
    />
  );
}

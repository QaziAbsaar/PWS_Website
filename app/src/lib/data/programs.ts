/**
 * Focus areas of the Society. Static content — no DB table for programs;
 * the admin portal manages events, news, gallery, and team instead.
 */

export interface Program {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  points: string[];
}

export const PROGRAMS: Program[] = [
  {
    slug: "volunteer-outreach",
    title: "Volunteer & outreach",
    summary:
      "Bring student volunteers into initiatives that serve people and communities with dignity, consistency, and care.",
    body: [
      "Volunteering is the most direct way a student can serve. The Society identifies activities where hands and time genuinely help, then organises students so that every volunteer arrives prepared, knows what the work is, and leaves having done something real.",
      "We look for initiatives that treat the people they serve with dignity — where volunteers listen first and assist second, and where the same faces return often enough for help to become a relationship rather than a one-off gesture.",
    ],
    points: [
      "Organised volunteer groups for campus and community activities.",
      "Preparation briefing before every activity, reflection after it.",
      "Roles matched to what each volunteer can genuinely offer.",
    ],
  },
  {
    slug: "awareness-advocacy",
    title: "Awareness & advocacy",
    summary:
      "Use campaigns, conversations, and collaborations to make important social issues easier to understand and act on.",
    body: [
      "Awareness work is not about volume — it is about clarity. A campaign earns its place only when it helps someone understand an issue well enough to respond to it, whether that response is a donation, a change in habit, or simply a more careful conversation.",
      "The Society runs sessions and campaigns on education, health, poverty, and human rights, working with people who know the issue firsthand so the message is accurate rather than merely loud.",
    ],
    points: [
      "Awareness sessions led with credible partners and speakers.",
      "Campaigns planned around one clear, useful message.",
      "Materials shared carefully — accuracy before reach.",
    ],
  },
  {
    slug: "giving-initiatives",
    title: "Giving initiatives",
    summary:
      "Support charitable events, donation drives, and fundraising activities around credible, relevant causes.",
    body: [
      "A donation drive only works when it is built on trust: a verified need, a transparent route from donor to recipient, and an honest report of what was collected and where it went. That is the standard the Society holds its giving initiatives to.",
      "From collection drives on campus to fundraising for partner organisations, each initiative is chosen for a specific, confirmed need — never because a cause happens to be topical.",
    ],
    points: [
      "Drives built on verified needs with named recipients.",
      "Transparent collection, delivery, and reporting.",
      "Current drives are announced on the site and in the popup banner.",
    ],
  },
  {
    slug: "student-support",
    title: "Student support",
    summary:
      "Help students find information and appropriate routes to academic, financial, and wellbeing support within the institute.",
    body: [
      "Most students who need help do not need the Society to solve their problem — they need to know which door to knock on. Part of our work is simply good wayfinding: knowing the support that exists within the institute and pointing to it accurately.",
      "Requests are handled quietly. What a student shares with the Society stays with the Society, and nothing is forwarded anywhere without their say-so.",
    ],
    points: [
      "Clear signposting to academic, financial, and wellbeing support.",
      "Confidential handling of individual requests.",
      "No information forwarded without the student’s consent.",
    ],
  },
  {
    slug: "community-partners",
    title: "Community partners",
    summary:
      "Connect with organisations and university departments whose experience can make welfare efforts more useful and sustainable.",
    body: [
      "Student energy is plentiful; experience is not. Partnering with established organisations and campus departments is how the Society’s work stays grounded — their knowledge of what actually helps keeps our initiatives from being well-meant but ineffective.",
      "We look for partners whose values match ours: dignity for the people served, honesty about what is achievable, and a willingness to work with students as contributors rather than cheap labour.",
    ],
    points: [
      "Collaborations with NGOs, campus departments, and institutes.",
      "Partner experience guiding how each initiative is run.",
      "Long-term relationships over one-off arrangements.",
    ],
  },
  {
    slug: "student-leadership",
    title: "Student leadership",
    summary:
      "Create meaningful chances for students to organise, lead, make decisions, and learn through responsible service.",
    body: [
      "Running a welfare initiative teaches things a classroom cannot: how to plan under real constraints, coordinate people who are volunteering their time, and take responsibility when something does not go to plan.",
      "The Society deliberately rotates real decisions — budgets, schedules, partner conversations — to members, with support from those who have done it before, so leadership is learned by leading.",
    ],
    points: [
      "Members lead initiatives with guidance, not supervision.",
      "Real decisions and budgets held by students.",
      "Each activity ends with a review, so the next team starts ahead.",
    ],
  },
];

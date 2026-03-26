export const subjectCatalog = [
  {
    id: "science",
    title: "Science",
    path: "/subject/science",
    eyebrow: "Observe, test, explain",
    heroTitle: "Run vivid chemistry, biology, and physics labs from any classroom.",
    description:
      "Students can mix chemicals, wire circuits, and place organelles inside premium light-theme simulations built for hands-on understanding.",
    accent: "from-sky-400 via-cyan-400 to-emerald-400",
    glow: "bg-sky-100",
    highlights: ["Chemistry mixing lab", "Circuit builder", "Cell anatomy map"],
  },
  {
    id: "mathematics",
    title: "Mathematics",
    path: "/subject/mathematics",
    eyebrow: "See the pattern",
    heroTitle: "Turn equations and geometry into living visual stories.",
    description:
      "Learners explore dynamic triangles and algebraic balance with real-time feedback that makes abstract ideas concrete.",
    accent: "from-amber-300 via-orange-300 to-rose-300",
    glow: "bg-amber-100",
    highlights: ["Pythagorean visualizer", "Balancing scale", "Instant calculations"],
  },
  {
    id: "social-science",
    title: "Social Science",
    path: "/subject/social-science",
    eyebrow: "Connect people, place, and power",
    heroTitle:
      "Match maps, order events, sort civic roles, and classify economic activity with confidence.",
    description:
      "Interactive geography, history, civics, and economics games help students understand chronology, institutions, global awareness, and economic sectors.",
    accent: "from-emerald-300 via-lime-300 to-yellow-300",
    glow: "bg-emerald-100",
    highlights: [
      "Map matching",
      "Economics sector sort",
      "Timeline builder",
    ],
  },
];

export const subjectMap = Object.fromEntries(
  subjectCatalog.map((subject) => [subject.id, subject]),
);

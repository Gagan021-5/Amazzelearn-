import AlgebraBalance from "./mathematics/AlgebraBalance";
import PythagoreanVisualizer from "./mathematics/PythagoreanVisualizer";
import CellAnatomy from "./science/CellAnatomy";
import ChemistryLab from "./science/ChemistryLab";
import CircuitBuilder from "./science/CircuitBuilder";
import CivicsSort from "./social/CivicsSort";
import GeographyMatch from "./social/GeographyMatch";
import HistoryTimeline from "./social/HistoryTimeline";

export const simulationCatalog = [
  {
    id: "chemistry-lab",
    subjectId: "science",
    subjectLabel: "Science",
    topic: "Chemistry",
    title: "Chemistry Mixing Lab",
    summary:
      "Drag the correct reagent into a NaOH flask and trigger a smooth neutralization color shift.",
    challenge: "Neutralize the base",
    estimatedTime: "5-7 min",
    accent: "from-sky-400 to-emerald-400",
    instructions: [
      "Pick a reagent card from the side bench. You can drag it on desktop or tap-select it on mobile.",
      "Drop the reagent into the central flask that already contains sodium hydroxide (NaOH).",
      "Press the check button to test the mixture and watch the flask react.",
      "Use the overlay feedback to decide whether to clear the flask or lock in your successful mix.",
    ],
    component: ChemistryLab,
  },
  {
    id: "circuit-builder",
    subjectId: "science",
    subjectLabel: "Science",
    topic: "Physics",
    title: "Basic Circuit Builder",
    summary:
      "Assemble a working battery-wire-bulb circuit on a bright snap-grid board and light the bulb.",
    challenge: "Complete the circuit",
    estimatedTime: "6-8 min",
    accent: "from-indigo-400 to-amber-300",
    instructions: [
      "Drag or tap-select the battery, wire, and bulb from the inventory tray.",
      "Place each part into the correct snap zone on the circuit board.",
      "Check the circuit once all three zones are filled to see if the bulb powers on.",
      "If the feedback says to retry, swap the parts and test the board again.",
    ],
    component: CircuitBuilder,
  },
  {
    id: "cell-anatomy",
    subjectId: "science",
    subjectLabel: "Science",
    topic: "Biology",
    title: "Cell Anatomy Map",
    summary:
      "Place the nucleus and mitochondria into the correct organelle zones inside a large animated cell.",
    challenge: "Match the organelles",
    estimatedTime: "5-6 min",
    accent: "from-emerald-400 to-cyan-300",
    instructions: [
      "Choose an organelle card from the tray below the cell model.",
      "Drop it into the matching highlighted zone inside the cell membrane.",
      "Use the check button to verify both placements at once.",
      "Reset the board any time you want to practice another full attempt sequence.",
    ],
    component: CellAnatomy,
  },
  {
    id: "pythagorean-visualizer",
    subjectId: "mathematics",
    subjectLabel: "Mathematics",
    topic: "Geometry",
    title: "Pythagorean Theorem Visualizer",
    summary:
      "Resize a right triangle in real time and build a triangle whose hypotenuse measures exactly 10 units.",
    challenge: "Reach c = 10",
    estimatedTime: "4-6 min",
    accent: "from-amber-400 to-rose-400",
    instructions: [
      "Move the base and perpendicular sliders to reshape the right triangle.",
      "Watch the formula update instantly as the triangle and side squares resize.",
      "Try to create a triangle where the hypotenuse value is exactly 10.",
      "Press the check button when you think you have found a correct combination.",
    ],
    component: PythagoreanVisualizer,
  },
  {
    id: "algebra-balance",
    subjectId: "mathematics",
    subjectLabel: "Mathematics",
    topic: "Algebra",
    title: "Interactive Balancing Scale",
    summary:
      "Drag number weights onto both pans and solve the equation x + 2 = 5 by balancing the scale.",
    challenge: "Solve for x",
    estimatedTime: "5-7 min",
    accent: "from-orange-300 to-amber-500",
    instructions: [
      "Use the number cards to choose a value for x and a matching weight for the right pan.",
      "Drop one weight into the x slot and one weight into the right pan slot.",
      "Watch the beam tilt in response to the total value on each side of the scale.",
      "Check the scale to confirm whether your chosen value solves x + 2 = 5.",
    ],
    component: AlgebraBalance,
  },
  {
    id: "geography-match",
    subjectId: "social-science",
    subjectLabel: "Social Science",
    topic: "Geography",
    title: "Map Matching Game",
    summary:
      "Match country name labels to simplified SVG map silhouettes in a bright, classroom-friendly atlas.",
    challenge: "Label the map",
    estimatedTime: "5-6 min",
    accent: "from-emerald-400 to-lime-300",
    instructions: [
      "Drag or tap-select a country label from the card tray.",
      "Place the label on the matching highlighted country outline in the map panel.",
      "Check the full map once all slots are filled.",
      "Use feedback to adjust the labels until every map region is matched correctly.",
    ],
    component: GeographyMatch,
  },
  {
    id: "history-timeline",
    subjectId: "social-science",
    subjectLabel: "Social Science",
    topic: "History",
    title: "Chronological Timeline Builder",
    summary:
      "Arrange milestone event cards on a clean visual timeline by dragging them into the correct order.",
    challenge: "Build the sequence",
    estimatedTime: "6-8 min",
    accent: "from-lime-400 to-yellow-300",
    instructions: [
      "Read each event card and think about when it happened relative to the others.",
      "Drag the cards into the numbered timeline slots from earliest to latest.",
      "Press check to validate the entire sequence in one attempt.",
      "If the order is incorrect, clear a slot or restart the session to build a new arrangement.",
    ],
    component: HistoryTimeline,
  },
  {
    id: "civics-sort",
    subjectId: "social-science",
    subjectLabel: "Social Science",
    topic: "Civics",
    title: "Government Responsibilities Sort",
    summary:
      "Sort key responsibilities into Legislature, Executive, and Judiciary buckets with instant feedback.",
    challenge: "Sort the branches",
    estimatedTime: "6-7 min",
    accent: "from-emerald-500 to-yellow-400",
    instructions: [
      "Choose a responsibility card from the unsorted tray.",
      "Drop the card into the branch of government that handles that role.",
      "Check the full sorting board to validate all assignments together.",
      "Use the overlay hint to refine any bucket that still needs correction.",
    ],
    component: CivicsSort,
  },
];

export const simulationMap = Object.fromEntries(
  simulationCatalog.map((simulation) => [simulation.id, simulation]),
);

export const getSimulationsBySubject = (subjectId) =>
  simulationCatalog.filter((simulation) => simulation.subjectId === subjectId);

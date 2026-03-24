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
    title: "Chemistry Reaction Bench",
    summary:
      "Combine two reagents, inspect the balanced equation, and distinguish between dissolution, neutralization, precipitation, and gas evolution.",
    challenge: "Make NaCl + H2O accurately",
    estimatedTime: "7-9 min",
    accent: "from-sky-400 to-emerald-400",
    instructions: [
      "Choose two samples from the chemistry bench. You can drag them on desktop or tap-select them on mobile.",
      "Place one sample into Beaker A and one into Beaker B to load the reaction vessel.",
      "Read the equation, products, and observation panel before pressing check.",
      "Use the feedback to identify the accurate pair that produces sodium chloride and water.",
    ],
    component: ChemistryLab,
  },
  {
    id: "circuit-builder",
    subjectId: "science",
    subjectLabel: "Science",
    topic: "Physics",
    title: "Closed Circuit Workbench",
    summary:
      "Assemble a real energy pathway with a source, conductor, switch, and load, then diagnose why current does or does not flow.",
    challenge: "Light the lamp",
    estimatedTime: "7-9 min",
    accent: "from-indigo-400 to-amber-300",
    instructions: [
      "Choose a source, a path material, a switch state, and an output device from the tray.",
      "Place one part into each workbench slot to complete the circuit plan.",
      "Watch the schematic update to show whether the loop is open, insulating, or closed.",
      "Check the circuit to confirm that the lamp glows for the correct scientific reason.",
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
    title: "Right Triangle Builder",
    summary:
      "Drag side lengths onto a triangle model, compare the square areas, and build a valid Pythagorean triple with hypotenuse 10.",
    challenge: "Build c = 10",
    estimatedTime: "6-8 min",
    accent: "from-amber-400 to-rose-400",
    instructions: [
      "Choose three side lengths from the number bank.",
      "Drop one value on each side label for a, b, and c.",
      "Compare a^2 + b^2 with c^2 in the live theorem panel.",
      "Check the triangle once you believe you have built the target right triangle.",
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
    title: "Freedom to Republic Timeline",
    summary:
      "Arrange key milestones from the Revolt of 1857 through the Constitution of India by dragging them into chronological order.",
    challenge: "Build the chronology",
    estimatedTime: "7-9 min",
    accent: "from-lime-400 to-yellow-300",
    instructions: [
      "Read each event card carefully and use the dates to infer the right order.",
      "Drag the cards into the numbered timeline slots from earliest to latest.",
      "Review the current order panel before checking the full sequence.",
      "If the chronology is incorrect, clear any slot and rebuild the sequence.",
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

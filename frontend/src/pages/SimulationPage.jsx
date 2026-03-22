import { Link, useParams } from "react-router-dom";
import SimulationWrapper, {
  useSimulationController,
} from "../components/SimulationWrapper";
import { simulationMap } from "../simulations/registry";
import NotFoundPage from "./NotFoundPage";

export default function SimulationPage() {
  const { simulationId } = useParams();
  const simulation = simulationMap[simulationId];
  const controller = useSimulationController(10);

  if (!simulation) {
    return <NotFoundPage />;
  }

  const SimulationComponent = simulation.component;

  return (
    <div className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <Link to={`/subject/${simulation.subjectId}`} className="hover:text-slate-900">
            {simulation.subjectLabel}
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">{simulation.title}</span>
        </div>

        <SimulationWrapper simulation={simulation} controller={controller}>
          <SimulationComponent controller={controller} />
        </SimulationWrapper>
      </div>
    </div>
  );
}

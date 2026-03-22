import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl glass-card px-6 py-12 text-center sm:px-10">
        <p className="subject-badge">Page Not Found</p>
        <h1 className="mt-5 text-4xl font-bold">We could not find that route.</h1>
        <p className="mt-4 text-slate-600">
          Try jumping back to the homepage and entering a subject hub from
          there.
        </p>
        <Link to="/" className="soft-button-primary mt-8">
          Return Home
        </Link>
      </div>
    </div>
  );
}

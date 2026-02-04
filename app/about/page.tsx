import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Atlas Q&A",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          About
        </p>
        <h1 className="text-4xl font-black text-secondary">Why we built Atlas Q&A</h1>
        <p className="text-base text-gray-600">
          The Atlas Q&A board is a collaborative space for students to practice
          asking focused technical questions, give constructive feedback, and
          curate bite-sized knowledge. Each topic collects the toughest
          questions from the cohort so you can revisit the answers later.
        </p>
        <p className="text-base text-gray-600">
          Under the hood we leverage the Next.js App Router to co-locate data
          fetching, layouts, and loading states—so the experience feels fast and
          consistent no matter which topic you browse.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/"
          className="rounded-md border border-secondary px-6 py-3 font-medium text-secondary hover:bg-secondary/10"
        >
          Back to marketing page
        </Link>
        <Link
          href="/ui"
          className="rounded-md bg-secondary px-6 py-3 font-medium text-white hover:bg-secondary/90"
        >
          Go to the dashboard
        </Link>
      </div>
    </main>
  );
}

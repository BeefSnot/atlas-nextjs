import { Topic } from "@/components/Topic";
import { topics } from "@/lib/placeholder-data";
import Link from "next/link";

export default function UIDashboardPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Dashboard
        </p>
        <h1 className="text-3xl font-black text-secondary">Browse topics</h1>
        <p className="text-base text-gray-600">
          Pick a topic to review the most upvoted questions from your cohort or
          spin up a brand new discussion.
        </p>
      </header>
      <div className="flex gap-3">
        <Link
          href="/ui/topics/new"
          className="rounded-md bg-secondary px-4 py-2 text-white hover:bg-secondary/90"
        >
          Create a topic
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-secondary px-4 py-2 text-secondary hover:bg-secondary/10"
        >
          Learn more
        </Link>
      </div>
      <div className="rounded-md border border-atlas-white-300 bg-white">
        {topics.map((topic) => (
          <Topic key={topic.id} id={topic.id} text={topic.title} />
        ))}
      </div>
    </section>
  );
}

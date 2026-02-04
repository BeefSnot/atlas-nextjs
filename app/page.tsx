import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-secondary/5 px-6 text-center">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Atlas School</p>
        <h1 className="text-4xl font-black text-secondary md:text-5xl">
          Level up your questions with the Atlas Q&A board
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
          Explore popular engineering topics, ask thoughtful questions, and vote on the answers that help your classmates the most. Ready to jump in?
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/ui"
          className="rounded-md bg-secondary px-6 py-3 text-white shadow hover:bg-secondary/90"
        >
          Enter the dashboard
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-secondary px-6 py-3 text-secondary hover:bg-secondary/10"
        >
          Log in
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-secondary px-6 py-3 text-secondary hover:bg-secondary/10"
        >
          Learn about Atlas Q&A
        </Link>
      </div>
    </main>
  );
}

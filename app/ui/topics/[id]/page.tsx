import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { questions, topics } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const topic =
    topics.find((topicItem) => topicItem.id === resolvedParams.id) ?? notFound();

  const topicQuestions = questions
    .filter((question) => question.topic === topic.id)
    .sort((a, b) => b.votes - a.votes);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Topic
        </p>
        <h1 className="text-3xl font-black text-secondary flex items-center gap-3">
          #{topic.title}
        </h1>
        <p className="text-base text-gray-600">
          Crowdsource the clearest explanations for {topic.title}. Ask your own
          question or upvote the answers that resonate.
        </p>
      </header>
      <AskQuestion topic={topic.title} />
      <div className="rounded-md border border-atlas-white-300 bg-white">
        {topicQuestions.length === 0 ? (
          <p className="p-6 text-gray-500">
            No questions yet—be the first to ask something insightful.
          </p>
        ) : (
          topicQuestions.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              text={question.title}
              votes={question.votes}
            />
          ))
        )}
      </div>
    </section>
  );
}

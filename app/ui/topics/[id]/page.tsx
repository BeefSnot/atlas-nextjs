import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchQuestions, fetchTopic } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const topic = await fetchTopic(id);
  if (!topic) {
    notFound();
  }

  const topicQuestions = await fetchQuestions(topic.id);

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
  <AskQuestion topicId={topic.id} topicTitle={topic.title} />
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
              topicId={topic.id}
            />
          ))
        )}
      </div>
    </section>
  );
}

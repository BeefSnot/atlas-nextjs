import TopicLink from "./TopicLink";
import { fetchTopics } from "@/lib/data";

export default async function TopicLinks() {
  const topics = await fetchTopics();

  if (!topics || topics.length === 0) {
    return (
      <div className="rounded-md bg-gray-50 p-3 text-center text-sm text-gray-500">
        No topics yet
      </div>
    );
  }

  return (
    <>
      {topics.map((topic) => (
        <TopicLink key={topic.id} id={topic.id} title={topic.title} />
      ))}
    </>
  );
}

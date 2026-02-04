import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { upvoteQuestion } from "@/lib/actions";

type VoteButtonProps = {
  id: string;
  topicId: string;
};

export default function VoteButton({ id, topicId }: VoteButtonProps) {
  return (
    <form action={upvoteQuestion}>
      <input type="hidden" name="questionId" value={id} />
      <input type="hidden" name="topicId" value={topicId} />
      <button
        type="submit"
        className="h-8 w-8 min-w-[2rem] rounded-full ring-gray-200 hover:text-atlas-teal active:bg-primary active:text-white active:outline-hidden active:ring-2 active:ring-primary"
        aria-label="Upvote question"
      >
        <HandThumbUpIcon />
      </button>
    </form>
  );
}

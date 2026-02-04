import CreateTopicForm from "@/components/CreateTopicForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Topic | Atlas Q&A",
};

export default function NewTopicPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Topics
        </p>
        <h1 className="text-3xl font-black text-secondary">Create a topic</h1>
        <p className="text-base text-gray-600">
          Add a new subject so your classmates can start asking questions about
          it.
        </p>
      </header>
      <CreateTopicForm />
    </section>
  );
}

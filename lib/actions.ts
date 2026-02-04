"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { incrementVotes, insertQuestion, insertTopic } from "./data";

function getRequiredField(formData: FormData, field: string) {
	const value = formData.get(field);
	if (!value || typeof value !== "string") {
		throw new Error(`Missing field: ${field}`);
	}
	const trimmed = value.trim();
	if (!trimmed) {
		throw new Error(`Field cannot be empty: ${field}`);
	}
	return trimmed;
}

export async function createTopic(formData: FormData) {
	const title = getRequiredField(formData, "title");
	await insertTopic({ title });

	revalidatePath("/ui");
	revalidatePath("/ui/topics/new");
	redirect("/ui");
}

export async function askQuestion(formData: FormData) {
	const topicId = getRequiredField(formData, "topicId");
	const title = getRequiredField(formData, "title");

	await insertQuestion({ title, topic_id: topicId, votes: 0 });

	revalidatePath(`/ui/topics/${topicId}`);
	revalidatePath("/ui");
	redirect(`/ui/topics/${topicId}`);
}

export async function upvoteQuestion(formData: FormData) {
	const questionId = getRequiredField(formData, "questionId");
	const topicId = getRequiredField(formData, "topicId");

	await incrementVotes(questionId);

	revalidatePath(`/ui/topics/${topicId}`);
}
// Define your server actions here

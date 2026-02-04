"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { fetchUser, incrementVotes, insertQuestion, insertTopic } from "./data";
import { getSafeRedirectPath, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "./session";

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

async function setSessionCookie(userId: string, email: string) {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({ userId, email }), {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: SESSION_MAX_AGE,
		path: "/",
	});
}

async function deleteSessionCookie() {
	const cookieStore = await cookies();
	cookieStore.delete(SESSION_COOKIE_NAME);
}

export type LoginFormState = {
	error?: string;
};

const LOGIN_ERROR_MESSAGE = "Invalid email or password";

export async function login(prevState: LoginFormState | undefined, formData: FormData): Promise<LoginFormState> {
	try {
		const email = getRequiredField(formData, "email").toLowerCase();
		const password = getRequiredField(formData, "password");
		const redirectTo = getSafeRedirectPath(formData.get("redirectTo"));

		const user = await fetchUser(email);
		if (!user || user.password !== password) {
			return { error: LOGIN_ERROR_MESSAGE };
		}

		await setSessionCookie(user.id, user.email);
		redirect(redirectTo);
	} catch (error) {
		console.error("Login failed:", error);
		return { error: LOGIN_ERROR_MESSAGE };
	}
}

export async function signOut() {
	await deleteSessionCookie();
	redirect("/");
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

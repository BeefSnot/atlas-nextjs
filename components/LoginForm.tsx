"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login, LoginFormState } from "@/lib/actions";

const initialState: LoginFormState = {};

type LoginFormProps = {
  redirectTo: string;
};


export default function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="user@atlasmail.com"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-secondary focus:outline-hidden focus:ring-2 focus:ring-secondary"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue="123456"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-secondary focus:outline-hidden focus:ring-2 focus:ring-secondary"
          required
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

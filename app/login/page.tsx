import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | Atlas Q&A",
};

type LoginPageProps = {
  searchParams?: Promise<{ redirectTo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const redirectTo = typeof resolvedParams.redirectTo === "string" ? resolvedParams.redirectTo : "/ui";

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-8 px-6 py-12">
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Atlas Q&A</p>
        <h1 className="text-3xl font-black text-secondary">Log in to continue</h1>
        <p className="text-base text-gray-600">
          Use the sandbox credentials to explore the dashboard. Your session stays active for a week or until
          you sign out from the sidebar.
        </p>
      </div>
      <LoginForm redirectTo={redirectTo} />
    </main>
  );
}

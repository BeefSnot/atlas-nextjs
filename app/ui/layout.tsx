import SideNav from "@/components/Sidenav";

export default function UILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/5 md:flex-row">
      <aside className="w-full border-b border-gray-200 bg-white md:h-screen md:w-72 md:border-b-0 md:border-r">
        <SideNav />
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
}

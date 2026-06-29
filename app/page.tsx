import { AppShell, AppShellContent } from "@/components/layout";

export default function Home() {
  return (
    <AppShell>
      <AppShellContent>
        <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 text-muted-foreground">
          ThreeByTwo dashboard shell is running.
        </p>
      </AppShellContent>
    </AppShell>
  );
}
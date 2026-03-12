import ThoughtBoard from "@/components/ThoughtBoard";

export default async function Home() {
  return (
    <div className="min-h-screen p-2">
      <div className="w-full min-h-screen">
        <ThoughtBoard initialCount={10} />
      </div>
    </div>
  );
}

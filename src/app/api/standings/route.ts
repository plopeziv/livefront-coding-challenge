export async function GET() {
  const response = await fetch(
    "http://api.football-data.org/v4/competitions/PL/standings",
    {
      headers: { "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN },
    }
  );

  const data = await response.json();
  const transformed = { ...data, source: "proxied-through-nextjs" };

  return new Response(JSON.stringify(transformed), {
    headers: { "Content-Type": "application/json" },
  });
}

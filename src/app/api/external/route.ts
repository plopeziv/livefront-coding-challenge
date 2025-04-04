import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(
    "http://api.football-data.org/v4/competitions/PL/standings",
    {
      // Optional: forward some headers, add auth tokens, etc.
      headers: { "X-Auth-Token": "c3ff783183874ae782e67445fadf68c9" },
    }
  );

  // Transform or forward the response
  const data = await response.json();
  const transformed = { ...data, source: "proxied-through-nextjs" };

  return new Response(JSON.stringify(transformed), {
    headers: { "Content-Type": "application/json" },
  });
}

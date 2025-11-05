import { NextResponse } from "next/server";

type InstagramMedia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
};

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return NextResponse.json(
      {
        error: "Missing Instagram credentials. Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID.",
      },
      { status: 500 }
    );
  }

  const url = new URL(`https://graph.instagram.com/${userId}/media`);
  url.searchParams.set(
    "fields",
    "id,media_type,media_url,thumbnail_url,permalink,caption"
  );
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("limit", "12");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 900 } });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Upstream error", details: text }, { status: 502 });
    }
    const data = (await res.json()) as { data: InstagramMedia[] };

    const items = (data?.data ?? [])
      .map((m) => {
        const imageUrl = m.media_url || m.thumbnail_url;
        if (!imageUrl) return null;
        return {
          id: m.id,
          imageSrc: imageUrl,
          imageAlt: m.caption || "Instagram post",
          href: m.permalink,
        };
      })
      .filter(Boolean);

    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}



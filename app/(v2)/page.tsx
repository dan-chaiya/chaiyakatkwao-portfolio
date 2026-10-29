import Header from "@/components/v2/Header";
import HomeStage from "@/components/v2/HomeStage";
import { coverOf, hero, works } from "@/data/works";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chaiya Katkwao · Photography, Art, Production, Systems",
  description: "Archive of photography, art, production and systems work by Chaiya Katkwao, Bangkok.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  // One image from each work with pictures, in Index order.
  const column = works.flatMap((w) => {
    const frame = coverOf(w);
    return frame ? [{ no: w.no, slug: w.slug, title: w.title, frame }] : [];
  });

  return (
    <>
      <Header />
      <HomeStage hero={hero} column={column} />
    </>
  );
}

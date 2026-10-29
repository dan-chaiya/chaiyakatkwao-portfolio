import Header from "@/components/v2/Header";
import IndexView from "@/components/v2/IndexView";
import { works } from "@/data/works";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Index",
  description: "Every work by Chaiya Katkwao: photography, art, production and systems, by number, discipline and year.",
  path: "/works",
});

export default function IndexPage() {
  return (
    <>
      <Header />
      <IndexView works={works} />
    </>
  );
}

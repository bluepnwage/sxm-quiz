import { TableOfContents } from "@/components/toc";
import { Intro } from "./intro";
import { getHeadings } from "@/lib/get-content";
import { getBlog } from "@/lib/get-blogs";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = await getHeadings("introducing-sxm-quiz");
  const introData = await getBlog("introducing-sxm-quiz");
  if (data.error) throw new Error("");
  const headings = data.headings.map((e) => ({ title: e.value, id: e.data.hProperties.id }));
  return (
    <main className="container mx-auto mt-16">
      <Intro
        {...introData}
        readTime={data.readTime}
      />
      <div className="flex">
        <article
          className={`basis-3/4 prose-img:border prose-img:rounded-md prose-img:border-gray-100 prose-ul:list-disc prose-p:w-clamp prose-p:mb-4 prose-headings:font-medium prose-headings:mb-4 prose-h2:mt-12 
                prose-headings:font-heading prose-h2:text-4xl prose-ul:pl-4 text-lg prose-ul:mb-4 prose-a:text-primary-500 prose-a:underline
                prose-a:dark:text-primary-200 prose-img:dark:border-gray-700`}
        >
          {children}
        </article>
        <TableOfContents headings={headings} />
      </div>
    </main>
  );
}

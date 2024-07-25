import { getBlog, getBlogs } from "@/lib/get-blogs";
import { Intro } from "./intro";
import { TableOfContents } from "@/components/toc";
import { getHeadings } from "@/lib/get-content";

export default async function Page({ params }: { params: { slug: string } }) {
  const { Component, ...rest } = await getBlog(params.slug);
  const data = await getHeadings(params.slug, "blogs");
  if (data.error) throw new Error("");
  const headings = data.headings.map((e) => ({ title: e.value, id: e.data.hProperties.id }));

  return (
    <>
      <Intro {...rest} />
      <div className="flex">
        <article
          className={`basis-3/4 prose-img:border prose-img:rounded-md prose-img:border-gray-100 prose-ul:list-disc prose-p:w-clamp prose-p:mb-4 prose-headings:font-medium prose-headings:mb-4 prose-h2:mt-12 
                prose-headings:font-heading prose-h2:text-4xl prose-ul:pl-4 text-lg prose-ul:mb-4 prose-a:text-primary-500 prose-a:underline
                prose-a:dark:text-primary-200 prose-img:dark:border-gray-700`}
        >
          <Component />
        </article>
        <TableOfContents headings={headings} />
      </div>
    </>
  );
}

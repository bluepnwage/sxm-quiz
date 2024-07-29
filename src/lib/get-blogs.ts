import { Blog } from "@/types/blog.type";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import path from "path";
const blogsFolder = path.join(process.cwd(), "src", "app", "(marketing)", "blog", "(blog)");

type ImportType = {
  default: any;
  frontmatter: Blog;
};

export async function getBlogs() {
  const files = (await fs.readdir(blogsFolder)).filter((file) => !file.endsWith(".tsx"));
  const blogs: Blog[] = [];
  for (const file of files) {
    const { frontmatter } = (await import(`../app/(marketing)/blog/(blog)/${file}/page.mdx`)) as ImportType;
    blogs.push({
      ...frontmatter,
      slug: file.replace(".mdx", "")
    });
  }
  return blogs;
}

export async function getBlog(slug: string) {
  const files = await fs.readdir(blogsFolder);
  const file = files.find((folderContent) => folderContent.startsWith(slug));
  if (!file) notFound();
  const data = (await import(`../app/(marketing)/blog/(blog)/${slug}/page.mdx`)) as ImportType;
  return {
    ...data.frontmatter
  };
}

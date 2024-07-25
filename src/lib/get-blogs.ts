import { Blog } from "@/types/blog.type";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import path from "path";
const blogsFolder = path.join(process.cwd(), "src", "content", "blogs");

type ImportType = {
  default: any;
  frontmatter: Blog;
};

export async function getBlogs() {
  const files = await fs.readdir(blogsFolder);
  const blogs: Blog[] = [];
  for (const file of files) {
    const { frontmatter } = (await import(`../content/blogs/${file}`)) as ImportType;
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
  const data = (await import(`../content/blogs/${file}`)) as ImportType;
  return {
    Component: data.default,
    ...data.frontmatter
  };
}

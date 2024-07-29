import fs from "fs";
import path from "path";
import html from "remark-html";
import matter from "gray-matter";
import { remark } from "remark";
import { headingTree } from "./get-headings";

const contentFolder = path.join(process.cwd(), "src", "app", "(marketing)", "blog", "(blog)");

export type Heading = {
  value: string;
  data: { hProperties: { id: string } };
};

function getReadTime(str: string) {
  if (str === null || str === "") return 0;
  else str = str.toString();
  const wpm = 225;
  const words = str
    .replace(/(<([^>]+)>)/gi, "")
    .trim()
    .replaceAll("\n", " ")
    .split(" ")
    .filter((s) => s);
  return Math.ceil(words.length / wpm);
}

type Content =
  | {
      error: true;
      message: string;
    }
  | { error: false; readTime: number; headings: Heading[] };

export async function getHeadings(slug: string): Promise<Content> {
  try {
    const fileData = fs.readFileSync(path.join(contentFolder, slug, "page.mdx"), "utf-8");
    const data = matter(fileData);
    const contentHTML = await remark().use(html).use(headingTree).process(data.content);
    const readTime = getReadTime(data.content);
    return {
      headings: contentHTML.data.headings as Heading[],
      readTime,
      error: false
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: true, message: error.message };
    }
    return { error: true, message: "An error occurred" };
  }
}

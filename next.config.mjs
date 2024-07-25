import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@aomdev/ui": {
      transform: "@aomdev/ui/src/{{ kebabCase member }}",
      skipDefaultConversion: true
    }
  },
  images: {
    remotePatterns: [
      {
        hostname: "daiuieddiuwtzqtsxaoh.supabase.co"
      }
    ]
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeSlug]
  }
});

export default withMDX(nextConfig);

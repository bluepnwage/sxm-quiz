import { ShareMedia } from "./share-media";
import { Author } from "@/components/author";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@aomdev/ui";

type PropTypes = {
  title: string;
  thumbnail: string;
  intro: string;
  date: string;
  category: string;
  position: string;
  author: string;
};
export async function Intro({ category, date, intro, thumbnail, title, author, position }: PropTypes) {
  const { error, data } = await createClient()
    .from("profiles")
    .select("*")
    .eq("first_name", author.split(" ")[0])
    .single();
  if (error) return;
  return (
    <>
      <Badge
        color={"error"}
        size={"md"}
        className="mb-4"
      >
        {category}
      </Badge>
      <div className="mb-10">
        <header className=" mb-4">
          <h1
            id={"intro"}
            className={
              "text-4xl mb-5 lg:text-6xl leading-none text-gray-900 dark:text-gray-50 font-medium font-heading"
            }
          >
            {title}
          </h1>
        </header>
        <span className="text-gray-600 dark:text-gray-300 font-medium text-sm block mb-6">
          {date} - min read
        </span>
        <p
          style={{ width: "clamp(36ch, 90%, 75ch)" }}
          className="text-lg lg:text-xl mb-4 leading-relaxed"
        >
          {intro}
        </p>
      </div>
      <img
        src={thumbnail}
        alt={""}
        className={"rounded-xl mb-10 "}
      />
      <div className="flex lg:flex-row lg:gap-0 gap-4 flex-col lg:items-end lg:justify-between mb-12 lg:mb-16">
        <Author
          firstName={data.first_name}
          lastName={data.last_name}
          img={data.profile_image}
          position={data.role === "admin" ? "SXM Quiz Core Team" : "Contributor"}
        />
        <ShareMedia />
      </div>
    </>
  );
}

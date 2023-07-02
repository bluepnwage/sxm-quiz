import { ActionIcon, Badge, Title } from "@aomdev/ui";
import { Share } from "lucide-react";
import { useQuiz } from "../container/container.context";
import { RelatedArticles } from "../related-articles";
import { getCatColor } from "@/get-category-color";
import { useParams } from "next/navigation";

type PropTypes = {
  count: number;
};

export function Description({ count }: PropTypes) {
  const { title, category: type, description, average } = useQuiz();
  const { slug } = useParams();

  const onShare = async () => {
    await navigator.share({
      url: `${location.origin}/quiz/${slug}`,
      title: `SXM Quiz - ${title}`,
      text: description
    });
  };

  return (
    <>
      <Title order={1} className="font-heading font-medium text-2xl mb-2">
        {title}
      </Title>
      <div className="flex justify-between items-end mb-6">
        <Badge color={getCatColor(type)}>{type}</Badge>
        <ActionIcon onClick={onShare} variant={"subtle"} size={"md"}>
          <Share size={"75%"} />
        </ActionIcon>
      </div>
      <p className="mb-8">{description}</p>
      <div className="flex justify-between">
        <div className="text-center grow">
          <span className="block text-neutral-600 font-medium text-sm mb-2">Times completed</span>
          <span className="font-semibold font-heading text-xl">{count}</span>
        </div>
        <div className="w-[1px] bg-neutral-300" />
        <div className="text-center grow">
          <span className="block text-neutral-600 font-medium text-sm mb-2">Average score</span>
          <span className="font-semibold font-heading text-xl">{average}%</span>
        </div>
      </div>
      <hr className="text-neutral-100 w-full h-[1px] my-4" />
      <RelatedArticles />
    </>
  );
}

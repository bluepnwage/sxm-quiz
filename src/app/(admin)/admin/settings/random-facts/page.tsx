import { Title } from "@aomdev/ui";
import { FactContainer } from "./fact-container";
import { getRandomFacts } from "@/lib/data-fetch/get-random-facts";

export default async function RandomFacts() {
  const data = await getRandomFacts();
  const sorted = data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  return (
    <>
      <div className="border-b mx-auto container border-b-neutral-700 pb-8  mt-16">
        <Title className="font-heading font-semibold text-2xl ">Random facts</Title>
      </div>
      <div className="my-16 mx-auto container ">
        <FactContainer facts={sorted}>
          <Title
            order={1}
            className="font-heading text-4xl font-semibold mb-8 text-gray-900 dark:text-gray-50"
          >
            All facts
          </Title>
        </FactContainer>
      </div>
    </>
  );
}

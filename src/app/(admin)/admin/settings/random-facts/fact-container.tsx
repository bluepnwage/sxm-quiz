"use client";
import { RandomFact } from "@/types/custom.types";
import { Fact, Facts } from "./fact";
import { FactForm } from "./fact-form";
import { useOptimistic, useState } from "react";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { Search } from "lucide-react";

type PropTypes = {
  facts: RandomFact[];
  children: React.ReactNode;
};

export function FactContainer({ facts, children }: PropTypes) {
  const [optimisticFacts, setOptimistic] = useOptimistic(facts);
  const [filter, setFilter] = useState("");

  const addOptimisticFact = (fact: RandomFact) => {
    setOptimistic((state) => [fact, ...state]);
  };

  const removeOptimisticFact = (id: string) => {
    setOptimistic((state) => state.filter((f) => f.id !== id));
  };

  const filteredFacts = optimisticFacts.filter((fact) =>
    fact.description
      .toLowerCase()
      .trim()
      .replaceAll(" ", "")
      .includes(filter.toLowerCase().trim().replaceAll(" ", ""))
  );

  return (
    <div className="grid grid-cols-2 gap-24">
      <div>
        {children}
        <div
          className={inputStyles({
            className: "px-2 text-sm flex gap-2 justify-between items-center w-full "
          })}
        >
          <input
            onChange={(e) => setFilter(e.currentTarget.value)}
            placeholder="Search"
            className="appearance-none w-full h-full bg-transparent outline-none pl-8"
          />

          <Search
            className="absolute pointer-events-none"
            size={14}
          />
        </div>
        <Facts>
          {filteredFacts.map((fact, index) => {
            if (index === 0) {
              console.log(`random-fact-${fact.description}`);
            }
            return (
              <Fact
                removeOptimisticFact={removeOptimisticFact.bind(null, fact.id)}
                {...fact}
                key={`random-fact-${fact.description}`}
              />
            );
          })}
        </Facts>
      </div>
      <FactForm addOptimisticFact={addOptimisticFact} />
    </div>
  );
}

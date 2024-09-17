"use client";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type PropTypes = {
  label: string;
  href: string;
  Icon: React.ReactNode;
  subLinks: { label: string; href: string }[];
};

export function SubLinks({ Icon, label, subLinks }: PropTypes) {
  const [state, setState] = useState(false);
  return (
    <div>
      <button
        aria-expanded={state}
        className="block w-full"
        onClick={() => setState((prev) => !prev)}
      >
        <div className="flex items-center justify-between hover:dark:bg-neutral-600/30 hover:bg-neutral-200/30 w-full p-2 rounded">
          <div>
            {Icon}
            {label}
          </div>
          <ChevronUp
            size={16}
            data-open={state}
            className=" dark:text-gray-300 data-[open=false]:rotate-180 ease transition-transform"
          />
        </div>
      </button>
      {state && (
        <ul className="ml-7 border-l mt-4 py-4 border-l-neutral-700 pl-4 w-full">
          {subLinks.map((subLink) => {
            return (
              <li key={subLink.href}>
                <Link
                  href={subLink.href}
                  className=" hover:dark:bg-neutral-600/30 hover:bg-neutral-200/30 w-full p-2 rounded"
                >
                  {subLink.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

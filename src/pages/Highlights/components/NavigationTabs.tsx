import Container from "@/components/common/Container";
import { useState } from "react";

const TABS = [
  "ALL HIGHLIGHTS",
  "GAME HIGHLIGHTS",
  "TOURNAMENTS",
  "TOP PLAYS",
  "SEASON REEL",
  "SHOT BREAKDOWN",
];

export function NavigationTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="w-full border-b border-white/10 mb-8 pt-4">
      <Container className="">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-condensed font-bold tracking-widest text-sm py-2 px-4 transition-all duration-300 whitespace-nowrap
 ${
   activeTab === tab
     ? "text-kh-pink border border-kh-pink"
     : "text-gray-400 border border-transparent hover:text-white"
 } `}
            >
              {tab}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}

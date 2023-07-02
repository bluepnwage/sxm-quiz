import { NavItem } from "./nav-item";
import { Searchbar } from "./searchbar";

export function Nav() {
  return (
    <header className="border-b  z-50 bg-white sticky top-0 left-0 items-center border-neutral-100">
      <div className="w-11/12 lg:container mx-auto h-full flex items-center justify-between">
        <div className="flex gap-10 items-center">
          <span className="font-heading leading-none text-2xl font-medium hidden lg:inline-block">
            SXM Quiz
          </span>
          <nav className="h-full">
            <ul className="flex h-full gap-4">
              <NavItem href={"/"}>Home</NavItem>
              <NavItem href={"/quiz"}>Quiz</NavItem>
              <NavItem href={"/learn"}>Learn</NavItem>
              <NavItem href={"/blog"}>Blog</NavItem>
            </ul>
          </nav>
        </div>
        <div className="lg:flex items-center gap-4 hidden ">
          <Searchbar />
        </div>
      </div>
    </header>
  );
}
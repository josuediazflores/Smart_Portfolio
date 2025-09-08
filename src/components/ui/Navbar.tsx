import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AIChatButton from "./AIChatButton";
export default function Navbar() {
  return (
    <header className="sticky top-0 bg-background">
      <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-3 px-3 py-4">
        <nav className="space-x-4 font-medium ">
          <Link
            href="/"
            className="relative inline-block
             after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
             after:bg-current after:transition-all after:duration-300
             hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="https://docs.google.com/document/d/1qOoDgDwUmOAClHW3tY40I3C1_TTFSWpNk2J_5Rku9Q8/edit?usp=sharing"
            className="relative inline-block
             after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
             after:bg-current after:transition-all after:duration-300
             hover:after:w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>
          <Link
            href="https://www.linkedin.com/in/josuediazfl/"
            className="relative inline-block
             after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
             after:bg-current after:transition-all after:duration-300
             hover:after:w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/josuediazflores"
            className="relative inline-block
             after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
             after:bg-current after:transition-all after:duration-300
             hover:after:w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            href="/about"
            className="relative inline-block
             after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
             after:bg-current after:transition-all after:duration-300
             hover:after:w-full"
          >
            About Me
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <AIChatButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

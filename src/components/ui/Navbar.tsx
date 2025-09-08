import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AIChatButton from "./AIChatButton";
export default function Navbar() {

  return <header className="sticky top-0 bg-background">
      <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-3 px-3 py-4">
<nav className = "space-x-4 font-medium">
<Link href = "https://docs.google.com/document/d/1qOoDgDwUmOAClHW3tY40I3C1_TTFSWpNk2J_5Rku9Q8/edit?usp=sharing">Resume</Link>
<Link href = "https://www.linkedin.com/in/josuediazfl/">LinkedIn</Link>
<Link href = "https://github.com/josuediazflores">GitHub</Link>
</nav>
<div className="flex items-center gap-4">
    <AIChatButton />
    <ThemeToggle />
</div>
      </div>
    </header>
  
}

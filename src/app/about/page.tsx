// app/about/page.tsx
import Link from "next/link";
import Image from "next/image";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import duneCover from "@/assets/DUNE.jpg";

export const metadata = {
  title: "About Me",
  description: "Learn more about Josue Diaz Flores and his work.",
};

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <H1>About Me</H1>

      <section className="space-y-3">
        <p>
          My name is Josue Diaz Flores. I am a CS Student at Santa Clara
          University (SCU). I have experience building sites as well as
          implenting AI into my projects as shown with the AI Chatbot.{" "}
        </p>
      </section>

      <hr className="border-muted" />

      <section className="space-y-3">
        <H2>Skills</H2>
        <p>
          I work with <strong>React</strong>, <strong>Next.js</strong>, and{" "}
          <strong>Node.js</strong>, plus Tailwind and TypeScript. I grew up
          coding in <strong>C++</strong> and <strong>Java</strong> although I am
          pretty adaptable in any language.
        </p>
      </section>

      <hr className="border-muted" />

      <section className="space-y-3">
        <H2>Hackathons</H2>
        <ul className="list-inside list-disc space-y-4">
          <li>
            <a>
              <strong>Y Combinator Agentic Payment</strong> -
            </a>
            Used Locus MCP and Anthropic models to build an agentic payment system that will automate payment by only using natural language commands.
          </li>

          <li>
            <strong>NVIDIA Hackathon</strong> – Built an AI-powered lecture summarization tool using NVIDIA&apos;s Nemotron models and Parakeet-CTC for automatic speech recognition. Collaborated with my team to help students get better support when reviewing class recordings.
          </li>

          <li>
            <strong>AWSxInrix Hackathon</strong> – Built a Dashboard with AWS to monitor student attendance,point systems, and more. This site was to support a non proft organization that gives scholarships to students in need.
          </li>
        </ul>
      </section>

      <hr className="border-muted" />

      <section className="space-y-3">
        <H2>Education</H2>
        <div className="space-y-6 pl-4 border-l-2 border-muted">
          {/* De Anza College */}
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold text-lg">De Anza College</h3>
              <p className="text-sm text-muted-foreground">Cupertino, CA</p>
            </div>
            <p className="text-sm text-muted-foreground">Sept. 2022 - June 2025</p>
            <p className="font-medium">Associates in Computer Science</p>
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Coursework:</p>
              <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                <li>Discrete Mathematics</li>
                <li>Data Structures and Algorithms</li>
                <li>Calculus 1, 2 and 3</li>
              </ul>
            </div>
          </div>

          {/* Santa Clara University */}
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold text-lg">Santa Clara University</h3>
              <p className="text-sm text-muted-foreground">Santa Clara, CA</p>
            </div>
            <p className="text-sm text-muted-foreground">Sept. 2025 - Jun. 2027</p>
            <p className="font-medium">Bachelor of Science in Computer Science</p>
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Activities:</p>
              <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                <li>Theta Tau Professional Engineering Society</li>
                <li>Association of Computing Machinery (ACM)</li>
                <li>Artificial Intelligence Collaborate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-muted" />

      <section className="space-y-3">
        <H2>Hobbies</H2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Image
            src={duneCover}
            alt="Dune book cover"
            className="h-auto w-full max-w-[220px] rounded-lg border border-muted sm:shrink-0"
            priority
          />
          <p>
            I am currently finishing the first book of Dune and going to read the second book soon in acticipation for the movie.
          </p>
        </div>
      </section>
    </section>
  );
}

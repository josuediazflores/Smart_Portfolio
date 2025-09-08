// app/about/page.tsx
import Link from "next/link";
import Image from "next/image";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";

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
        <H2>Side projects</H2>
        <ul className="list-inside list-disc">
          <li>
            <a
              href="https://www.josuediazflores.com/"
              className="text-primary underline-offset-4 hover:underline"
            >
              SmartPortfolio
            </a>{" "}
            – This Site :D. Designed to have a chatbot with information about myself.
          </li>
          
        </ul>
      </section>

      <hr className="border-muted" />

      <section className="space-y-3">
        <H2>Hobbies</H2>
        <p>I run, go to the gym, read and enjoy exploring mulitiple CS fields. Im currently finishing the first book of Dune and  creating more side projects.</p>
      </section>
    </section>
  );
}

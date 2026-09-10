import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Legacy } from "@/components/sections/Legacy";
import { Programs } from "@/components/sections/Programs";
import { Ticker } from "@/components/sections/Ticker";
import { Method } from "@/components/sections/Method";
import { Branches } from "@/components/sections/Branches";
import { Membership } from "@/components/sections/Membership";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { AnswerBlock } from "@/components/AnswerBlock";
import { answers } from "@/lib/content";

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Legacy />
        <Programs />
        <Ticker />
        <Method />
        <Branches />
        <Membership />
        <Testimonials />
        <AnswerBlock
          heading="Straight answers"
          intro="The questions people search for before choosing a gym in Hyderabad."
          items={answers}
        />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}

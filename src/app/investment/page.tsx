"use client";
import InvestmentHero from "@/components/investment/InvestmentHero";
import InvestmentBanner from "@/components/investment/investment-banner";
import Testimonial from "@/components/testimonials/testimonial";
import Footer from "@/components/shared/footer";
import InvestmentPackages from "@/components/investment/InvestmentPackages";
import InvestmentValueProps from "@/components/investment/InvestmentValueProps";
import NextSteps from "@/components/investment/next-steps";
import NextSteps2 from "@/components/investment/next-steps-2";

export default function Investment() {
  return (
    <div className="w-screen relative">
      <InvestmentHero />
      <InvestmentValueProps/>
      <InvestmentBanner />
      <Testimonial
        bgColor="#D0DDEA"
        textColor="#403528"
        accentColor="#403528"
        borderColor="#403528"
        headerColor="#403528"
        underlineColor="#fff"
        buttonColor="#403528"
        imgBg="#1e1e1e"
        imgBorder="#F3EADB"
      />
      <InvestmentPackages />
      <NextSteps/>
      <NextSteps2/>
      <Footer />
    </div>
  );
}

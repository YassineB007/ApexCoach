import AboutSection from "./AboutSection";
import HeaderNav from "./HeaderNav";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import LeadCaptureSection from "./LeadCaptureSection";
import ProgramsSection from "./ProgramsSection";
import Reveal from "./Reveal";
import SiteFooter from "./SiteFooter";
import TestimonialsCarousel from "./TestimonialsCarousel";

/**
 * SUPABASE integration map (high level):
 * - `programs` → ProgramsSection (server component fetch + pass props)
 * - `testimonials` + Storage → TestimonialsCarousel
 * - `coaches` / `profiles` → AboutSection
 * - `leads` → LeadCaptureSection submit handler
 * - `site_settings` → booking URL, socials, hero image
 * - `newsletter_subscribers` → NewsletterForm
 */

export default function LandingPage() {
  return (
    <>
      <HeaderNav />
      <main className="flex-1">
        <HeroSection />
        <Reveal>
          <AboutSection />
        </Reveal>
        <Reveal delayMs={60}>
          <ProgramsSection />
        </Reveal>
        <Reveal delayMs={40}>
          <TestimonialsCarousel />
        </Reveal>
        <Reveal delayMs={60}>
          <HowItWorksSection />
        </Reveal>
        <Reveal delayMs={40}>
          <LeadCaptureSection />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}

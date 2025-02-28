import Header from "@/components/Header"
import Hero from "@/components/Hero"
import FeatureSection from "@/components/FeatureSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeatureSection
          title="Build Your Resume"
          description="Create a professional resume in minutes with our easy-to-use builder."
          shortDescription="Choose from a variety of templates and customize to your heart's content."
          imageSrc="/resume-builder.png"
          imageAlt="Resume Builder Screenshot"
          direction="right"
        />
        <FeatureSection
          title="Create Portfolio"
          description="Transform your resume into a stunning portfolio."
          shortDescription="Showcase your projects, skills, and achievements with our beautiful templates."
          imageSrc="/portfolio-creator.png"
          imageAlt="Portfolio Creator Screenshot"
          direction="left"
        />
        <FeatureSection
          title="Host for Free"
          description="Get your portfolio online in seconds."
          shortDescription="Host your site under a custom domain, all for free. No hidden costs, just pure awesomeness."
          imageSrc="/hosting-service.png"
          imageAlt="Hosting Service Screenshot"
          direction="right"
        />
      </main>
      <Footer />
    </div>
  )
}


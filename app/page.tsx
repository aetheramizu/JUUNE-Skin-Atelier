import Navbar from "../components/Navbar"
import Hero   from "../components/Hero"
import FeaturedTreatments from "../components/FeaturedTreatments"
import ResultsSection from "../components/ResultsSection"
import Testimonials from "../components/Testimonials"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedTreatments />
        <ResultsSection />
        <Testimonials />
      </main>
    </>
  )
}

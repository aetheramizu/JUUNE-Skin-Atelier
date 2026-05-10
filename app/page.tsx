import Navbar from "../components/Navbar"
import Hero   from "../components/Hero"
import FeaturedTreatments from "../components/FeaturedTreatments"
import ResultsSection from "../components/ResultsSection"
import Testimonials from "../components/Testimonials"
import AboutDoctor from "../components/AboutDoctor"
import ClinicExperience from "../components/ClinicExperience"
import FinalCTA from "../components/FinalCTA"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedTreatments />
        <ResultsSection />
        <Testimonials />
        <AboutDoctor />
        <ClinicExperience />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

import Navbar from "../components/Navbar"
import Hero   from "../components/Hero"
import FeaturedTreatments from "../components/FeaturedTreatments"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedTreatments />
      </main>
    </>
  )
}
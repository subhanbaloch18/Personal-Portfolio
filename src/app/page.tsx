import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Hackathons from "@/components/Hackathons";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Hackathons />
        <Skills />
        <Projects />
        <GitHubStats />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

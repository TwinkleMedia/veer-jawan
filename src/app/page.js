import About from "@/components/About";
import Banner from "@/components/Banner";
import EventsCarousel from "@/components/EventCarousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Latestpost from "@/components/Latestpost";
import { Topnav } from "@/components/Topnav";

export default function Home() {
  return (
    <>
      <Topnav />
      <Header />
      <Banner />
      <About />
      <Latestpost />
      <EventsCarousel/>
      <Footer />
    </>
  );
}
  
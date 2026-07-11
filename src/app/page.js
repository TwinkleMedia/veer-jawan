import About from "@/components/About";
import Banner from "@/components/Banner";
import CertificatesSection from "@/components/certificates";
import EventsCarousel from "@/components/EventCarousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Latestpost from "@/components/Latestpost";
import { Topnav } from "@/components/Topnav";
import DonateButton from "@/components/DonateButton"
import WhatsAppButton from "@/components/WhatsAppButton";
import EventPopupButton from "@/components/EventPopupButton";
import ReelWidget from "@/components/ReelWidget";

export default function Home() {
  return (
    <>
      <Topnav />
      <Header />
      <Banner />
      <About />
      <Latestpost />
      <CertificatesSection/>
      <EventsCarousel/>
      <Footer />
      <DonateButton/>
      <ReelWidget />
      <EventPopupButton/>
      <WhatsAppButton/>
    </>
  );
}
  
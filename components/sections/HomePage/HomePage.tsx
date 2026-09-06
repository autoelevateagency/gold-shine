"use client";

import { useEffect } from "react";
import { About } from "@/components/sections/About/About";
import { Booking } from "@/components/sections/Booking/Booking";
import { Contact } from "@/components/sections/Contact/Contact";
import { Footer } from "@/components/sections/Footer/Footer";
import { Hero } from "@/components/sections/Hero/Hero";
import { Nav } from "@/components/sections/Nav/Nav";
import { Services } from "@/components/sections/Services/Services";
import { Showcase } from "@/components/sections/Showcase/Showcase";
import { Testimonial } from "@/components/sections/Testimonial/Testimonial";
import { LocaleProvider, useLocale } from "@/context/LocaleContext";

const HomeContent = (): React.ReactElement => {
  const { dir } = useLocale();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === "rtl" ? "ur" : "en";
  }, [dir]);

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Showcase />
      <Testimonial />
      <About />
      <Contact />
      <Booking />
      <Footer />
    </>
  );
};

export const HomePage = (): React.ReactElement => (
  <LocaleProvider initialLocale="EN">
    <HomeContent />
  </LocaleProvider>
);

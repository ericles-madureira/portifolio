"use client";

import { useCallback, useState } from "react";
import PreloaderCurtain from "./PreloaderCurtain";
import Navbar from "./Navbar";
import Dock from "./Dock";
import Hero from "./Hero";
import Projects from "./Projects";
import About from "./About";
import Timeline from "./Timeline";
import Skills from "./Skills";
import Differentials from "./Differentials";
import Footer from "./Footer";
import CursorGlow from "./CursorGlow";
import SmoothAnchors from "./SmoothAnchors";
import { LanguageProvider } from "@/lib/i18n";

export default function Site() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <LanguageProvider>
      <PreloaderCurtain onDone={onDone} />
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <Projects />
        <About />
        <Timeline />
        <Skills />
        <Differentials />
      </main>
      <Footer />
      <Dock ready={ready} />
      <CursorGlow />
      <SmoothAnchors />
    </LanguageProvider>
  );
}

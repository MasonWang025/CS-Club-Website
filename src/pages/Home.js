import React, { useEffect, useState } from "react";
import gsap from "gsap";

import Banner from "../components/Banner";
import Sections from "../components/Sections";
import IntroOverlay from "../components/IntroOverlay";

const homeAnimation = (completeAnimation, landscape) => {
  const tl = gsap.timeline(); // timeline
  if (!landscape) {
    // mobile landscape == no animations because screw landscape mobile
    tl.from(".line span", 1.7, {
      opacity: 0,
      delay: 0.5,
      y: 100,
      ease: "power4.out",
      skewY: 8,
      stagger: {
        amount: 0.32,
      },
    })
      .to(".complete-overlay", 0, { height: "50%" })
      .to(".overlay-top", 1.5, {
        height: 0,
        ease: "power3.inOut",
        stagger: 0.32,
      })
      .to(".complete-overlay", 0, { height: 0, delay: -0.8 })
      .to(".overlay-bottom", 1.5, {
        width: 0,
        ease: "power3.inOut",
        delay: -0.8,
        stagger: 0.32,
      })
      .from(".section-image img", 2, {
        scale: 1.4,
        ease: "power3.inOut",
        delay: -2.8,
        stagger: 0.32,
      })
      .fromTo(
        ".header",
        { css: { backgroundColor: "transparent" } },
        {
          css: {
            backgroundColor: "rgba(255, 255, 255, 00.92)",
            zIndex: 250,
          },
          delay: -0.5,
          duration: 0.6,
          onComplete: completeAnimation,
        }
      );
  } else {
    tl.from(".line span", 1.2, {
      opacity: 0,
      delay: 0.5,
      y: 100,
      ease: "power4.out",
      skewY: 8,
    })
      .from(".btn-row", 0.5, { opacity: 0 })
      .to(".header", 0, {
        css: {
          backgroundColor: "rgba(255, 255, 255, 00.92)",
          zIndex: 250,
          onComplete: completeAnimation,
        },
      });
  }
};

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);

  const completeAnimation = () => {
    setAnimationComplete(true);
  };

  useEffect(() => {
    homeAnimation(
      completeAnimation,
      window.innerWidth > 400 &&
        window.innerWidth < 960 &&
        window.innerHeight < 480
    );
  }, []);

  return (
    <div>
      {!animationComplete && <IntroOverlay />}
      <Banner />
      <Sections />
    </div>
  );
}

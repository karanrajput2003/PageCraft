import React, { useRef, useEffect } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const cards = section.querySelectorAll('.about-card');

    gsap.from(cards, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      }
    });

    gsap.to(".parallax-bg", {
      y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * ScrollTrigger.maxScroll(window),
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0.5,
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black py-24">
      <div className="parallax-bg absolute inset-0 z-0" data-speed="0.8">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      </div>
      <div className="parallax-bg absolute inset-0 z-10" data-speed="0.9">
        <div className="h-full w-full">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-20">
        <AnimatedTitle
            title="<b>A</b>bout Us"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          /> 
          <br />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AboutCard
            title="Our Mission"
            content="Empowering businesses and creators with intuitive tools to build stunning websites that leave lasting impressions."
            icon="🚀"
          />
          <AboutCard
            title="Our Vision"
            content="To revolutionize web design by making it accessible, enjoyable, and limitlessly creative for everyone."
            icon="🌟"
          />
          <AboutCard
            title="Our Values"
            content="Innovation, simplicity, and user-centric design are at the core of everything we do at Zentry."
            icon="💡"
          />
          <AboutCard
            title="Our Impact"
            content="Thousands of businesses have transformed their online presence with Zentry, reaching millions worldwide."
            icon="🌍"
          />
        </div>
      </div>
    </section>
  );
};

const AboutCard = ({ title, content, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="about-card bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
      <p className="text-gray-300">{content}</p>
    </motion.div>
  );
};

export default About;


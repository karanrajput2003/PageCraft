import gsap from "gsap";
import { useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        "#hero-frame",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
      );

      gsap.fromTo(
        ".hero-button",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.7 }
      );

      gsap.fromTo(
        ".hero-heading",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#hero-frame",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            reverse: true,
          },
        }
      );

      gsap.fromTo(
        ".hero-button",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: "#hero-frame",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            reverse: true,
          },
        }
      );
    }
  }, [loading]);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-black text-white">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-black">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {!loading && (
        <div
          id="hero-frame"
          className="relative z-10 h-dvh w-screen overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 opacity-80"></div>
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
            </div>
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>

          <div className="absolute left-6 top-20 z-40 size-full px-5 sm:px-10">
            <h1 className="special-font hero-heading bg-clip-text text-gray-100 bg-gradient-to-r from-gold-500 to-yellow-400 text-6xl font-bold drop-shadow-md">
              <span>Build Websites</span>
              <br />
              That <b>Shine</b>
            </h1>
            <p className="mt-5 max-w-2xl font-robert-regular text-gray-300 text-lg">
              Unlock creativity with drag-and-drop ease. Explore our templates
              and make your vision come alive.
            </p>
            <Button
              id="start-now"
              title="Start Now"
              leftIcon={<TiLocationArrow />}
              containerClass="hero-button bg-gold-500 mt-8 px-6 py-3 text-lg font-bold text-black rounded-full shadow-md hover:bg-gold-600 flex items-center gap-2 transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;

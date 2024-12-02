import React, { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { motion } from "framer-motion"; // Importing framer-motion for animation
import AnimatedTitle from './AnimatedTitle';
import { Layout, Paintbrush, Sliders, Search, Sparkles } from 'lucide-react';

// BentoTilt Component (used for tilting effect)
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// BentoCard Component (used for feature cards)
export const BentoCard = ({ src, title, description, isComingSoon, backgroundColor, icon: Icon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className={`relative z-10 flex size-full flex-col justify-between p-5 text-blue-50 ${backgroundColor}`}>
        <div>
        {Icon && <Icon size={24}/>}
          <motion.h1 
            className="bento-title special-font"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className="mt-3 max-w-64 text-xs md:text-base"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {isComingSoon && (
          <motion.div
            ref={hoverButtonRef}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Features Component (where BentoCards are used)
const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`bg-gradient-to-b from-black via-purple-900 to-black pb-52 ${isVisible ? 'animate-fade-in' : ''}`}>
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
      <p className="font-general text-sm uppercase md:text-[10px] text-center">
          Features
        </p>
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
              <AnimatedTitle
            title="<b>W</b>hat We O<b>f</b><b>f</b>er"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black"
          /> 
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-32 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            title={
              <>
                Powerful <b>Templates</b>
              </>
            }
            description="Choose from a wide variety of templates to get started with your web project quickly."
            backgroundColor="bg-gradient-to-br from-purple-500 to-blue-600"
            icon={Layout}
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              title={
                <>
                  Responsive <b>Design</b>
                </>
              }
              description="Ensure your website looks great on any device with our responsive design tools."
              backgroundColor="bg-gradient-to-br from-green-400 to-teal-500"
              icon={Paintbrush}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              title={
                <>
                  Easy <b>Customizations</b>
                </>
              }
              description="Personalize every aspect of your website using our intuitive drag-and-drop editor."
              backgroundColor="bg-gradient-to-br from-yellow-400 to-orange-500"
              icon={Sliders}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              title={
                <>
                  SEO <b>Optimized</b>
                </>
              }
              description="Boost your website's visibility with our built-in SEO tools and features."
              backgroundColor="bg-gradient-to-br from-red-500 to-pink-600"
              icon={Search}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 h-96 w-full">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <motion.h1 
                className="bento-title special-font max-w-64 text-black"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                More exciting features <b>coming soon</b>!
              </motion.h1>

              <TiLocationArrow className="m-5 scale-[5] self-end text-blue-50 opacity-10" />
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;

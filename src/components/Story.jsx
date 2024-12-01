import gsap from "gsap";
import { useRef, useState } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
    gsap.to(`.answer-${question.replace(/\s+/g, '-')}`, {
      height: isOpen ? 0 : "auto",
      opacity: isOpen ? 0 : 1,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  return (
    <div className="mb-6 border-b border-gray-700 pb-4 w-full">
      <button
        className="flex w-full items-center justify-between text-left font-circular-web text-base sm:text-lg text-violet-50"
        onClick={toggleAnswer}
      >
        <span className="pr-4">{question}</span>
        <span className="text-xl sm:text-2xl flex-shrink-0">{isOpen ? '-' : '+'}</span>
      </button>
      <div className={`answer-${question.replace(/\s+/g, '-')} h-0 overflow-hidden opacity-0`}>
        <p className="mt-2 font-circular-web text-sm text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  const faqItems = [
    {
      question: "What is Pagecraft?",
      answer: "Pagecraft is a multiversal realm where infinite possibilities converge. It's a place of boundless opportunities and hidden secrets waiting to be discovered."
    },
    {
      question: "How can I access Pagecraft?",
      answer: "Access to Pagecraft is granted through our unique platform. Start by exploring the prologue to understand the basics of this hidden realm."
    },
    {
      question: "What can I do in Pagecraft?",
      answer: "In Pagecraft, you can shape your own fate, uncover mysteries, and interact with various realms. The possibilities are limitless, bounded only by your imagination."
    },
    {
      question: "Is Pagecraft safe to explore?",
      answer: "While Pagecraft offers exciting adventures, it's important to approach with caution. We provide guidelines and safety measures to ensure a secure experience for all explorers."
    }
  ];

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24 px-4 sm:px-6 lg:px-8">
        <p className="font-general text-sm uppercase md:text-[10px] text-center">
          the multiversal ip world
        </p>

        <div className="relative w-full max-w-4xl mx-auto">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-center"
          />

          <div className="faq-container mt-16 w-full max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex flex-col items-center">
              <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50">
                Still have questions? Dive deeper into the world of Pagecraft and uncover its secrets.
              </p>

              <Button
                id="explore-btn"
                title="Explore More"
                containerClass="mt-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;


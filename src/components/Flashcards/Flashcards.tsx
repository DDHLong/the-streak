import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

const wordObjects: { id: number, word: string, meaning: string }[] = [
  { id: 1, word: "hello", meaning: "used as a greeting or to begin a conversation" },
  { id: 2, word: "goodbye", meaning: "used to express good wishes when parting or at the end of a conversation" },
  { id: 3, word: "apple", meaning: "the round fruit of a tree of the rose family, which typically has thin green or red skin and crisp flesh" },
  { id: 4, word: "computer", meaning: "an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program" },
  { id: 5, word: "house", meaning: "a building for human habitation, especially one that is lived in by a family or small group of people" },
  { id: 6, word: "cat", meaning: "a small domesticated carnivorous mammal with soft fur, a short snout, and retractile claws" },
  { id: 7, word: "book", meaning: "a written or printed work consisting of pages glued or sewn together along one side and bound in covers" },
  { id: 8, word: "sun", meaning: "the star around which the earth orbits" },
  { id: 9, word: "moon", meaning: "the natural satellite of the earth, visible (chiefly at night) by reflected light from the sun" },
  { id: 10, word: "water", meaning: "a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms" }
];

interface CardVariants extends Variants {
  selected: {
    rotateY: number;
    scale: number;
    transition: { duration: number };
    zIndex: number;
    boxShadow: string;
  };
  notSelected: (i: number) => {
    rotateY: number;
    scale: number;
    x: number;
    opacity: number;
    zIndex: number;
    boxShadow: string;
    transition: { duration: number };
  };
}

const cardVariants: CardVariants = {
  selected: {
    rotateY: 180,
    scale: 1.1,
    transition: { duration: 0.35 },
    zIndex: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  notSelected: (i: number) => ({
    rotateY: i * 15,
    scale: 1 - Math.abs(i * 0.15),
    x: i ? i * 50 : 0,
    opacity: 1 - Math.abs(i * 0.15),
    zIndex: 10 - Math.abs(i),
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    transition: { duration: 0.35 },
  }),
};

const Flashcards: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [{ startX, startScrollLeft, isDragging }, setDragStart] = useState<{
    startX: number | undefined;
    startScrollLeft: number | undefined;
    isDragging: boolean;
  }>({
    startX: undefined,
    startScrollLeft: undefined,
    isDragging: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>(
    new Array(wordObjects.length).fill(null)
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragStart({
      startX: e.pageX - containerRef.current!.offsetLeft,
      startScrollLeft: containerRef.current!.scrollLeft,
      isDragging: true,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || selectedCard) return;
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = x - (startX ?? 0);
    containerRef.current!.scrollLeft = (startScrollLeft ?? 0) - walk;
  };

  const selectCard = (card: number) => {
    setSelectedCard(selectedCard ? null : card);

    if (card && !selectedCard) {
      cardRefs.current[card - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleCardMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    card: number
  ) => {
    if (isDragging) {
      const x = e.pageX - containerRef.current!.offsetLeft;
      const walk = x - (startX ?? 0);
      if (Math.abs(walk) < 5) selectCard(card);
    } else selectCard(card);
  };

  return (
    <div
      className="flashcards"
      onMouseDown={handleMouseDown}
      onMouseUp={() => setDragStart((prev) => ({ ...prev, isDragging: false }))}
      onMouseMove={handleMouseMove}
    >
      <div className="flashcards__container" ref={containerRef}>
        {wordObjects.map((word, i) => (
          <motion.div
            className="card"
            key={word.id}
            ref={(el) => (cardRefs.current[i] = el)}
            onMouseUp={(e) => handleCardMouseUp(e, word.id)}
            variants={cardVariants}
            animate={selectedCard === word.id ? "selected" : "notSelected"}
            custom={selectedCard ? selectedCard - word.id : 0}
          >
            <p className={selectedCard === word.id ? "card__flip card__content" : "card__content"}>{selectedCard === word.id ? word.meaning : word.word}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;

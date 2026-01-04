import { motion } from "framer-motion";
import catImage from "@/assets/kibbly-cat.png";
import dogImage from "@/assets/kibbly-dog.png";

type PetType = "cat" | "dog";

interface PetSelectorProps {
  onSelect: (pet: PetType) => void;
}

const PetSelector = ({ onSelect }: PetSelectorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Who are we feeding today?
        </h2>
        <p className="text-muted-foreground text-lg">
          Select your furry friend to get started
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("cat")}
          className="flex-1 bg-card rounded-2xl p-8 shadow-card hover:shadow-button-hover transition-shadow duration-300 border border-border group"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <img src={catImage} alt="Cat" className="w-20 h-20 object-contain" />
            </div>
            <span className="text-xl font-semibold text-foreground">Cat</span>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("dog")}
          className="flex-1 bg-card rounded-2xl p-8 shadow-card hover:shadow-button-hover transition-shadow duration-300 border border-border group"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <img src={dogImage} alt="Dog" className="w-20 h-20 object-contain" />
            </div>
            <span className="text-xl font-semibold text-foreground">Dog</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default PetSelector;

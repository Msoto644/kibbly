import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cat, Dog, Utensils, Info } from "lucide-react";
import UnitToggle from "./UnitToggle";

type PetType = "cat" | "dog";
type Gender = "male" | "female";
type Unit = "g" | "oz";

interface PetDetails {
  petType: PetType;
  age: number;
  weight: number;
  gender: Gender;
  weightGoal: number;
}

interface PortionResultProps {
  details: PetDetails;
  onBack: () => void;
  onReset: () => void;
}

const PortionResult = ({ details, onBack, onReset }: PortionResultProps) => {
  const { petType, age, weight, gender, weightGoal } = details;
  const [unit, setUnit] = useState<Unit>("g");
  
  // Calculate recommended portion (simplified formula)
  const calculatePortion = () => {
    let baseCal: number;
    
    if (petType === "cat") {
      // Cats: ~30 kcal per kg for adult maintenance
      baseCal = weight * 30;
      
      // Adjust for age
      if (age < 1) baseCal *= 1.5; // Kittens need more
      else if (age > 10) baseCal *= 0.9; // Seniors need less
      
    } else {
      // Dogs: RER formula (70 * weight^0.75) for maintenance
      baseCal = 70 * Math.pow(weight, 0.75);
      
      // Activity factor (assuming moderate activity)
      baseCal *= 1.6;
      
      // Adjust for age
      if (age < 1) baseCal *= 1.5; // Puppies need more
      else if (age > 7) baseCal *= 0.9; // Seniors need less
    }
    
    // Gender adjustment (males typically need slightly more)
    if (gender === "male") baseCal *= 1.05;
    
    // Weight goal adjustment
    baseCal *= (1 + weightGoal * 0.15); // -15% to +15%
    
    // Convert to grams (assuming ~3.5 kcal/g for dry food)
    const gramsPerDay = baseCal / 3.5;
    
    return {
      calories: Math.round(baseCal),
      grams: Math.round(gramsPerDay),
      cups: (gramsPerDay / 120).toFixed(1), // ~120g per cup
    };
  };
  
  const portion = calculatePortion();
  const Icon = petType === "cat" ? Cat : Dog;
  const petName = petType === "cat" ? "cat" : "dog";

  const getGoalText = () => {
    if (weightGoal < -0.3) return "weight loss";
    if (weightGoal > 0.3) return "weight gain";
    return "maintenance";
  };

  // Convert grams to ounces (1g = 0.035274 oz)
  const gramsToOz = (g: number) => (g * 0.035274).toFixed(1);
  
  const displayAmount = unit === "g" ? portion.grams : gramsToOz(portion.grams);
  const displayPerMeal = unit === "g" ? Math.round(portion.grams / 2) : gramsToOz(portion.grams / 2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      {/* Result Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-3xl p-8 shadow-card border border-border"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
            <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground text-center mb-2">
          Your {petName}'s daily portion
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Based on {weight}kg, {age} year{age !== 1 ? "s" : ""} old, for {getGoalText()}
        </p>

        {/* Unit Toggle */}
        <div className="flex justify-center mb-6">
          <UnitToggle value={unit} onChange={setUnit} />
        </div>

        {/* Main Result */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Utensils className="w-6 h-6 text-primary-foreground/80" />
            <span className="text-primary-foreground/80 font-medium">Daily Amount</span>
          </div>
          <motion.div 
            key={`${displayAmount}-${unit}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-primary-foreground mb-1"
          >
            {displayAmount}{unit}
          </motion.div>
          <div className="text-primary-foreground/70 text-sm">
            or about {portion.cups} cups of dry food
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-accent/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{portion.calories}</div>
            <div className="text-sm text-muted-foreground">kcal/day</div>
          </div>
          <div className="bg-accent/50 rounded-xl p-4 text-center">
            <motion.div 
              key={`${displayPerMeal}-${unit}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-foreground"
            >
              {displayPerMeal}{unit}
            </motion.div>
            <div className="text-sm text-muted-foreground">per meal (2x)</div>
          </div>
        </div>

        {/* Note */}
        <div className="flex gap-3 p-4 bg-muted/50 rounded-xl">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            This is an estimate. Always consult your vet for personalized advice, 
            especially if your pet has health conditions.
          </p>
        </div>
      </motion.div>

      {/* Reset Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onReset}
        className="w-full mt-6 py-4 rounded-xl font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        Calculate for another pet
      </motion.button>
    </motion.div>
  );
};

export default PortionResult;

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cat, Dog } from "lucide-react";
import WeightGoalSlider from "./WeightGoalSlider";

type PetType = "cat" | "dog";
type Gender = "male" | "female";

interface PetDetails {
  petType: PetType;
  age: number;
  weight: number;
  gender: Gender;
  weightGoal: number;
}

interface PetDetailsFormProps {
  petType: PetType;
  onBack: () => void;
  onSubmit: (details: PetDetails) => void;
}

const PetDetailsForm = ({ petType, onBack, onSubmit }: PetDetailsFormProps) => {
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<Gender>("male");
  const [weightGoal, setWeightGoal] = useState(0);

  const Icon = petType === "cat" ? Cat : Dog;
  const petName = petType === "cat" ? "cat" : "dog";

  const isValid = age && parseFloat(age) > 0 && weight && parseFloat(weight) > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    onSubmit({
      petType,
      age: parseFloat(age),
      weight: parseFloat(weight),
      gender,
      weightGoal,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto px-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Tell us about your {petName}
          </h2>
          <p className="text-muted-foreground">
            We'll calculate the perfect portion
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age Input */}
        <div className="space-y-2">
          <label htmlFor="age" className="text-sm font-medium text-foreground">
            Age (years)
          </label>
          <input
            id="age"
            type="number"
            min="0"
            max="30"
            step="0.5"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 3"
            className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Weight Input */}
        <div className="space-y-2">
          <label htmlFor="weight" className="text-sm font-medium text-foreground">
            Weight (lbs)
          </label>
          <input
            id="weight"
            type="number"
            min="0"
            max="220"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={petType === "cat" ? "e.g., 10" : "e.g., 55"}
            className="w-full px-4 py-3 bg-card border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Gender Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Gender</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                gender === "male"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input bg-card text-muted-foreground hover:border-primary/50"
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                gender === "female"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input bg-card text-muted-foreground hover:border-primary/50"
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Weight Goal Slider */}
        <WeightGoalSlider value={weightGoal} onChange={setWeightGoal} />

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            isValid
              ? "bg-primary text-primary-foreground shadow-button hover:shadow-button-hover"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Calculate Portion
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PetDetailsForm;

import { motion } from "framer-motion";

type Unit = "g" | "oz";

interface UnitToggleProps {
  value: Unit;
  onChange: (unit: Unit) => void;
}

const UnitToggle = ({ value, onChange }: UnitToggleProps) => {
  return (
    <div className="flex items-center gap-2 bg-muted rounded-full p-1">
      <button
        onClick={() => onChange("g")}
        className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          value === "g" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {value === "g" && (
          <motion.div
            layoutId="unitToggle"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">g</span>
      </button>
      <button
        onClick={() => onChange("oz")}
        className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          value === "oz" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {value === "oz" && (
          <motion.div
            layoutId="unitToggle"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">oz</span>
      </button>
    </div>
  );
};

export default UnitToggle;

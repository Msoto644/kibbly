import { motion } from "framer-motion";
import { TrendingDown, Minus, TrendingUp } from "lucide-react";

interface WeightGoalSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const WeightGoalSlider = ({ value, onChange }: WeightGoalSliderProps) => {
  // value: -1 (lose), 0 (maintain), 1 (gain)
  const getLabel = () => {
    if (value < -0.3) return "Help my pet lose weight";
    if (value > 0.3) return "Help my pet gain weight";
    return "Maintain current weight";
  };

  const getIcon = () => {
    if (value < -0.3) return TrendingDown;
    if (value > 0.3) return TrendingUp;
    return Minus;
  };

  const getColor = () => {
    if (value < -0.3) return "text-blue-500";
    if (value > 0.3) return "text-green-500";
    return "text-primary";
  };

  const Icon = getIcon();
  
  // Calculate background gradient based on value
  const gradientPercent = ((value + 1) / 2) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Weight Goal</label>
        <motion.div
          key={getLabel()}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 text-sm font-medium ${getColor()}`}
        >
          <Icon className="w-4 h-4" />
          <span>{getLabel()}</span>
        </motion.div>
      </div>
      
      <div className="relative pt-2 pb-1">
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-gradient-to-r from-blue-400 via-primary to-green-400 rounded-full"
            style={{ width: "100%" }}
            initial={false}
          />
          <div
            className="absolute h-full bg-muted/80 rounded-full transition-all duration-200"
            style={{ 
              left: `${gradientPercent}%`,
              width: `${100 - gradientPercent}%`
            }}
          />
        </div>
        
        <input
          type="range"
          min="-1"
          max="1"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {/* Custom thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-card border-2 border-primary rounded-full shadow-button pointer-events-none"
          style={{ left: `calc(${gradientPercent}% - 12px)` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Lose weight</span>
        <span>Maintain</span>
        <span>Gain weight</span>
      </div>
    </div>
  );
};

export default WeightGoalSlider;

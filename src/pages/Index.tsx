import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import PetSelector from "@/components/PetSelector";
import PetDetailsForm from "@/components/PetDetailsForm";
import PortionResult from "@/components/PortionResult";

type PetType = "cat" | "dog";
type Gender = "male" | "female";
type Step = "select" | "details" | "result";

interface PetDetails {
  petType: PetType;
  age: number;
  weight: number;
  gender: Gender;
  weightGoal: number;
}

const Index = () => {
  const [step, setStep] = useState<Step>("select");
  const [petType, setPetType] = useState<PetType | null>(null);
  const [petDetails, setPetDetails] = useState<PetDetails | null>(null);

  const handlePetSelect = (type: PetType) => {
    setPetType(type);
    setStep("details");
  };

  const handleDetailsSubmit = (details: PetDetails) => {
    setPetDetails(details);
    setStep("result");
  };

  const handleBackToSelect = () => {
    setStep("select");
    setPetType(null);
  };

  const handleBackToDetails = () => {
    setStep("details");
  };

  const handleReset = () => {
    setStep("select");
    setPetType(null);
    setPetDetails(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-12">
        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PetSelector onSelect={handlePetSelect} />
            </motion.div>
          )}

          {step === "details" && petType && (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PetDetailsForm
                petType={petType}
                onBack={handleBackToSelect}
                onSubmit={handleDetailsSubmit}
              />
            </motion.div>
          )}

          {step === "result" && petDetails && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PortionResult
                details={petDetails}
                onBack={handleBackToDetails}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center bg-background/80 backdrop-blur-sm border-t border-border">
        <p className="text-sm text-muted-foreground">
          Made with ❤️ for pet parents everywhere
        </p>
      </footer>
    </div>
  );
};

export default Index;

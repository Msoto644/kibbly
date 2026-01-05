import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import kibblyLogo from "@/assets/kibbly-logo.png";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 px-6"
    >
      <div className="max-w-md mx-auto flex items-center justify-center">
        <Link to="/">
          <img 
            src={kibblyLogo} 
            alt="Kibbly" 
            className="h-10 md:h-12 w-auto"
          />
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;

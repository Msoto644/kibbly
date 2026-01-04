import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 px-6"
    >
      <div className="max-w-md mx-auto flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-primary-foreground"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Simple bowl icon */}
              <path
                d="M4 12c0 3.5 3.5 6 8 6s8-2.5 8-6"
                stroke="currentColor"
                fill="none"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="4"
                stroke="currentColor"
                fill="none"
              />
              <circle cx="9" cy="11" r="1" fill="currentColor" />
              <circle cx="12" cy="10.5" r="1" fill="currentColor" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-foreground">Kibbly</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

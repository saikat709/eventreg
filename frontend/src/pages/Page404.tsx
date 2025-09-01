import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="flex flex-col items-center justify-center relative overflow-hidden my-auto mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Large floating shapes */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-20"
        animate={{ 
          y: [0, 50, -30, 0], 
          x: [0, 30, -20, 0], 
          rotate: [0, 180, 360],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-20 right-16 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-25"
        animate={{ 
          y: [0, -60, 40, 0], 
          x: [0, -40, 20, 0], 
          rotate: [0, -180, -360],
          scale: [1, 0.6, 1.3, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-8 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30"
        animate={{ 
          y: [0, 80, -50, 0], 
          x: [0, 50, -30, 0], 
          rotate: [0, 90, 180],
          scale: [1, 1.4, 0.9, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        variants={itemVariants}
      >
        <motion.h1
          className="text-9xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1.5
          }}
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          404
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.p
            className="text-3xl font-bold text-gray-500 mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Oops! Page Not Found
          </motion.p>
          <motion.p
            className="text-lg text-gray-500 max-w-md mx-auto"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            The page you're looking for seems to have wandered off into the digital void.
          </motion.p>
        </motion.div>

        <motion.a
          onClick={() => navigate('/')}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.4), 0 10px 10px -5px rgba(168, 85, 247, 0.04)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8, type: "spring" }}
        >
          <motion.span
            className="flex items-center gap-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏠 Take Me Home
          </motion.span>
        </motion.a>
      </motion.div>

      {/* Floating emoji animations */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-4xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌟
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 text-5xl"
        animate={{ 
          x: [0, 15, 0],
          rotate: [0, -15, 15, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        🚀
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/6 text-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

export default Page404;

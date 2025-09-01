
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const timelineEvents = [
  { title: 'Registration Opens', description: 'Register for your favorite segments.', time: '9:00 AM' },
  { title: 'Math Quiz', description: 'Test your skills!', time: '10:00 AM' },
  { title: 'Food Fest', description: 'Enjoy delicious treats.', time: '12:00 PM' },
  { title: 'Project Showcasing', description: 'Show your innovations.', time: '2:00 PM' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
  
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-12">
        <motion.h2 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-extrabold text-indigo-800 mb-4">
          Welcome to the Ultimate Event Experience!
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }} className="text-lg text-gray-700 mb-8">
          Register, participate, and enjoy a day full of excitement. Explore segments, win prizes, and make memories!
        </motion.p>
        <div className="flex gap-4 justify-center mb-8">
          <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
            onClick={() => navigate('/registration')}
          >Register Now</Button>
          <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900"
            onClick={() => navigate('/login')}
          >Login</Button>
        </div>
      </section>

      {/* Event Timeline - improved styling and animation */}
      <section className="w-full flex flex-col items-center px-2 sm:px-0 mb-12">
        <h3 className="text-2xl font-bold text-indigo-700 mb-8 text-center">Event Timeline</h3>
        <div className="relative w-full max-w-2xl">  
          {/* Vertical line */}
          <motion.div 
            className="absolute left-8 top-0 w-1 bg-gradient-to-b from-indigo-300 to-indigo-500 rounded-full z-0" 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 2, 
              ease: "easeOut", 
              delay: 0.2 
            }}
            style={{ 
              height: 'calc(100% - 2rem)',
              transformOrigin: 'top'
            }}
          />

          <div className="space-y-10 relative z-10">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.15, duration: 0.6, type: 'spring' }}
                className="flex items-center gap-6 relative"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 border-4 border-white rounded-full flex items-center justify-center shadow-lg z-10">
                  <span className="text-xs text-white font-bold">{idx + 1}</span>
                </div>
                {/* Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 flex-1 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-indigo-700 font-bold text-lg">{event.title}</span>
                    <span className="text-sm text-indigo-400 font-semibold bg-indigo-50 px-2 py-1 rounded">{event.time}</span>
                  </div>
                  <div className="text-gray-600">{event.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

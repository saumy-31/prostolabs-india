import { motion } from 'framer-motion'

export function BackgroundGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#FAFAFA]">
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Centered behind the browser column */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          rotate: [0, 90, 0],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-5%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[#2563EB] rounded-full blur-[140px]"
      />
    </div>
  )
}
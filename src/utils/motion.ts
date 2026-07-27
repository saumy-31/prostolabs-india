import { type Variants, type Transition } from 'framer-motion'

// --- SPRING DYNAMICS (Natural & Responsive) ---
export const springSmooth: Transition = {
  type: 'spring',
  stiffness: 110,
  damping: 18,
  mass: 0.8,
}

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 16,
  mass: 0.6,
}

export const springGentle: Transition = {
  type: 'spring',
  stiffness: 75,
  damping: 20,
}

// --- CONTAINER STAGGER VARIANTS ---
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

// --- SECTION-SPECIFIC ENTRANCE VARIANTS ---
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springSmooth,
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: springSmooth,
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: springSmooth,
  },
}

// --- HOVER & MICRO-INTERACTION CONSTANTS ---
export const cardHoverProps = {
  whileHover: {
    y: -6,
    scale: 1.015,
    transition: springSnappy,
  },
  whileTap: { scale: 0.985 },
}

export const buttonHoverProps = {
  whileHover: {
    scale: 1.025,
    transition: springSnappy,
  },
  whileTap: { scale: 0.975 },
}
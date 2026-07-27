/** @type {import('tailwind.config.js').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Audit Breakpoints: Ensuring a clean shift from mobile to tablet
    screens: {
      'xs': '320px', // Min mobile
      'sm': '375px', // Standard mobile
      'md': '768px', // Tablet
      'lg': '1024px',// Laptop
      'xl': '1280px',// Desktop
      '2xl': '1440px', // Ultra-wide
    },
    extend: {
      colors: {
        prosto: {
          blue: '#2563EB', // Consolidate brand blue
          bg: '#FAFAFA',   // Consistent background
          text: '#0A0A0A', // Consistent primary text
          sub: '#6B7280',  // Consistent subtext
        },
      },
      fontFamily: {
        // Accessibility: Using system sans-serif stack for performance and clarity
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SFMono-Regular"', 'Consolas', '"Liberation Mono"', 'Menlo', 'Courier', 'monospace'],
      },
      // Audit Typography: Strict scales for consistency
      fontSize: {
        xs: ['clamp(0.7rem, 2vw, 0.75rem)', { lineHeight: '1.5', letterSpacing: '0.01em' }], // Small text
        sm: ['clamp(0.8rem, 2.2vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0em' }],  // Card body
        base: ['clamp(0.9rem, 2.5vw, 1rem)', { lineHeight: '1.6', letterSpacing: '0em' }],    // Body copy
        lg: ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // Subheadings
        xl: ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }], // Card titles
        '2xl': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.02em' }], // Section tags
        '3xl': ['clamp(1.5rem, 5vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // Hero P / FAQ Q
        '4xl': ['clamp(2rem, 6vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],   // Section H2
        '5xl': ['clamp(2.5rem, 7vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],   // Final CTA H2
        '6xl': ['clamp(3rem, 8vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],   // Hero H1
      },
      // Spacing Audit: Fluid vertical rhythm
      spacing: {
        gutter: 'clamp(1rem, 5vw, 1.5rem)', // Horizontal padding
        section: 'clamp(6rem, 15vw, 9rem)', // py-24 md:py-32 replacement
        element: 'clamp(3rem, 8vw, 4rem)',   // mb-16 replacement
        card: 'clamp(1.5rem, 4vw, 2rem)',    // Consistent card padding
      },
      // Design System Consistency
      borderRadius: {
        DEFAULT: '0.75rem',  // Standard elements
        xl: '1rem',          // Feature chips, small cards
        '2xl': '1.5rem',     // Pricing cards, accordions
        '3xl': '2rem',       // Large containers (Final CTA, Bento)
        '4xl': '2.5rem',     // Max containers
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0 2px 4px rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.03)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,0.15)',
        // Hover glows
        'blue-sm': '0 10px 15px -3px rgba(37,99,235,0.08)',
        'blue-lg': '0 25px 50px -12px rgba(37,99,235,0.15)',
      },
    },
  },
  plugins: [],
}
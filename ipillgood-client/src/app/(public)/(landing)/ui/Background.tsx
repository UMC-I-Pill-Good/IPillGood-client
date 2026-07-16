import { motion } from 'framer-motion';

const circles = [
  {
    className:
      'absolute -top-6 right-10 border border-white/50 h-22.5 w-22.5 rounded-full blur-[2px]',
    distance: 10,
    delay: 0.2,
  },
  {
    className:
      'absolute left-18 top-80 border border-white/70 h-11.5 w-11.5 rounded-full blur-[2px]',
    distance: 15,
    delay: 0.9,
  },
  {
    className: 'absolute bottom-46 right-30 border border-white/70 h-6 w-6 rounded-full blur-[2px]',
    distance: 7,
    delay: 1.4,
  },
];

const particles = [
  {
    className: 'absolute top-25 right-13 h-1 w-1 rounded-full bg-white/50 blur-[1px]',
    distance: 6,
    duration: 2.5,
    delay: 0.3,
  },
  {
    className: 'absolute left-18 top-60 h-2 w-2 rounded-full bg-white/80 blur-[2px]',
    distance: 14,
    duration: 4.6,
    delay: 1.2,
  },
  {
    className: 'absolute bottom-55 left-14 h-2.5 w-2.5 rounded-full bg-white/40 blur-[2px]',
    distance: 9,
    duration: 3.1,
    delay: 0.8,
  },
  {
    className: 'absolute bottom-85 right-20 h-3 w-3 rounded-full bg-white/80 blur-[2px]',
    distance: 16,
    duration: 5,
    delay: 1.7,
  },
];

export const Background = () => {
  return (
    <>
      {/* blur */}
      <div className='bg-blur absolute top-22 -right-20 h-52 w-52 bg-[#C1AFFF]/90 blur-[80px]' />

      <div className='bg-blur absolute -left-15 top-65 h-[319.48px] w-[386.21px] rotate-[-26.62deg] bg-[#B596FF]/80 blur-[100px]' />

      <div className='bg-blur absolute right-0 bottom-55 h-[161.7px] w-[181.93px] rotate-[-26.62deg] bg-[#D0A9FF]/90 blur-[80px]' />

      {/* Circle */}
      {circles.map((circle) => (
        <motion.div
          key={circle.className}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            opacity: {
              delay: 0.7,
              duration: 0.8,
            },
          }}
          className={circle.className}
        />
      ))}

      {/* Particle */}
      {particles.map((particle) => (
        <motion.div
          key={particle.className}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, -particle.distance, 0],
          }}
          transition={{
            opacity: {
              delay: 0.7,
              duration: 0.8,
            },
            y: {
              delay: particle.delay,
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className={particle.className}
        />
      ))}

      {/* Capsule 1 */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: [0, -12, 0],
        }}
        transition={{
          opacity: {
            delay: 0.7,
            duration: 0.8,
          },
          y: {
            delay: 1,
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            delay: 1,
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className='absolute top-4 left-15 h-[30.73px] w-[114.36px] rotate-[-45.94deg] rounded-full border-y border-white/30 bg-[#4751E7]/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Capsule 2 */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: [0, -15, 0],
        }}
        transition={{
          opacity: {
            delay: 0.8,
            duration: 0.8,
          },
          y: {
            delay: 1.1,
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className='absolute top-40 right-22 h-[30.73px] w-[50.03px] rotate-[56.71deg] rounded-full border-x border-white/30 bg-[#FFA2A2]/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 2px 2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Capsule 3 */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: {
            delay: 0.9,
            duration: 0.8,
          },
          y: {
            delay: 1.2,
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className='absolute bottom-36 left-15 h-[41.11px] w-[79.62px] rotate-[-17.73deg] rounded-full border-r border-y border-white/30 bg-white/20 blur-[1px]'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Capsule 4 */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: [0, -14, 0],
        }}
        transition={{
          opacity: {
            delay: 1,
            duration: 0.8,
          },
          y: {
            delay: 1.3,
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className='absolute bottom-11 right-17 h-[20.56px] w-[65.91px] rotate-[125.47deg] rounded-full border-l border-y border-white/30 z-10'
        style={{
          boxShadow:
            'inset 0 4px 4px rgba(155,161,255,.2), inset 3px -2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Capsule 5 */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: [0, -12, 0],
        }}
        transition={{
          opacity: {
            delay: 1.1,
            duration: 0.8,
          },
          y: {
            delay: 1.4,
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className='absolute bottom-0 right-18 h-[53.91px] w-[114.04px] rotate-[-145.8deg] rounded-full bg-[#E29B9B]/20 z-10 blur-[2px]'
        style={{
          boxShadow:
            'inset 0 4px 4px rgba(155,161,255,.2), inset 0 -4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />
    </>
  );
};

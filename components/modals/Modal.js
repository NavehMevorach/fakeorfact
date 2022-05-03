import { motion } from 'framer-motion'

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.05,
      type: 'spring',
      damping: 50,
      stiffness: 500,
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
  },
}

function Modal({ children, handleClose }) {
  return (
    <motion.div
      className="absolute z-50 top-0 left-0 h-screen w-screen bg-[#00000033] backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}>
      <motion.div
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </motion.div>
    </motion.div>
  )
}
export default Modal

// background-color: rgb(0 0 0/.2);

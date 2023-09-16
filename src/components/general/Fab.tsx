import React from 'react'
import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import { Tooltip } from '@chakra-ui/react'

export type IList = {
    title: string;
    icon: JSX.Element;
    action: () => void
}

function Fab({ items }: { items: IList[] }) {
    const [rotateX, setRotateX] = React.useState(0);
  return (
    <div className='relative'>
        {/* MENU ITEMS */}
        {items.map((item, index) => (
            <Tooltip label={item.title}>
                <motion.div 
                onClick={() => item.action()}
                animate={{ translateY: rotateX === 0 ? 0:-52 * (index+1), }}
                transition={{ duration: 0.3, ease: 'easeInOut', staggerChildren: 0.2, }}
                className='w-12 h-12 rounded-full flex justify-center items-center bg-chasescrollPurple absolute'>
                    {item.icon}
                </motion.div>
            </Tooltip>
        ))}

        <motion.div 
        onClick={() => setRotateX(rotateX === 0 ? 45 : 0)}
        animate={{ rotateZ: rotateX, perspective: 90 }}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
        className='w-12 h-12 rounded-full flex justify-center items-center bg-chasescrollBlue cursor-pointer'>
            <FiPlus fontSize={'30px'} color='white' />
        </motion.div>
    </div>
  )
}

export default Fab
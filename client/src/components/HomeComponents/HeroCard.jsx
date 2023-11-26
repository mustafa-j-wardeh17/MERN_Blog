import React from 'react'

const HeroCard = ({ src }) => {
    return (
        <div className=' flex space-x-4 w-full h-[48%] overflow-auto'>
            <div className=' h-full w-[220px] rounded-md overflow-hidden'>
                <img src={src} className=' object-fill w-full h-full aspect-square' />
            </div>
            <div className='flex flex-col space-y-2 justify-center md:w-[220px] '>
                <h3 className='text-[12px] text-purple-600 font-bold tracking-wider'>CODE QUALITY</h3>
                <p className='text-[14px] text-neutral-600 font-bold'>Lorem ipsum dolor sit ame. Pellentesque nisl diam, gravida ut eleifend ac,</p>
                <p className='text-[12px] text-neutral-400  tracking-wider'>Hanuary 01,2023</p>
            </div>
        </div>
    )
}

export default HeroCard
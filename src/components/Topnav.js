import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import React from 'react'

export const Topnav = () => {
    return (
        <div className='relative bg-gradient-to-r from-orange-600 via-orange-300 to-green-800 overflow-hidden'>

            {/* Texture Layer */}
            <div
                className="absolute inset-0 bg-repeat mix-blend-overlay opacity-40 pointer-events-none"
                style={{ backgroundImage: "url('/texture.jpg')" }}
            ></div>

            <div className='relative max-w-7xl mx-auto px-4 py-2 flex flex-col lg:flex-row justify-between items-center text-blue-800 gap-4'>

                <p className='text-sm lg:text-base text-center lg:text-left'>
                    No One Has Ever Become Poor By Giving!
                </p>

                <div className='flex justify-between items-center gap-3'>
                    <Phone fill='blue' className='w-4 h-4' />
                    <p className='text-sm lg:text-base'>95940 37995 / 74997 36665</p>
                </div>

                <div className='flex justify-between items-center gap-3'>
                    <Mail />
                    <p className='text-sm lg:text-base'>
                        veerjawanfoundation05@gmail.com
                    </p>
                </div>

                {/* social icons */}
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-blue-800 text-blue-800 hover:text-white transition duration-300 cursor-pointer'>
                        <Facebook className='w-5 h-5' />
                    </div>

                    <div className='w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-blue-800 text-blue-800 hover:text-white transition duration-300 cursor-pointer'>
                        <Instagram className='w-5 h-5' />
                    </div>
                </div>

            </div>
        </div>
    )
}
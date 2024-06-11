

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
//import { useSetRecoilState } from 'recoil';
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	
  return (
		<div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
			
			<Link href='/' className='flex items-center justify-center h-20 '>
				<Image src='/logo.png' alt='CheetCode' height={200} width={200} />
			</Link>
			<div className='flex items-center'>
				<button
					className='bg-slate-700 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                 hover:text-slate-900 hover:bg-slate-400 hover:shadow-lg transition duration-300 ease-in-out
                '
				>
					Sign In
				</button>
			</div>
		</div>
	);
}
export default Navbar;
 
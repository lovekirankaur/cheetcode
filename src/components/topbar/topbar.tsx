

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../timer/timer";
import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "../Buttons/Logout";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
	problemPage?: boolean; //optional prop (?) as we will pass it in problems but not in home page
};

function Topbar({ problemPage } : TopbarProps){

    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};

	const handleProblemChange = (isForward: boolean) => {
		const { order } = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);

		if (isForward && !nextProblemKey) {
			const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`);
		} else {
			router.push(`/problems/${nextProblemKey}`);
		}
	};
return (
    <nav className='flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-zinc-7'>
        <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`/* as to cut down the extra space using asn push logo to other end when in problems page*/ }> 
            <Link href='/' className='flex justify-start relative top-3'>
                <Image src='/logo.png' alt='Logo' height={200} width={200} />
            </Link>

            {problemPage && (
                <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4 flex-1 justify-center'>
                    <div
                        className='flex items-center justify-center button-style'
                        onClick={() => handleProblemChange(false)}
                    >
                        <FaChevronLeft />
                    </div>
                    <Link
                        href='/'
                        className='max-w-[170px] text-gray-200 cursor-pointer'
                    >
                        <div className="flex items-center gap-2 hover:text-white">
                            <BsList />
                            <p>Problem List</p>
                        </div>
                       
                    </Link>
                    <div
                        className='flex items-center justify-center button-style'
                        onClick={() => handleProblemChange(true)}
                    >
                        <FaChevronRight />
                    </div>
                </div>
            )}

            <div className='flex items-center space-x-4 flex-1 justify-end'>
            { problemPage && <Timer />}
                <div>
                    <a
                        href='https://www.linkedin.com/in/lovekirankaur/'
                        target='_blank'
                        rel='noreferrer'
                        className='bg-zinc-700 text-white w-100 h-10 px-2 py-1.5 sm:px-4 rounded-md text-sm font-medium
                        hover:text-zinc-900 hover:bg-zinc-400 hover:shadow-lg transition duration-300 ease-in-out '>
                        Premium
                    </a>
                </div>
               
                {!user && (
                        <button className='bg-zinc-700 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                 hover:text-zinc-900 hover:bg-zinc-400 hover:shadow-lg transition duration-300 ease-in-out'  onClick={handleClick}>Sign In</button>
                   
                )}

                {user && (
                    <div className='cursor-pointer group relative'>
                        <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                        <div
                            className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-neon p-2 rounded shadow-lg 
                            z-40 group-hover:scale-100 scale-0 
                            transition-all duration-300 ease-in-out'
                        >
                            <p className='text-sm'>{user.email}</p>
                        </div>
                    </div>
                )}
                {user && <Logout />}
            </div>
        </div>
    </nav>
);
};
export default Topbar;

import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/modals/auth-modals";
import Topbar from "@/components/topbar/topbar";
import Workspace from "@/components/workspace/workspace";
import React from "react";
import { useRecoilValue } from "recoil";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import useHasMounted from "@/hooks/useHasMounted";
//import useHasMounted from "@/hooks/useHasMounted";

type ProblemPageProps = {
	problem: Problem;
};

export default function Page({problem}:ProblemPageProps) {
    const authModal = useRecoilValue(authModalState);
	const hasMounted = useHasMounted();

	if (!hasMounted) return null;

    return <div className="h-screen overflow-hidden">
        <Topbar problemPage = {true}/>
        <Workspace problem={problem}/>
        {authModal.isOpen && <AuthModal />}
    </div>
  }

// fetch the local data
//  SSG
// getStaticPaths => it create the dynamic routes
export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];

	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: {
			problem,
		},
	};
}
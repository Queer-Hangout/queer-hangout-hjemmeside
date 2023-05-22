import Link from 'next/link';

const Header = () => {
	return (
		<header className='bg-slate-800 text-white flex-row justify-between px-8 py-4'>
			<Link
				href='/'
				className='text-lg'
			>
				Queer Hangout
			</Link>
		</header>
	);
};

export default Header;

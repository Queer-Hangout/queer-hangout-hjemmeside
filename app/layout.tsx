import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='no'>
			<body className='bg-slate-300'>
				<Header />
				<div className='mx-auto max-w-3xl min-h-screen px-8 py-8 bg-white'>
					{children}
				</div>
				<Footer />
			</body>
		</html>
	);
}

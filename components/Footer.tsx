import Link from 'next/link';

const Footer = () => (
	<footer className='flex-col min-w-screen bg-slate-800 text-white justify-center flex text-center py-8'>
		<p>
			<Link href='#'>Facebook</Link> <Link href='#'>Instagram</Link>
		</p>
		<p>Vipps: 123567</p>
		<p>Org.nr. 12345678910</p>
		<p>E-post: blabla@gmail.com</p>
		<p>Webansvarlig: Levi Sørum</p>
		<p>Copyright: Queer Hangout i Drammen © 2023</p>
	</footer>
);

export default Footer;

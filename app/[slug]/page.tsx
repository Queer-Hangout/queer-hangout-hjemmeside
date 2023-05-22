import { getAllPageData, getPageData } from '@/components/getPageData';
import Markdown from 'markdown-to-jsx';

const Page = (props: any) => {
	const page = getPageData(`${props.params.slug}.md`);
	return (
		<div>
			<Markdown>{page.content}</Markdown>
		</div>
	);
};

export const generateStaticParams = () => getAllPageData();

export default Page;

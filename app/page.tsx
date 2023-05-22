import Markdown from 'markdown-to-jsx';
import { getPageData } from '@/components/getPageData';

const Page = () => {
	return (
		<div>
			<Markdown>{getPageData().content}</Markdown>
		</div>
	);
};

export default Page;

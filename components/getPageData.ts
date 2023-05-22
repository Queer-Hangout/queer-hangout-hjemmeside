import fs from 'fs';
import matter from 'gray-matter';
import { PageMetadata } from './PageData';

const folder = 'content';
const encoding = 'utf8';
const indexFile = 'index.md';

export const getPageData = (filename: string = indexFile): PageMetadata => {
	const fileContents = fs.readFileSync(`${folder}/${filename}`, encoding);
	const matterResult = matter(fileContents);
	return {
		title: matterResult.data.title,
		description: matterResult.data.description,
		content: matterResult.content,
		slug: filename.replace('.md', ''),
	};
};

export const getAllPageData = (): PageMetadata[] =>
	fs
		.readdirSync(`${folder}/`)
		.filter(
			(file) =>
				file.endsWith('.md') &&
				file !== indexFile &&
				file != null &&
				file !== '' &&
				file !== '/'
		)
		.map((filename) => getPageData(filename));

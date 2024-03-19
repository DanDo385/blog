// pages/posts/[slug].tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { useRouter } from 'next/router';
import PostDetail from '@components/PostDetail';
import CommentForm from '@components/CommentForm';
import CommentList from '@components/CommentList';

const postsDirectory = path.join(process.cwd(), '_posts');

export default function PostPage({ postData, comments }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <article className="prose lg:prose-xl m-auto">
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <PostDetail contentHtml={postData.contentHtml} />
      <CommentForm slug={postData.slug} />
      <CommentList comments={comments} />
    </article>
  );
}

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        slug: params.slug,
        contentHtml,
        ...matterResult.data,
      },
    },
  };
}

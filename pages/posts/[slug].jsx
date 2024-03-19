// pages/posts/[slug].tsx
import { useState, useEffect, useCallback } from 'react'; // Added useCallback import
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { useRouter } from 'next/router';
import PostDetail from '../../components/PostDetail';
import CommentForm from '../../components/CommentForm'; // Component for submitting comments
import CommentList from '../../components/CommentList'; // Component for listing comments

const postsDirectory = path.join(process.cwd(), '_posts');

export default function PostPage({ postData }) {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const fetchComments = useCallback(async () => {
    if (!router.isFallback) {
      const res = await fetch(`/api/comments?slug=${postData.slug}`);
      const data = await res.json();
      setComments(data.comments || []);
    }
  }, [postData.slug, router.isFallback]);
  
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // No need for FetchComment or PostComment if CommentForm and CommentList are being used

  return (
    <article className="prose lg:prose-xl mx-auto">
      <PostDetail post={postData} />
      <CommentForm slug={postData.slug} onCommentSubmitted={fetchComments} />
      <CommentList comments={comments} />
    </article>
  );
}

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.toString();
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        slug,
        contentHtml,
        ...matterResult.data,
      },
    },
  };
}


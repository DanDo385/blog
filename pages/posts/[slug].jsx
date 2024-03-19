// pages/posts/[slug].jsx
import { useState, useEffect, useCallback } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { useRouter } from 'next/router';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';

const postsDirectory = path.join(process.cwd(), '_posts');

export default function PostPage({ postData }) {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const fetchComments = useCallback(async () => {
    if (!router.isFallback && postData.slug) {
      const res = await fetch(`/api/comments?slug=${postData.slug}`);
      const data = await res.json();
      setComments(data.comments || []);
    }
  }, [postData.slug, router.isFallback]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async ({ name, comment }) => {
    try {
      // Send comment data to backend
      await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug: postData.slug, name, comment }),
      });
      // Fetch comments again to update the list
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="prose lg:prose-xl mx-auto">
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleCommentSubmit} />
      {/* Display other post details */}
    </div>
  );
}


export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.toString();
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
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

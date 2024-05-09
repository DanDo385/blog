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
      console.log('Fetching comments for slug:', postData.slug); // Log slug being fetched
      try {
        const res = await fetch(`/api/comments?slug=${postData.slug}`);
        const data = await res.json();
        console.log('Comments fetched:', data); // Log fetched data
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  }, [postData.slug, router.isFallback]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async ({ name, comment }) => {
    console.log('Submitting comment:', { name, comment }); // Log data being submitted
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug: postData.slug, name, comment }),
      });
      const newComment = await res.json();
      console.log('Response after submitting:', newComment); // Log response from the server
      fetchComments(); // Refetch comments after submission
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">{postData.title}</h1>
        <div
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        <hr className="my-8" />

        <CommentList comments={comments} />
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return {
    paths,
    fallback: false,
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
        title: matterResult.data.title,
        contentHtml,
      },
    },
  };
}

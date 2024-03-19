// pages/posts/[slug].jsx
import { useState, useEffect, useCallback } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react"; // Import signIn and signOut directly
import { useUser } from "../../lib/auth"; // Import useUser hook

import PostDetail from "../../components/PostDetail";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";
import PostComment from "../../components/PostComment";

const postsDirectory = path.join(process.cwd(), "_posts");

export default function PostPage({ postData }) {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { session, loading, signIn, signOut } = useUser(); // Destructure signIn and signOut

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

  if (loading || router.isFallback) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <article className="prose lg:prose-xl mx-auto">
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>

        <CommentList comments={comments} />
        <PostComment slug={postData.slug} onCommentSubmitted={fetchComments} />
        <PostDetail post={postData} />
        <CommentForm slug={postData.slug} onCommentSubmitted={fetchComments} />
      </article>
    );
  }

  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
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

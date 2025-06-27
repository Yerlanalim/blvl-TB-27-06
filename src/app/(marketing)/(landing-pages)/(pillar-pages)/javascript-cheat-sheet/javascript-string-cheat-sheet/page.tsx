import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { createMetadata } from '@/utils/seo';
import { getUserCount } from '@/utils/data/user/get-user-count';
import BlogPostLayout from '@/components/mdx/blog-post-layout';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: number;
  authorImage: string;
  headings: {
    title: string;
    level: number;
  }[];
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { frontmatter } = await getBlogPost('javascript-string-cheat-sheet');
    const typedFrontmatter = frontmatter as unknown as BlogFrontmatter;

    return createMetadata({
      title: `${typedFrontmatter.title} | BizLevel Blog`,
      description: typedFrontmatter.description,
      keywords: ['blog', 'article', typedFrontmatter.title.toLowerCase()],
      image: {
        text: typedFrontmatter.title,
        bgColor: '#000',
        textColor: '#fff',
      },
      canonicalUrl: `/javascript-cheat-sheet/javascript-string-cheat-sheet`,
    });
  } catch {
    return {
      title: 'Blog Post Not Found',
    };
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function JavascriptStringCheatSheet({ params }: BlogPostParams) {
  try {
    const { content, frontmatter } = await getBlogPost('javascript-string-cheat-sheet');
    const typedFrontmatter = frontmatter as unknown as BlogFrontmatter;

    const userCount = await getUserCount().then((count) => Math.round(count / 10) * 10);

    return (
      <BlogPostLayout
        frontmatter={typedFrontmatter}
        content={content}
        slug={params.slug}
        userCount={userCount}
        backLink={{
          href: '/javascript-cheat-sheet',
          text: 'Back to JavaScript Cheat Sheet',
        }}
      />
    );
  } catch (error) {
    notFound();
  }
}

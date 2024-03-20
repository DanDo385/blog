import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-4">C2DeFi</h1>
      <p className="mb-4">
      Welcome to C2DeFI! My nane is Dan, and I spent a lucky 13 years in traditional finance and now am embarking journey into blockchain development. This blog is my platform to share insights, guide newcomers to blockchain, compare traditional and decentralized finance, and discuss the latest in web development and crypto trends. Join me in exploring the evolving landscape of finance and technology.
      </p>
      <div className="text-center">
        <Link href="/posts">
          <span className="inline-block py-2 px-4 rounded">Explore Posts</span>
        </Link>
      </div>
      <div className="mt-8 flex justify-center">
        <Image 
          src="/blog-pic.jpg" 
          alt="Blockchain and Cryptocurrencies" 
          width={600} 
          height={400} 
          objectFit="cover"
        />
      </div>
    </div>
  );
}

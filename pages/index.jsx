import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-4">C2DeFi Zone</h1>
      <p className="mb-4">
        Welcome to our dedicated space where we explore the intriguing world of blockchain and cryptocurrencies. 
        Through our posts, we aim to provide insightful analysis, latest updates, and thoughtful commentary on the developments 
        in the blockchain ecosystem and the ever-evolving cryptocurrency markets.
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

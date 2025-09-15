import { useState, memo } from "react";
import { Layout } from "../components";
import {
  FaCalendarAlt,
  FaUser,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// Sample blog data
const blogData = [
  {
    id: 1,
    title: "Earn Online by Playing Games: Best Platforms & Tips for 2025",
    excerpt: `<p>The world of gaming has changed. What was once only about fun and competition is now also about earning rewards. In 2025, more players are discovering that their love for games can also become a new stream of income. From classic puzzles to blockchain-based platforms, opportunities to earn games online are growing faster than ever.</p>
<p>This blog will walk you through the top platforms, practical tips to maximize rewards, and why Web3 projects like EvoFuse are leading the way into this exciting future.</p>`,
    author: "EvoFuse Team",
    date: "December 15, 2024",
    readTime: "5 min read",
    content: `
      <h4 class="text-xl font-bold pb-2">The Evolution of Gaming Meets Blockchain Technology</h4>
      <p class="pb-2">The play-to-earn (P2E) gaming space is booming, but not every platform is as safe as it looks. With so many new projects popping up, players often wonder: How do I know which ones are real and which ones are scams?</p>
      <p class="pb-2"><b>The Challenge:</b> Some P2E platforms lure gamers with promises of unrealistic returns or “guaranteed income.” These should raise immediate red flags, legitimate platforms focus on sustainable rewards, not empty promises.</p>
      <p class="font-bold pb-2">Common Security Risks:</p>
      <ul class="list-disc list-inside pl-4 pb-2">
        <li>Fake apps that try to steal private keys or user data.</li>
        <li>Rug-pull projects where developers vanish after collecting funds.</li>
        <li>Unsecure wallets that put your earnings at risk.</li>
      </ul>
      <h4 class="text-xl font-bold pb-2">Introducing EvoFuse: Your Gaming Partner in the Play-to-Earn Era</h4>
      <p class="pb-2">In a market full of flashy promises and complicated metaverse projects, EvoFuse stands apart as a platform built on <i><b>simplicity, trust, and innovation</b></i>.</p>
      <p class="pb-2">EvoFuse, short for Evolution Fuse, is a <b>Web3 Classic Game Hub</b> built on the secure and low-fee Fuse Network. It was created to bring a fresh and immersive twist to the timeless classics we all love.</p>
      <p class="pb-2">"<u><a href="https://2048.evofuse.xyz" target="_blank" rel="noopener noreferrer">EvoFuse 2048</a></u>, the first product in the ecosystem, is already showing how casual puzzles can evolve into exciting earning platforms."</p>
      <p class="pb-2">But EvoFuse is not stopping there. By building on strong foundations, the platform plans to expand with other iconic titles like Flappy Bird, giving players simple yet addictive experiences with a whole new layer of value.</p>
      <p class="pb-2">EvoFuse’s mission is to provide users with more than just gameplay. By incorporating:</p>
      <ul class="list-disc list-inside pl-4 pb-2">
      <li><b>Innovative new mechanics</b> that re-energize classic games.</li>
        <li><b>Play-to-Earn systems</b> that reward players fairly.</li>
        <li><b>User-Generated Content(UGC)</b> that allows players to create, share, and shape the future of the games themselves.</li>
      </ul>
      <h4 class="text-xl font-bold pb-2">Best Play-to-Earn Game: How EvoFuse Stands Out in 2025</h4>
      <table class="w-full border-collapse border border-gray-300">
        <tr>
          <th class="border border-gray-300 p-2">Features</th>
          <th class="border border-gray-300 p-2">EvoFuse 2048</th>
          <th class="border border-gray-300 p-2">Other Play-to-Earn Platforms</th>
        </tr>
        <tr>
          <td class="border border-gray-300 p-2">Game Type</td>
          <td class="border border-gray-300 p-2">Classic games like 2048 and Flappy Bird, reimagined with Web3 mechanics </td>
          <td class="border border-gray-300 p-2">Complex RPGs, trading card games, or metaverse projects </td>
        </tr>
        <tr>
          <td class="border border-gray-300 p-2">Accessibility</td>
          <td class="border border-gray-300 p-2">Easy to start, no steep learning curve</td>
          <td class="border border-gray-300 p-2">Often require upfront investment, NFTs, or extensive gameplay knowledge</td>
        </tr>
        <tr>
          <td class="border border-gray-300 p-2">Rewards (P2E)</td>
          <td class="border border-gray-300 p-2">Fair, sustainable play-to-earn model built into casual games</td>
          <td class="border border-gray-300 p-2">Rewards can be volatile, sometimes tied to speculation</td>
        </tr>
        <tr>
          <td class="border border-gray-300 p-2">Innovation</td>
          <td class="border border-gray-300 p-2">Fresh twists on classics + UGC (user-generated content) for custom experiences</td>
          <td class="border border-gray-300 p-2">Limited innovation, focus mostly on existing game genres</td>
        </tr>
        <tr>
          <td class="border border-gray-300 p-2">Community Involvement</td>
          <td class="border border-gray-300 p-2">Players shape games through UGC, events, and content creation</td>
          <td class="border border-gray-300 p-2">Communities exist, but focus more on trading and competition</td>
        </tr>
        <tr>
          <td class="border border-gray-300 p-2">Blockchain Network</td>
          <td class="border border-gray-300 p-2">Built on Fuse Network → low fees, scalable, secure</td>
          <td class="border border-gray-300 p-2">Often on higher-fee or congested networks</td>
        </tr>
      </table>
      <h4 class="text-xl font-bold py-2">Other Platforms in the Play-to-Earn Market</h4>
      <p class="pb-2">While EvoFuse is carving out its niche in classic Web3 gaming, it exists within a broader play-to-earn (P2E) landscape. Here are some of the other notable names in the market:</p>
      <p class="pb-2 font-bold">1. Axie Infinity </p>
      <p class="pb-2">A pioneer in P2E, Axie Infinity lets players breed, battle, and trade Axies, digital pets that hold real-world value as NFTs. It's well-known for its NFT marketplace and strong global community. </p>
      <p class="pb-2 font-bold">2. Decentraland </p>
      <p class="pb-2">A virtual metaverse where users can play, build, and monetize land and content. Decentraland is ideal for players who enjoy creative projects and immersive world-building. </p>
      <p class="pb-2 font-bold">3. Splinterlands </p>
      <p class="pb-2">A blockchain-powered card battle game where players compete in tournaments, complete daily quests, and earn rewards through strategy and skill. </p>
      <p class="pb-2 font-bold">4. Casual Puzzle Platforms with Crypto Rewards </p>
      <p class="pb-2">Some platforms are introducing crypto rewards into timeless classics like Tetris or Snake. These casual puzzle experiences offer a fun and accessible way for players to engage with web3 gaming, combining nostalgia with the added excitement of earning tokens. </p>
      <h4 class="text-xl font-bold pb-2">Why Classic Games Are Perfect for Play-to-Earn</h4>
      <p class="pb-2">Not everyone wants to learn complex RPGs or metaverse economics. For many, the fun lies in simple yet addictive games. This is exactly why classic games are being re-imagined in Web3.</p>
      <p class="pb-2">Think about 2048 or Flappy Bird.</p>
      <p class="pb-2">These games already have millions of fans worldwide. By adding a reward layer, the motivation to play becomes even stronger. EvoFuse is taking this path, offering an online crypto game experience that is easy to pick up but rewarding to play.</p>
      <h4 class="text-xl font-bold pb-2">Tips to Maximize Earnings in 2025</h4>
      <ol class="list-decimal list-inside pl-4 pb-2">
        <li><b>Choose the Right Platform:</b> Pick platforms that combine security, fun, and sustainability. Avoid places that promise unrealistic rewards.</li>
        <li><b>Stay Consistent:</b> Daily logins, challenges, and leaderboards can add up over time. Consistency often beats short bursts of play.</li>
        <li><b>Understand Tokenomics:</b> Before diving in, check how tokens are earned, how they can be withdrawn, and if they hold real value.</li>
        <li><b>Play What You Enjoy:</b> The key to long-term success is loving the process. If you enjoy puzzles, platforms like EvoFuse are a natural fit.</li>
        <li><b>Engage With the Community:</b> Many Web3 games reward active community members through events, tournaments, and user-generated content.</li>
      </ol>
      <h4 class="text-xl font-bold pb-2">Why EvoFuse Is Worth Watching in 2025</h4>
      <p class="pb-2">The blockchain gaming space is crowded, with everything from metaverse projects to bitcoin earning games competing for attention. But EvoFuse is carving out a unique niche. Instead of chasing complex RPGs or speculative economies, it’s focused on what players already love: classic, fun, and accessible games.</p>
      <p class="pb-2">Here’s what makes EvoFuse stand out:</p>
      <ul class="list-disc list-inside pl-4 pb-2">
      <li><b>Classic appeal:</b> Starting with beloved titles like 2048, it welcomes casual players with familiar gameplay.</li>
        <li><b>Web3 Foundation:</b> Built on the Fuse network for low fees, scalability, and secure transactions.</li>
        <li><b>Immersive mechanics:</b> Even simple classics feel fresh with new twists and challenges.</li>
        <li><b>Fair P2E ecosystem:</b> Rewards that are designed to be sustainable and player-friendly.</li>
        <li><b>Community-driven growth:</b> User-generated content(UGC) keeps the ecosystem alive, evolving, and fun.</li>
        </ul>
        <p class="pb-2 italic">This balance of nostalgia + innovation positions EvoFuse as one of the most promising play-to-earn platforms to watch in 2025.</p>
        <h4 class="text-xl font-bold pb-2">The Future of Gaming and Earning</h4>
        <p class="pb-2">Looking ahead, online gaming won’t just be about topping leaderboards. It will be about:</p>
        <ul class="list-disc list-inside pl-4 pb-2">
        <li><b>Building value </b>through your time and effort.</li>
        <li><b>Owning digital assests </b>that you can trade, sell, or showcase.</li>
        <li><b>Creating communities</b> where play, creativity, and collaboration bring real-world benefits.</li>
        </ul>
        <h4 class="text-xl font-bold pb-2">Step Into the Future of Gaming with EvoFuse</h4>
        <p class="pb-2">The year 2025 is shaping up to be a golden era for online gaming. Whether you’re chasing casual fun, competitive edge, or financial rewards, there’s a platform for you.To earn games online, start small, pick the right hub, and enjoy the journey. With the growth of crypto currency games and the introduction of new experiences, players now have more power than ever.</p>
        <p class="pb-2">Among the many names in this space, EvoFuse stands out for blending the timeless joy of classics with the opportunities of Web3. If you’re curious about how your gaming time can bring both fun and value, EvoFuse is a platform worth exploring.</p>
        <p class="text-xl font-bold pb-2">Play smart, stay consistent, and 2025 could be the year where your gaming skills pay off, literally.</p>        
    `,
    tags: ["Blockchain", "Gaming", "NFT", "Web3", "Innovation"],
  },
];

// Blog Card Component
const BlogCard = memo(
  ({
    blog,
    isExpanded,
    onToggle,
  }: {
    blog: (typeof blogData)[0];
    isExpanded: boolean;
    onToggle: () => void;
  }) => (
    <div className="bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden shadow-lg">
      {/* Header Section - Always Visible */}
      <div
        className="p-6 cursor-pointer hover:bg-white/10 transition-all duration-300"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
          <FaCalendarAlt className="text-primary" />
          <span>{blog.date}</span>
          <span className="mx-2">•</span>
          <FaUser className="text-primary" />
          <span>{blog.author}</span>
          <span className="mx-2">•</span>
          <span>{blog.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{blog.title}</h3>

        <div
          className="text-gray-300 mb-4"
          dangerouslySetInnerHTML={{ __html: blog.excerpt }}
        />

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center text-primary text-sm font-medium">
            {isExpanded ? "Read Less" : "Read More"}
            {isExpanded ? (
              <FaChevronUp className="ml-1 text-xs" />
            ) : (
              <FaChevronDown className="ml-1 text-xs" />
            )}
          </div>
        </div>
      </div>

      {/* Expandable Content Section */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[20000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 border-t border-white/10">
          <div
            className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300 prose-ul:text-gray-300"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

const Blog = memo(() => {
  const [expandedBlogId, setExpandedBlogId] = useState<number | null>(null);

  const handleToggleBlog = (blogId: number) => {
    setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-56px)] w-full relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover insights, updates, and stories from the EvoFuse team as
              we build the future of blockchain gaming.
            </p>
          </div>

          {/* Blog List */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {blogData.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  isExpanded={expandedBlogId === blog.id}
                  onToggle={() => handleToggleBlog(blog.id)}
                />
              ))}
            </div>

            {/* Coming Soon Message */}
            <div className="mt-12 text-center">
              <div className="bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  More Content Coming Soon
                </h3>
                <p className="text-gray-300">
                  We're working on exciting new blog posts about blockchain
                  gaming, development insights, and community stories. Stay
                  tuned!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

Blog.displayName = "Blog";

export default Blog;

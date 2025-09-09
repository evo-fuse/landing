import { Layout } from "../components";
import { useState } from "react";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-56px)] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="w-[90vw] h-full max-w-[1600px] mx-auto py-12 flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-12 items-center">
            <div className="flex flex-col gap-6 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-gray-700/50 shadow-xl">
              <div className="inline-block mb-2">
                <span className="bg-main-500 text-white text-xs font-bold px-3 py-1 rounded-full">ABOUT US</span>
              </div>
              <h1 className="text-4xl md:text-5xl text-white font-bold bg-gradient-to-r from-main-400 to-purple-400 bg-clip-text text-transparent">EvoFuse</h1>
              <p className="text-gray-200 text-xl">
                Play the best crypto games online and earn real rewards on the Fuse Network blockchain.
              </p>
              <p className="text-gray-200">
                At EvoFuse, we're passionate about bringing traditional gaming experiences into the blockchain era. 
                Our platform combines the nostalgia of classic games with the innovative capabilities of the Fuse Network, 
                creating unique gaming experiences where you can earn games online with cryptocurrency rewards.
              </p>
              <ul className="list-none space-y-3 text-gray-200">
                {[
                  "Best crypto games online with real rewards",
                  "Earn games online with cryptocurrency",
                  "Blockchain-powered gaming experiences",
                  "Own and trade in-game assets",
                  "Community-driven development"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="min-w-6 min-h-6 max-w-6 max-h-6 mr-3 bg-main-500 rounded-full flex items-center justify-center text-white">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-gray-700/50 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>

              {submitStatus && (
                <div
                  className={`p-4 mb-4 rounded ${
                    submitStatus.success
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-main-500 focus:border-main-500 bg-gray-700/70 text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-main-500 focus:border-main-500 bg-gray-700/70 text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="focus:outline-none w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-main-500 focus:border-main-500 bg-gray-700/70 text-white"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-main-500 to-main-700 hover:from-main-600 hover:to-main-800 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 shadow-lg shadow-main-500/30 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

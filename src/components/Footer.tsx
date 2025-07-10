const Footer = () => {
    return (
        <footer className="w-full bg-black text-white font-[poppins] py-10 px-6 pt-10 border-t border-zinc-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div>
                    <h3 className="font-medium text-lg mb-3">Browse</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>Top Rated</li>
                        <li>Now Playing</li>
                        <li>Popular</li>
                        <li>Genres</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-medium text-lg mb-3">Support</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>Help Center</li>
                        <li>Account</li>
                        <li>Media Center</li>
                        <li>Investor Relations</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-medium text-lg mb-3">Legal</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>Privacy</li>
                        <li>Terms of Use</li>
                        <li>Cookies</li>
                        <li>Corporate Info</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-medium text-lg mb-3">Made with 🍿</h3>
                    <p className="text-zinc-400 mb-4">
                        Built using TMDB API, React, and some late-night snacks.
                    </p>
                    <a
                        href="https://github.com/anishraj-coder/netflix-gpt.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-blue-400 hover:underline"
                    >
                        View Project on GitHub ↗
                    </a>
                </div>
            </div>

            <div className="mt-10 text-center text-zinc-500 text-xs">
                © {new Date().getFullYear()} Netflix-GPT. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

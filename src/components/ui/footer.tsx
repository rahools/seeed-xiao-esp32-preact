import { Github } from "lucide-react";

interface FooterProps {
    className?: string;
}

export function Footer({ className = "" }: FooterProps) {
    return (
        <footer
            className={`fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 ${className}`}
        >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                {/* GitHub Star Widget */}
                <div className="flex items-center gap-2">
                    <a
                        href="https://github.com/rahools/seeed-xiao-esp32-preact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Star on GitHub</span>
                    </a>
                </div>

                {/* Attribution */}
                <div className="text-sm text-gray-500">
                    Made with <span className="text-red-500">♥</span> by{" "}
                    <a
                        href="https://github.com/rahools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        @rahools
                    </a>
                </div>
            </div>
        </footer>
    );
}

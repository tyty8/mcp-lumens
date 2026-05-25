export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: copyright */}
          <p className="text-sm text-muted-foreground font-mono">
            &copy; 2026 Lumens Sur
          </p>

          {/* Right: links */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground font-mono">
            <a
              href="https://github.com/modelcontextprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.lumenssur.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              &#8599; lumenssur.com
            </a>
          </div>
        </div>

        {/* Subtext */}
        <p className="mt-4 text-xs text-muted-foreground/60 font-mono">
          MCP (Model Context Protocol) is an open standard by Anthropic.
        </p>
      </div>
    </footer>
  )
}

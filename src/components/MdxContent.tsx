import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { MDXComponents } from 'mdx/types'

interface MdxContentProps {
  source: string
}

const mdxComponents: MDXComponents = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  h4: (props) => <h4 {...props} />,
  p: (props) => <p {...props} />,
  a: (props) => (
    <a
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <pre {...props} />,
  hr: (props) => <hr {...props} />,
  table: (props) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  th: (props) => <th {...props} />,
  td: (props) => <td {...props} />,
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <article className="mdx-content prose prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  )
}

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styling for markdown elements
          h1: ({node, ...props}) => (
            <h1 className="text-4xl font-bold text-white mb-8 pb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 p-6 rounded-xl shadow-lg border-l-8 border-yellow-400" {...props} />
          ),
          h2: ({node, ...props}) => (
            <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-10 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm" {...props} />
          ),
          h3: ({node, ...props}) => (
            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow duration-300" {...props} />
          ),
          p: ({node, ...props}) => (
            <p className="text-gray-700 mb-6 leading-relaxed text-lg" {...props} />
          ),
          ul: ({node, ...props}) => (
            <ul className="list-none pl-0 mb-6 space-y-3" {...props} />
          ),
          ol: ({node, ...props}) => (
            <ol className="list-none pl-0 mb-6 space-y-3" {...props} />
          ),
          li: ({node, ...props}) => (
            <li className="flex items-start p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-l-4 border-blue-400 shadow-sm hover:shadow-md transition-all duration-300" {...props} />
          ),
          strong: ({node, ...props}) => (
            <strong className="font-bold text-blue-900 bg-gradient-to-r from-blue-100 to-blue-200 px-2 py-1 rounded-md border border-blue-300 shadow-sm" {...props} />
          ),
          em: ({node, ...props}) => (
            <em className="italic text-blue-700 font-medium" {...props} />
          ),
          a: ({node, ...props}) => (
            <a 
              className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-all duration-200 hover:bg-blue-50 px-1 py-0.5 rounded" 
              target="_blank" 
              rel="noopener noreferrer"
              {...props} 
            />
          ),
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-6 border-blue-500 pl-6 italic text-gray-800 font-medium my-8 bg-gradient-to-r from-blue-50 to-indigo-50 py-6 rounded-r-xl shadow-lg relative overflow-hidden" {...props}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-full opacity-20 -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-200 rounded-full opacity-20 -ml-6 -mb-6"></div>
            </blockquote>
          ),
          hr: ({node, ...props}) => (
            <hr className="my-12 border-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full" {...props} />
          ),
          code: ({node, ...props}: any) => {
            const inline = props.inline || false;
            return inline ? 
              <code className="bg-gradient-to-r from-gray-100 to-blue-100 px-2 py-1 rounded-md text-sm font-mono text-gray-800 border border-gray-200" {...props} /> :
              <code className="block bg-gradient-to-br from-gray-100 to-blue-50 p-6 rounded-xl text-sm font-mono text-gray-800 overflow-x-auto border border-gray-200 shadow-sm" {...props} />
          },
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-8 rounded-xl shadow-lg border border-gray-200">
              <table className="min-w-full border-collapse bg-white" {...props} />
            </div>
          ),
          th: ({node, ...props}) => (
            <th className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 text-left font-bold border-b border-gray-200" {...props} />
          ),
          td: ({node, ...props}) => (
            <td className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

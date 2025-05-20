import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import useSubjectContent from '../hooks/api/useSubjectContent';
import { useCourseOutline } from '../contexts/providers/CourseOutlineProvider';
export default function MarkdownToHtml({initLoading}){
   const {currentTopic} = useCourseOutline()
   const {content,loading,error} = useSubjectContent(currentTopic);

     if(initLoading || loading) return <div>Loading...</div>
  
    return(
        <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>
                {children}
              </code>
            );
          },
          h1:(props)=><h1 className="text-2xl font-bold text-red-400" {...props}/>
        }}
      >
        {content}
      </ReactMarkdown>
    )
}
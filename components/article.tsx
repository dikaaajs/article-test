import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Article({ content }: { content: string }) {
  return (
    <div className="prose mx-auto font-archivo text-slate-700 space-y-[16px]">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
}

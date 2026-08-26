import ReactMarkdown from "react-markdown";

interface MarkdownComponentProps {
  markdownContents: string[];
}

export const MarkdownComponent = ({ markdownContents }: MarkdownComponentProps) => (
  <div>
    {markdownContents.map((content, index) => (
      <ReactMarkdown key={index}>{content}</ReactMarkdown>
    ))}
  </div>
);

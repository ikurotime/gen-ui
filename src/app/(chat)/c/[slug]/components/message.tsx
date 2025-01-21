import BotIcon from "./BotIcon";
import Markdown from "react-markdown";

export default function Message({
  content = "No text",
  role,
}: {
  content: string;
  role: string;
}) {
  if (role === "user") {
    return (
      <span className="p-4 rounded-lg bg-stone-100 ml-auto dark:bg-stone-600 prose prose-invert">
        <Markdown>{content}</Markdown>
      </span>
    );
  }
  return (
    <div className="flex mr-auto gap-2">
      <div className="border rounded-full  size-10 p-1 border-stone-300 flex justify-center items-center">
        <BotIcon />
      </div>
      <div className="flex flex-col prose prose-invert">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}

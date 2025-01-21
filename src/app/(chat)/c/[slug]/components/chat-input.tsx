type ChatInputProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
};
export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
}: ChatInputProps) {
  return (
    <form className="flex w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={handleInputChange}
        className="flex fixed bottom-2 max-w-3xl w-full m-4 resize-none text-stone-600 dark:bg-stone-700 dark:placeholder-stone-400 dark:text-white placeholder-stone-600 bg-stone-100 p-4 rounded-xl"
        placeholder="Type here"
      />
    </form>
  );
}

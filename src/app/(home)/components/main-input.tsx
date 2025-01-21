"use client";

export default function MainInput() {
  return (
    <form action={"/c/channel"}>
      <input
        name="message"
        className="w-full resize-none max-w-3xl text-stone-600 placeholder-stone-600 bg-stone-100 p-4 rounded-xl"
        placeholder="Type here"
      />
    </form>
  );
}

import ChatInterface from '@/components/ChatInterface'

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  console.log(slug)
  return <ChatInterface />
}

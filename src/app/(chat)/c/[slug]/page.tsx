import ChatInterface from '@/components/ChatInterface'

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  //TODO: Implement useQuery hook with hydration. Pass slug to useGetChat and pass the respone to ChatInterface
  console.log(slug)
  return <ChatInterface />
}

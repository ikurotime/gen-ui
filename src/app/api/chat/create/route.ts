export async function POST(req: Request) {
  const { id, name, messages } = await req.json()
  const body = await fetch('http://localhost:8080/create-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name, messages })
  })
  console.log({ body })
  if (!body.ok) {
    return Response.error()
  }
  const res = await body.json()
  return Response.json(res)
}

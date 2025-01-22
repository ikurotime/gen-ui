export async function POST(req: Request) {
  const { id, name, message } = await req.json()
  const body = await fetch('http://localhost:8080/create-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name, message })
  })
  const res = await body.json()
  return Response.json(res)
}

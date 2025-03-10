export async function POST(req: Request) {
  const { id } = await req.json()
  const body = await fetch(`http://localhost:8080/get-chat?chat_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log({ body })
  if (!body.ok) {
    return Response.error()
  }
  const res = await body.json()
  return Response.json(res)
}

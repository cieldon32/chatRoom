
export default function Messages({messages}: any) {
  return (
    <div>
      {
        messages.map((message: string, index: number) => (
            <p key={index}>{message}</p>
        ))
      }
    </div>
  )
}
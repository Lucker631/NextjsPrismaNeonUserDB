import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h1>
      <p className="mb-4">Thank you for your submission.</p>
      <Link href="/submit-form" className="text-blue-500 hover:underline">
        Submit another form
      </Link>
    </div>
  )
}


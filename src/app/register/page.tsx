'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  image: string
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    image: ''
  })
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user')
      }

      setStatus({
        type: 'success',
        message: 'User created successfully!'
      })
      setFormData({ name: '', email: '', image: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
      <Card className="w-full max-w-md mx-auto md:w-2/3 lg:w-1/2 p-6 space-y-4">
        <CardHeader className="space-y-1">
          <Link href="/" className="text-sm text-blue-500 hover:text-blue-700 mb-2 inline-block">
            ← Back to Home
          </Link>
          <CardTitle>Register New User</CardTitle>
        </CardHeader>
        <CardContent>
          {status.type && (
            <Alert className={`mb-4 ${status.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <AlertDescription>
                {status.message}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                type="url"
                required
                value={formData.image}
                onChange={handleChange}
                className="mt-1"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create User'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
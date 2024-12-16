import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome to My App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <Link href="/register">
              <Button className="w-full" size="lg">
                Register New User
              </Button>
            </Link>
            
            <Link href="/users">
              <Button className="w-full" variant="outline" size="lg">
                Show All Users
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
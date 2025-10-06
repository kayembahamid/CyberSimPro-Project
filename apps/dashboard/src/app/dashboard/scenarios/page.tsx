import { api } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ErrorMessage } from '@/components/error-message'

export default async function ScenariosPage() {
  let data = []
  let error = null

  try {
    const response = await api.get('/api/scenarios')
    data = response.data || []
  } catch (e) {
    error = 'Failed to load scenarios. Please try again.'
  }

  if (error) {
    return (
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">Scenarios</h1>
        <ErrorMessage message={error} />
      </div>
    )
  }
  
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Scenarios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((scenario: any) => (
          <Card key={scenario.id}>
            <CardHeader>
              <CardTitle>{scenario.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>
              <Badge>{scenario.difficulty}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

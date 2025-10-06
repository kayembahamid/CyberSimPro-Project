import { api } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorMessage } from '@/components/error-message'

export default async function SimulationsPage() {
  let data = []
  let error = null

  try {
    const response = await api.get('/api/simulations')
    data = response.data || []
  } catch (e) {
    error = 'Failed to load simulations. Please try again.'
  }

  if (error) {
    return (
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">Simulations</h1>
        <ErrorMessage message={error} />
      </div>
    )
  }
  
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Simulations</h1>
      <div className="grid gap-4">
        {data.map((sim: any) => (
          <Card key={sim.id}>
            <CardHeader>
              <CardTitle>Simulation {sim.id.slice(0, 8)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {sim.status}</p>
              <p>Score: {sim.score || 'N/A'}</p>
              {sim.scenario && <p>Scenario: {sim.scenario.title}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

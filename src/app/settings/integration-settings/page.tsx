import { Separator } from '@/components/ui/separator'
import React from 'react'
import IntegrationsSettingsForm from './IntegrationSettingsForm'

const IntegrationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integration Settings</h3>
      </div>
      <Separator />
      <IntegrationsSettingsForm />
    </div>
  )
}

export default IntegrationPage

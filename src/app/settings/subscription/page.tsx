import React from 'react';

import { Separator } from '@/components/ui/separator';

import SubscriptionCard from './SubscriptionCard';

const SubscriptionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Subscriptions details.
        </p>
      </div>
      <Separator />
      <SubscriptionCard />
    </div>
  );
};

export default SubscriptionsPage;

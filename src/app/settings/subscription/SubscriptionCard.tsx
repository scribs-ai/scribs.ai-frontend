'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { subscriptionApi } from '@/app/api/settingsService';

interface SubscriptionCardProps { }

const SubscriptionCard: React.FC<SubscriptionCardProps> = () => {
  const route = useRouter();
  const plans: string[] = ['Plan A', 'Plan B', 'Plan C'];

  const handleClick = async (data: string) => {
    try {
      const response = await subscriptionApi(data);
      if (response) {
        route.push(response);
      }
    } catch (error) {
      toast({
        title: 'Unable to make payment, try again.',
      });
    }
  };

  return (
    <>
      {plans.map((plan, index) => (
        <div className="flex items-center justify-between rounded-lg border p-4" key={index}>
          <div>
            <h3 className="text-lg font-semibold">{plan}</h3>
            <p>Details of subscription.</p>
          </div>
          <Button
            variant="outline"
            className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            onClick={() => handleClick(plan)}
          >
            Pay here
          </Button>
        </div>
      ))}
    </>
  );
};

export default SubscriptionCard;

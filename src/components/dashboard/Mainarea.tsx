'use client'
import React, { useState } from 'react'
import NotificationPopUp from './NotificationPopUp'
import { Button } from '../ui/button'
import { Bell, BellDot } from 'lucide-react'

export interface NotificationData {
  title: string;
  content: string;
}

const Mainarea = () => {
  const [notifications, setNotifications] = useState<NotificationData | null>(null);
  return (
    <div className='flex justify-between'>
      <h1>Main area</h1>
      <NotificationPopUp notifications={notifications} setNotifications={setNotifications}>
        <Button variant='link'>
          {notifications ? <BellDot color='red' /> : <Bell />}
        </Button>
      </NotificationPopUp>
    </div >
  )
}

export default Mainarea

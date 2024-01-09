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
  const [newNotification, setNewNotification] = useState<NotificationData | null>(null)
  const [notifications, setNotifications] = useState<NotificationData[] | null>(null);
  return (
    <div className='flex justify-between'>
      <h1>Main area</h1>
      <NotificationPopUp
        newNotification={newNotification}
        setNewNotification={setNewNotification}
        notifications={notifications}
        setNotifications={setNotifications}
      >
        <Button variant='link'>
          {newNotification ? <BellDot color='red' /> : <Bell />}
        </Button>
      </NotificationPopUp>
    </div >
  )
}

export default Mainarea

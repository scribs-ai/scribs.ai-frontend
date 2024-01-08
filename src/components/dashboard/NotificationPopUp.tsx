'use client'
import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ActionCableContext } from './context/ActionCableProvider';
import { NotificationData } from './Mainarea';



interface NotificationPopUpProps {
  children: React.ReactElement;
  notifications: any
  setNotifications: any
}

const NotificationPopUp: React.FC<NotificationPopUpProps> = ({ children, notifications, setNotifications }) => {
  const cable = useContext(ActionCableContext);
  const [channel, setChannel] = useState<any>(null);


  useEffect(() => {
    if (!channel && cable) {
      const chnl = cable.subscriptions.create(
        {
          channel: 'NotificationChannel',
        },
        {
          received: (data: NotificationData) => {
            setNotifications(data);
          },
        }
      );
      setChannel(chnl);
    }


    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [cable, channel, setNotifications]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>All the notifications are shown below.</DialogDescription>
        </DialogHeader>

        {notifications && (
          <ul>
            <strong>{notifications.title}</strong>: {notifications.content}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPopUp;

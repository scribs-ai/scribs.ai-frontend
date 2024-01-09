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
  newNotification: NotificationData | null;
  setNewNotification: React.Dispatch<React.SetStateAction<NotificationData | null>>;
  notifications: NotificationData[] | null;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationData[] | null>>;
}

const NotificationPopUp: React.FC<NotificationPopUpProps> = ({ children, newNotification, setNewNotification, notifications, setNotifications }) => {
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
            setNewNotification(data)
            setNotifications((prevNotifications) => {
              if (prevNotifications) {
                return [...prevNotifications, data];
              }
              return [data];
            });
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
  }, [cable, channel, setNotifications, setNewNotification]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>All the notifications are shown below.</DialogDescription>
        </DialogHeader>
        <ul>
          {notifications && notifications.map((notification, index) => (
            <li key={index} className='hover:bg-gray-100 p-4 border-b-2 text-sm'>
              <strong>{notification.title}</strong>: {notification.content}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPopUp;

"use client"

import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

import { getUserDataApi, updateUserDataApi } from "../api/settingsService"

const profileFormSchema = z.object({
  profile_picture: z
    .any(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please write an valid email address.",
    })
    .email(),
  created_at: z.string(),
  updated_at: z.string(),
})

type ProfileFormSchemaType = z.infer<typeof profileFormSchema>

const ProfileForm: React.FC = () => {

  const [userData, setUserData] = useState<ProfileFormSchemaType>({
    name: '',
    email: '',
    profile_picture: undefined,
    created_at: '',
    updated_at: '',
  });

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: userData
  });
  const fileRef = form.register("profile_picture", { required: true });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDataApi();
        setUserData(response);
        form.reset(response);
      } catch (error: any) {
        toast({
          title: error.message,
        });
      }
    };

    fetchUserData();
  }, [form]);

  const onSubmit = async (data: ProfileFormSchemaType) => {
    try {
      const formData = new FormData();
      formData.append('user[name]', data.name);
      formData.append('user[email]', data.email);
      if (typeof data.profile_picture !== 'string') {
        formData.append('user[image]', data.profile_picture[0]);
      }
      const response = await updateUserDataApi(formData)
      if (response) {
        setUserData(response)
        toast({
          title: 'Profile updated successfully!',
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7" >
        <Avatar className="w-32 h-32">
          <AvatarImage alt="Profile-image" src={'http://13.58.78.54:3000' + userData.profile_picture} />
          <AvatarFallback>{userData.name}</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="profile_picture"
          render={() => (
            <FormItem className="space-y-2" >
              <FormLabel>Change Profile Picture</FormLabel>
              <FormControl>
                <Input
                  accept="image/png, image/jpeg, image/jpg"
                  type="file"
                  placeholder="profile image"
                  {...fileRef}
                />
              </FormControl>
              <FormDescription>
                You can change profile picture from here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your email settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="created_at"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Created At</FormLabel>
              <FormControl>
                <Input placeholder="Created At" {...field} readOnly={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="updated_at"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Updated At</FormLabel>
              <FormControl>
                <Input placeholder="Updated At" {...field} readOnly={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}

export default ProfileForm;

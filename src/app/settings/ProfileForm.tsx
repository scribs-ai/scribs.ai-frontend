"use client"

import { useEffect, useRef, useState } from "react"

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
import { XCircle } from "lucide-react"

import { getUserDataApi, updateUserDataApi } from "../api/settingsService"
import { getSourceUrl } from "@/lib/utils"
import { profileFormSchema } from "@/lib/schemas"

type ProfileFormSchemaType = z.infer<typeof profileFormSchema>

const ProfileForm: React.FC = () => {
  const fileRef = useRef<any>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previousPicture, setPreviousPicture] = useState("")
  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      profile_picture: null,
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { first_name, last_name, email, profile_picture } = await getUserDataApi();
        form.reset({ first_name: first_name ?? "", last_name: last_name ?? "", email, profile_picture: profile_picture ?? "" })
        setPreviousPicture(profile_picture)
      } catch (error: any) {
        toast({
          title: error.message,
        });
      }
    };

    fetchUserData();
  }, [form]);

  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        form.setValue('profile_picture', file);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleRemove = () => {
    setPreviewImage(getSourceUrl(previousPicture))
    form.setValue('profile_picture', null)
    fileRef.current.value = ""
  }

  const onSubmit = async (data: ProfileFormSchemaType) => {
    try {
      const formData = new FormData();
      formData.append('user[first_name]', data.first_name);
      formData.append('user[last_name]', data.last_name);
      formData.append('user[email]', data.email);
      if (data.profile_picture !== null && typeof data.profile_picture !== 'string') {
        formData.append('user[image]', data.profile_picture);
      }
      const response = await updateUserDataApi(formData)
      if (response) {
        toast({
          title: 'Profile updated successfully!',
        });
        const { first_name, last_name, email, profile_picture } = await getUserDataApi();
        form.reset({ first_name: first_name ?? "", last_name: last_name ?? "", email, profile_picture: profile_picture ?? "" });
        setPreviousPicture(profile_picture);
        setPreviewImage(null);
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
          <AvatarImage alt="Profile-image" src={previewImage ? previewImage : getSourceUrl(form.getValues('profile_picture'))} />
          <AvatarFallback>{form.getValues('first_name')}</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="profile_picture"
          render={() => (
            <FormItem className="space-y-2" >
              <FormLabel>Change Profile Picture</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <Input
                    ref={fileRef}
                    accept="image/png, image/jpeg, image/jpg"
                    type="file"
                    placeholder="profile image"
                    onChange={(e) => {
                      handleImagePreview(e);
                    }}
                  />
                </FormControl>
                {fileRef?.current?.value !== "" && <XCircle className="absolute right-3 top-3 h-5 w-5 opacity-50" onClick={handleRemove} />}
              </div>
              <FormDescription>
                You can change profile picture from here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display first name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display last name.
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
                <Input placeholder="Enter email" {...field} disabled />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your email settings.
              </FormDescription>
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

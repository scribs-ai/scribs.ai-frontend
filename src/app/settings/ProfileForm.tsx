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
      name: '',
      email: '',
      profile_picture: null,
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { name, email, profile_picture } = await getUserDataApi();
        form.reset({ name: name ?? "", email, profile_picture: profile_picture ?? "" })
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
      formData.append('user[name]', data.name);
      formData.append('user[email]', data.email);
      if (data.profile_picture !== null && typeof data.profile_picture !== 'string') {
        formData.append('user[image]', data.profile_picture);
      }
      const response = await updateUserDataApi(formData)
      if (response) {
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
          <AvatarImage alt="Profile-image" src={previewImage ? previewImage : getSourceUrl(form.getValues('profile_picture'))} />
          <AvatarFallback>{form.getValues('name')}</AvatarFallback>
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

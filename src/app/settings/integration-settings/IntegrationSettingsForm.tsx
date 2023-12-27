"use client"

import React from 'react'
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
import { integrationsettingApi } from '@/app/api/settingsService'
import { toast } from '@/components/ui/use-toast'

const integrationFormSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.length == 1, "File is required."),
})

type IntegrationFormSchemaType = z.infer<typeof integrationFormSchema>

const IntegrationSettingsForm: React.FC = () => {
  const form = useForm<IntegrationFormSchemaType>({
    resolver: zodResolver(integrationFormSchema),
  })

  const { handleSubmit, control } = form;

  const onSubmit = async (data: IntegrationFormSchemaType) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      const response = await integrationsettingApi(formData)
      if (response) {
        toast({
          title: response.message,
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          control={control}
          name="file"
          render={() => (
            <FormItem className="space-y-2">
              <FormLabel>Choose a file</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="file"
                  {...control.register("file", { required: true })}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                You can upload any file to drive.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Upload</Button>
      </form>
    </Form>
  )
}

export default IntegrationSettingsForm;

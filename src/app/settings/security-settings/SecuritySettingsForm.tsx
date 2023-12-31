"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { securityFormSchema } from "@/lib/schemas"
import { twoFactorSettingApi } from "@/app/api/settingsService"

type schemaType = z.infer<typeof securityFormSchema>

const SecuritySettingsForm = () => {
  const form = useForm<schemaType>({
    resolver: zodResolver(securityFormSchema),
  })

  const onSubmit = async (data: schemaType) => {
    try {
      const response = await twoFactorSettingApi(data)
      if (response) {
        toast({
          title: "Setting updated successfully"
        })
      }
    } catch (error: any) {
      toast({
        title: error.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Security Settings</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="two_factor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Two Factor Authentication</FormLabel>
                    <FormDescription>
                      enable/disable 2FA by clicking this button.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SecuritySettingsForm;

"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

const BASE_URL = 'http://13.58.78.54:3000/settings/languages/';

const languageFormSchema = z.object({
  language: z
    .string({
      required_error: "Please select an language to display.",
    })
})

type languageFormValues = z.infer<typeof languageFormSchema>

const LangAndAccessForm: React.FC = () => {

  const [languageOptions, setLanguageOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}language_options`
        );
        if (response.data && Array.isArray(response.data.languages)) {
          setLanguageOptions(response.data.languages);
        }
      } catch (error) {
        toast({
          title: "Error fetching language options.",
        });
      }
    };

    fetchLanguageOptions();
  }, []);

  const form = useForm<languageFormValues>({
    resolver: zodResolver(languageFormSchema),
  });


  const onSubmit = async (data: languageFormValues) => {

    try {
      const response = await axios.post(`${BASE_URL}set_language`, { locale: data.language })
      if (response) {
        toast({
          title: 'Language change successfully'
        })
      }
    } catch (error) {
      toast({
        title: 'Unable to change the language, please try again.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Language</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none bg-transparent font-normal"
                    )}
                    {...field}
                  >
                    {languageOptions && languageOptions.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
              <FormDescription>
                Set the language you want to use in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Change language</Button>
      </form>
    </Form>
  )
}

export default LangAndAccessForm;
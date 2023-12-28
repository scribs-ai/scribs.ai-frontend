"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTranslation } from 'react-i18next';
import { languageFormSchema } from "@/lib/schemas"

const BASE_URL = 'http://13.58.78.54:3000/settings/languages/';


type languageFormValues = z.infer<typeof languageFormSchema>

const LangAndAccessForm: React.FC = () => {
  const { t, i18n } = useTranslation();

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
        i18n.changeLanguage(data.language)
        toast({
          title: t('languageChangeSuccess'),
        })
      }
    } catch (error) {
      toast({
        title: t('languageChangeError'),
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
              <FormLabel>{t('language')}</FormLabel>
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
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 opacity-50" />
              </div>
              <FormDescription>
                {t('languageOptionsDesc')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t("languageButton")}</Button>
      </form>
    </Form>
  )
}

export default LangAndAccessForm;

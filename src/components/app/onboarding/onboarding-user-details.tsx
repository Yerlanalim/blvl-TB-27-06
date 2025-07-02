'use client';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingStepOneSchema } from '@/lib/zod/schemas/onboarding/step-one';
import type { UpdatableUserFields } from '@/types';

import { CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { InputWithLabel } from '@/components/ui/input-label';
// import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
// import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  // FormLabel, // не используется
} from '@/components/ui/form';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { toast } from 'sonner';

import { checkUsername } from '@/actions/user/authed/check-username';
// import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const whereDidYouHearAboutBizLevel = [
  'Reddit',
  'Google',
  'X (Twitter)',
  'LinkedIn',
  'Daily.dev',
  'GitHub',
  'YouTube',
  'TikTok',
  'Instagram',
  'Friend',
  'Other',
];

export default function OnboardingStepOne() {
  const { user, setUser, itemVariants, setCanContinue, serverUser } = useOnboardingContext();
  const [username, setUsername] = useState(user?.username || '');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const form = useForm<UpdatableUserFields>({
    resolver: zodResolver(onboardingStepOneSchema),
    defaultValues: {
      userProfilePicture: user?.userProfilePicture || '',
      username: user?.username || '',
      showTimeTaken: user?.showTimeTaken || false,
      sendPushNotifications: user?.sendPushNotifications || false,
      experienceLevel: user?.experienceLevel || 'BEGINNER',
      howDidYouHearAboutBizLevel: user?.howDidYouHearAboutBizLevel || '',
      sendPromotionalEmails: user?.sendPromotionalEmails || false,
      fasterThanAiGameMode: user?.fasterThanAiGameMode || false,
      userXp: user?.userXp || 0,
    },
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    form.setValue('username', newUsername);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      const isUnique = await checkUsername(newUsername);
      setIsUsernameValid(Boolean(isUnique));

      if (isUnique) {
        toast.success('Username is available');
      } else {
        toast.error('Username is already taken. Please choose another one.');
      }
      setCanContinue(Boolean(isUnique));
    }, 1000);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      // TODO: fix this
      // @ts-ignore
      setUser(() => {
        // Filter out any undefined values from arrays to ensure type safety
        const sanitizedValue = {
          ...value,
          stripeEmails: value.stripeEmails?.filter((email): email is string => email !== undefined),
        };
        return sanitizedValue;
      });
    });
    return () => subscription.unsubscribe();
  }, [form, setUser]);

  const onSubmitProfilePicture = async (data: any) => {
    if (!serverUser?.uid || !data.target.files[0]) return;

    const file = data.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file.size > maxSize) {
      toast.error('Размер файла должен быть меньше 2MB');
      return;
    }

    // Проверяем тип файла
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Поддерживаются только изображения PNG и JPEG');
      return;
    }

    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append('files', file);
    formData.append('userId', serverUser.uid);
    formData.append('route', 'user-profile-pictures');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Ошибка загрузки');
      }
      
      const { logoUrl } = await res.json();

      if (logoUrl) {
        form.setValue('userProfilePicture', logoUrl);
        setUser((prev) => ({
          ...prev,
          userProfilePicture: logoUrl,
        }));
        toast.success('Фото профиля обновлено!');
      } else {
        throw new Error('Не удалось получить URL изображения');
      }
    } catch (e) {
      console.error('Avatar upload error:', e);
      toast.error(e instanceof Error ? e.message : 'Не удалось загрузить фото профиля');
    } finally {
      setIsUploadingAvatar(false);
      // Сбрасываем input чтобы можно было выбрать тот же файл снова
      data.target.value = '';
    }
  };

  return (
    <>
      <CardHeader className="space-y-1">
        <motion.h1
          className="text-3xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Добро пожаловать!
        </motion.h1>
        <CardDescription className="text-gray-400">
          <motion.span variants={itemVariants}>
            Давайте настроим ваш аккаунт для начала обучения.
          </motion.span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log('Form submitted with data:', data);
              setUser((prev) => ({
                ...prev,
                ...data,
              }));
            })}
            className="space-y-5"
          >
            {/** profile picture */}
            <FormField
              control={form.control}
              name="userProfilePicture"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative size-16 md:size-24 rounded-full overflow-hidden border-2 border-black-50">
                      {field.value ? (
                        <img
                          src={field.value}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-black flex items-center justify-center">
                          <span className="text-gray-400 text-xs text-center">Нет изображения</span>
                        </div>
                      )}
                      {/* Индикатор загрузки */}
                      {isUploadingAvatar && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="logo-file-upload"
                        className="text-base font-medium text-white"
                      >
                        Фото профиля
                      </Label>
                      <div className="flex gap-2">
                        <label
                          htmlFor="logo-file-upload"
                          className={`cursor-pointer border border-black-50 px-4 py-2 rounded-md text-base ${
                            isUploadingAvatar 
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          }`}
                        >
                          {isUploadingAvatar ? 'Загрузка...' : 'Выбрать файл'}
                        </label>
                        <Input
                          id="logo-file-upload"
                          type="file"
                          onChange={(e) => {
                            if (!isUploadingAvatar) {
                              onSubmitProfilePicture(e);
                            }
                          }}
                          className="hidden"
                          accept="image/*"
                          disabled={isUploadingAvatar}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Рекомендуется: квадратное изображение, минимум 200x200px (макс. 2MB)
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-2 text-white"
              variants={itemVariants}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="Имя пользователя"
                        type="text"
                        autoComplete="username"
                        placeholder="Имя пользователя"
                        {...field}
                        value={username}
                        onChange={handleUsernameChange}
                        className={`input ${!isUsernameValid && 'border-red-500'}`}
                      />
                    </FormControl>
                    <FormMessage className="mt-0.5 text-start">
                      {form.formState?.errors?.username?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </motion.div>
            {/* BIZLEVEL: Скрытые элементы onboarding - будут добавлены позже
            <motion.div initial="hidden" animate="visible" variants={itemVariants} className="hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormField
                      control={form.control}
                      name="showTimeTaken"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="showTimeTaken" className="text-white">
                              Показывать в рейтинге
                            </Label>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setUser((prev) => {
                                  console.log('showTimeTaken changed:', checked);
                                  return { ...prev, [field.name]: checked };
                                });
                              }}
                              className="bg-black-50"
                            />
                          </FormControl>
                          <FormMessage className="mt-0.5 text-start">
                            {form.formState?.errors?.showTimeTaken?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ваш прогресс будет виден другим</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={itemVariants} className="hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormField
                      control={form.control}
                      name="fasterThanAiGameMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="fasterThanAiGameMode" className="text-white">
                              <span>Faster than AI game mode</span>
                              <span className="ml-2 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-md font-onest">
                                New!
                              </span>
                            </Label>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setUser((prev) => {
                                  console.log('fasterThanAiGameMode changed:', checked);
                                  return { ...prev, [field.name]: checked };
                                });
                              }}
                              className="bg-black-50"
                            />
                          </FormControl>
                          <FormMessage className="mt-0.5 text-start">
                            {form.formState?.errors?.fasterThanAiGameMode?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You'll be able to see how much faster you are than AI in the questions.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="space-y-2 text-white hidden"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormField
                      control={form.control}
                      name="sendPromotionalEmails"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <Label htmlFor="sendPromotionalEmails" className="text-white">
                                  Receive promotional emails
                                </Label>
                                <TooltipProvider>
                                  <Tooltip delayDuration={0}>
                                    <TooltipTrigger>
                                      <QuestionMarkCircledIcon className="size-3 text-white" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>
                                        We'll send you the occasional promotional email with
                                        exclusive offers, new features and more!
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  setUser((prev) => ({ ...prev, [field.name]: checked }));
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Receive promotional emails on offers, new features and more</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
            */}
            {/* BIZLEVEL: Скрыт элемент "How did you hear about BizLevel?" - будет добавлен позже
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="space-y-2 text-white hidden"
            >
              <FormField
                control={form.control}
                name="howDidYouHearAboutBizLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How did you hear about BizLevel? <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? ''}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setUser((prev) => {
                            return { ...prev, [field.name]: value };
                          });
                          setCanContinue(Boolean(value));
                        }}
                      >
                        <SelectTrigger className="w-full border border-black-50">
                          {field.value ? field.value : 'Select an option'}
                        </SelectTrigger>
                        <SelectContent>
                          {whereDidYouHearAboutBizLevel.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            */}
            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}

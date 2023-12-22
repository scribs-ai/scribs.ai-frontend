import { useGoogleLogin } from '@react-oauth/google';

import { Button } from './ui/button';
import { Icons } from './ui/icons';
import { toast } from './ui/use-toast';

import { useRouter } from 'next/navigation';

import { googleOauthApi } from '@/app/api/authService';

const GoogleAuthButton = () => {
  const router = useRouter()
  const handleLogin = useGoogleLogin(
    {
      onSuccess: async codeResponse => {
        await googleOauthApi({ access_token: codeResponse.access_token })
        router.push('/dashboard')
        toast({
          title: "Logged in successfull, Welcome."
        })
      },
    });
  return (
    <Button variant="outline" className="w-full" onClick={() => handleLogin()}>
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
};

export default GoogleAuthButton;
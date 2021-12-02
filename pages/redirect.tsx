import {useEffect} from 'react';
import {useRouter} from 'next/router';
// import {useLocalStorage} from '../config/contexts';

const Redirect = () => {
  const router = useRouter();
  const setToken = (idToken: string) => {
    // Saves user token to localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('token', idToken);
    }
  };
  const {
    query: {token},
  } = router;
  useEffect(() => {
    console.log({token});
    if (token) {
      setToken(token as string);
      router.push('/create');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return null;
};

export default Redirect;

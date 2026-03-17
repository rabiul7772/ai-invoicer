import { useLocation, useNavigate } from 'react-router';
import { useUnsubscribe } from '../hooks/useUnsubscribe';
import { useRef, useEffect } from 'react';
import Profile from '../../../pages/Profile';

/**
 A wrapper component to handle the ?action=unsubscribe URL param.
 */

export const UnsubscribeHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: unsubscribe } = useUnsubscribe();

  // Prevent double-firing in strict mode
  const hasFired = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const action = searchParams.get('action');

    if (action === 'unsubscribe' && !hasFired.current) {
      hasFired.current = true;
      unsubscribe();

      searchParams.delete('action');
      const newSearch = searchParams.toString();
      navigate(
        {
          pathname: location.pathname,
          search: newSearch ? `?${newSearch}` : ''
        },
        { replace: true }
      );
    }
  }, [location.search, navigate, unsubscribe]);

  return <Profile />;
};

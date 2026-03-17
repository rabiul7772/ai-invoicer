import { useLocation, useNavigate } from 'react-router';
import { useUnsubscribe } from '../hooks/useUnsubscribe';
import { useRef } from 'react';
import Profile from '../../../pages/Profile';

/**
 * A wrapper component to handle the ?action=unsubscribe URL param cleanly.
 * This runs during the render cycle to immediately begin the mutation,
 * acting as a clean alternative to useEffect while preserving React paradigm.
 */
export const UnsubscribeHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: unsubscribe } = useUnsubscribe();

  // Prevent double-firing in strict mode
  const hasFired = useRef(false);

  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get('action');

  if (action === 'unsubscribe' && !hasFired.current) {
    hasFired.current = true;

    // Fire the unsubscription
    unsubscribe();

    searchParams.delete('action');
    const newSearch = searchParams.toString();
    navigate(
      {
        pathname: location.pathname,
        search: newSearch ? `?${newSearch}` : ''
      },
      { replace: true } // replace history so 'back' button doesn't trigger it again
    );
  }

  return <Profile />;
};

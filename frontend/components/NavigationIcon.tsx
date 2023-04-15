import { MouseEvent } from 'react';

import { useAppDispatch } from '@/hooks';

import { MenuIcon } from './';


interface Props {
  isOn?: boolean;
}

export default function NavigationIcon({ isOn }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isOn) {
      window.scrollTo(0, 0);
      document.getElementById('main')?.scrollTo(0, 0);
      dispatch({ type: 'NAVIGATION_SHOW' });
      return;
    }

    dispatch({ type: 'NAVIGATION_CLOSE' });
  };

  const className = isOn ? 'is-active' : '';

  return (
    <div className='MenuIcon-container'>
      <MenuIcon className={className} onClick={handleClick} type='button' />
    </div>
  );
}

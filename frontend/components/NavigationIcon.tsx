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
    dispatch({ type: `NAVIGATION_${ isOn ? 'CLOSE' : 'SHOW' }` });
  };

  const className = isOn ? 'is-active' : '';

  return (
    <div className='MenuIcon-container'>
      <MenuIcon className={className} onClick={handleClick} type='button' />
    </div>
  );
}

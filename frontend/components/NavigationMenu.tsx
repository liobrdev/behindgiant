import { AnimatedLink } from '@/components';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

export default function NavigationMenu() {
  return (
    <div className='NavigationMenu'>
      <div className='NavigationMenu-links'>
        <ul>
          <li>
            <small>About us</small>
            <AnimatedLink href='/'>Home</AnimatedLink>
          </li>
          <li>
            <small>Our projects</small>
            <AnimatedLink href='/portfolio'>Portfolio</AnimatedLink>
          </li>
          <li>
            <small>Ideas &amp; advice</small>
            <AnimatedLink href='/blog'>Blog</AnimatedLink>
          </li>
          <li>
            <small>Latest stories</small>
            <AnimatedLink href='/news'>News</AnimatedLink>
          </li>
          <li>
            <small>Stay in touch</small>
            <AnimatedLink href='/contact'>Contact</AnimatedLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

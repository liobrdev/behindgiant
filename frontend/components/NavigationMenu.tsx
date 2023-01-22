import { AnimatedLink } from '@/components';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

export default function NavigationMenu() {
  return (
    <div className='NavigationMenu'>
      <div className='NavigationMenu-logo'>
        <AnimatedLink href='/'>
          <img className='NavigationMenu-logo-img' src={`${imagesUrl}/Logo-pr.png`} alt='Logo'/>
        </AnimatedLink>
      </div>
      <h3 className='NavigationMenu-text'>
        A consultancy and creative agency, purposefully built for the modern age.
      </h3>
      <div className='NavigationMenu-links'>
        <ul>
          <li>
            <small>Behind Giant</small>
            <AnimatedLink href='/about'>About Us</AnimatedLink>
          </li>
          <li>
            <small>Our projects</small>
            <AnimatedLink href='/work'>Work</AnimatedLink>
          </li>
          <li>
            <small>Ideas &amp; opinions</small>
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

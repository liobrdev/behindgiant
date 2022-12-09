import Link from 'next/link';


export default function SocialLinks() {
  return (
    <div className='SocialLinks'>
      <ul>
        <li>
          <Link href='https://twitter.com/behindgiant'>
            <a><img src='/twitter_white.png' alt='Twitter' width='24px' /></a>
          </Link>
        </li>
        <li>
          <Link href='https://instagram.com/behindgiant'>
            <a><img src='/instagram_white.png' alt='Instagram' width='24px' /></a>
          </Link>
        </li>
        <li>
          <Link href='https://facebook.com/behindgiant'>
            <a><img src='/facebook_white.png' alt='Facebook' width='24px' /></a>
          </Link>
        </li>
        <li>
          <Link href='https://linkedin.com/company/behindgiant'>
            <a><img src='/linkedin_white.png' alt='LinkedIn' width='24px' /></a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

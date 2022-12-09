import { SocialLinks } from '@/components';


interface Props {
  classNames?: string;
}

const currentYear = new Date().getFullYear();

export default function Footer({ classNames }: Props) {
  return (
    <footer className={`Footer${classNames ? ' ' + classNames : ''}`}>
      <SocialLinks />
      <span>Copyright &copy; {currentYear}</span>
    </footer>
  );
}

import SCSS from './Footer.module.scss';
import Logo from '../logo/Logo';

function Footer(): JSX.Element {
  return (
    <footer className={SCSS['page-footer']}>
      
      <Logo logoTitle='logo__link--light'/>

      <div className={SCSS['copyright']}>
        <p>© 2022 Contacts Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;

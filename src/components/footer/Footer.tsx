import styles from './Footer.module.scss';
import Logo from '../logo/Logo';

function Footer(): JSX.Element {
  return (
    <footer>
      
      <Logo logoTitle="linkLight"/>

      <div className={styles.copyright}>
        <p>© 2022 Contacts Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;

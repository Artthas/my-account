import styles from './Logo.module.scss';
import {Link} from 'react-router-dom';

type LogoProps = {
  logoTitle: string,
}

function Logo({logoTitle}: LogoProps): JSX.Element {
  return (
    <div className={styles.logo}>
      <Link className={styles[`${logoTitle}`]} to="/">
        <span className={styles.letter1}>C</span>
        <span className={styles.letter2}>N</span>
        <span className={styles.letter3}>T</span>
      </Link>
    </div>
  );
}

export default Logo;

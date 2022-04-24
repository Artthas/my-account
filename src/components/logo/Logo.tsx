import SCSS from './Logo.module.scss';
import {Link} from 'react-router-dom';

type LogoProps = {
  logoTitle: string,
}

function Logo({logoTitle}: LogoProps): JSX.Element {
  return (
    <div className={SCSS['logo']}>
      <Link className={SCSS[`${logoTitle}`]} to="/">
        <span className={SCSS['logo__letter--1']}>C</span>
        <span className={SCSS['logo__letter--2']}>N</span>
        <span className={SCSS['logo__letter--3']}>T</span>
      </Link>
    </div>
  );
}

export default Logo;

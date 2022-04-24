import SCSS from './Contact-card.module.scss';
import {Contact} from '../../types/contact';

type ContactCardProps = {
  contact: Contact,
}

function MovieCard({contact}: ContactCardProps): JSX.Element {
  return (
    <article className={SCSS.card} key={contact.id}>
      <div className={SCSS.image}>
        <img src={contact.image} alt={contact.name} width="280" height="175"/>
      </div>
      <h3 className={SCSS.title}>{contact.name}</h3>
    </article>
  );
}

export default MovieCard;

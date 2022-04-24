import Footer from '../footer/Footer';
import ContactsList from '../contacts-list/Contacts-list';
import {useState} from 'react';
import ShowMore from '../show-more/Show-more';
import Header from '../header/Header';
import {useSelector} from 'react-redux';
import {getContacts} from '../../store/contacts-data/selectors';

function Main(): JSX.Element {
  const contacts = useSelector(getContacts);

  const [count, setCountData] = useState(8);

  const onShowMoreClick = () => {
    setCountData(count + 8);
  };

  return (
    <div>
      <h1 className="visually-hidden">Contacts</h1>

      <Header isContacts={true} isSignIn={false} headerTitle={'contact-card__head'}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ContactsList contacts={contacts} />

          {count <= contacts.length && <ShowMore onShowMoreClick={onShowMoreClick}/>}

        </section>

        <Footer />

      </div>
    </div>
  );
}

export default Main;

import styles from './Main.module.scss';
import Footer from '../footer/Footer';
import ContactsList from '../contacts-list/Contacts-list';
import React, {ChangeEvent, useEffect, useState} from 'react';
import ShowMore from '../show-more/Show-more';
import Header from '../header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getContacts} from '../../store/contacts-data/selectors';
import {loadContacts, loadPostContactId} from '../../store/action';

function Main(): JSX.Element {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const [count, setCountData] = useState(8);
  const [searchedContacts, setSearchedContacts] = useState(contacts);
  const [showedContacts, setShowedContacts] = useState(searchedContacts);

  const onShowMoreClick = () => {
    setCountData(count + 8);
  };

  useEffect(() => {
    setSearchedContacts(contacts);
  }, [contacts]);

  useEffect(() => {
    if (count < searchedContacts.length) {
      setShowedContacts(searchedContacts.slice(0, count));
    } else {
      setShowedContacts(searchedContacts);
    }
  }, [count, searchedContacts]);

  const onAddNewClick = () => {
    const contactsIds = contacts.map((contact) => contact.id);
    const id = Math.max(...contactsIds) + 1;
    const newContacts = [...contacts];
    newContacts.unshift({id, name: "", image: "img/contacts/contact-1.jpg"});
    dispatch(loadPostContactId(String(id)));
    dispatch(loadContacts(newContacts));
  }
  
  const searchInputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const newStringArray = Array.from(new Set(evt.target.value.split('')));
    const newSearchedContacts = contacts.filter((contact) => {
      if (newStringArray.length === 1 && newStringArray[0] === ' ') {
        return true;
      } else if (evt.target.value === '') {
        return true;
      } else if (evt.target.value.length > 0) {
        return contact.name.toLowerCase().indexOf(evt.target.value.toLowerCase()) !== -1;
      }
    });
    setSearchedContacts(newSearchedContacts);
  }

  return (
    <React.Fragment>
      <h1 className='visually-hidden'>Contacts</h1>

        <Header isContacts={true} isSignIn={false}/>

        <section className={styles.contacts}>

          <form className={styles.search}>
            <svg viewBox="0 0 15 15" width='35px' height='35px' xmlns="http://www.w3.org/2000/svg">
              <path fill='#C9B37E' d="M10.0276 9.52893L13.7934 13.2948C13.9257 13.4273 14.0001 13.6069 14 13.7942C13.9999 13.9814 13.9255 14.161 13.793 14.2934C13.6606 14.4257 13.481 14.5001 13.2937 14.5C13.1064 14.4999 12.9269 14.4255 12.7945 14.293L9.0287 10.5271C7.90295 11.3991 6.48731 11.8094 5.06977 11.6746C3.65223 11.5399 2.33927 10.8701 1.39799 9.80165C0.456712 8.73318 -0.0421836 7.34624 0.0027973 5.92299C0.0477782 4.49973 0.633257 3.14707 1.64013 2.14017C2.647 1.13327 3.99963 0.547779 5.42285 0.502797C6.84607 0.457815 8.23297 0.956724 9.30142 1.89803C10.3699 2.83933 11.0396 4.15233 11.1743 5.5699C11.3091 6.98748 10.8988 8.40315 10.0269 9.52893H10.0276ZM5.60026 10.2996C6.71412 10.2996 7.78235 9.85712 8.56997 9.06948C9.35759 8.28185 9.80007 7.21358 9.80007 6.0997C9.80007 4.98581 9.35759 3.91755 8.56997 3.12992C7.78235 2.34228 6.71412 1.89979 5.60026 1.89979C4.4864 1.89979 3.41817 2.34228 2.63055 3.12992C1.84293 3.91755 1.40046 4.98581 1.40046 6.0997C1.40046 7.21358 1.84293 8.28185 2.63055 9.06948C3.41817 9.85712 4.4864 10.2996 5.60026 10.2996Z"/>
            </svg>
            <input
              className={styles.searchInput} id="search" type="text" autoComplete="off" placeholder="Search"
              onChange={searchInputHandler}
              data-testid="search"
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>

          <div className={styles.addNew}>
            <button
              className={styles.addNewButton} type="button"
              onClick={onAddNewClick}
            >
              Add new
            </button>
          </div>

          <ContactsList contacts={showedContacts} />

          {count < contacts.length ? <ShowMore onShowMoreClick={onShowMoreClick}/> : ''}

        </section>

        <Footer />

    </React.Fragment>
  );
}

export default Main;

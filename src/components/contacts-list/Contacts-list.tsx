import SCSS from './Contacts-list.module.scss';
import {Contacts} from '../../types/contact';
import ContactCard from '../contact-card/Contact-card';

type ContactsListProps = {
  contacts: Contacts,
}

function ContactsList({contacts}: ContactsListProps): JSX.Element {
  return (
    <div className={SCSS.contacts}>
      {contacts.map((contact) => <ContactCard contact={contact} key={contact.id} />)}
    </div>
  );
}

export default ContactsList;

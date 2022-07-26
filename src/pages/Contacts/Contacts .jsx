import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery, useAddContactMutation } from 'redux/services';
import { getFilter, getFilteredContacts } from 'redux/selectors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactsListItem from 'pages/Contacts/ContactsItem';
import Filter from 'components/Filter';
import Loader from 'components/Loader';
import s from './Contacts.module.css';

export default function Contacts() {
  const [params, setParams] = useState({ name: '', number: '' });

  const { data, isLoading } = useGetContactsQuery();
  const [addContact, { isLoading: isAdding }] = useAddContactMutation();
  const filter = useSelector(getFilter);
  const contacts = getFilteredContacts(filter, data);

  const handleInputChange = e => {
    setParams({ ...params, [e.currentTarget.name]: e.currentTarget.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    contacts.some(contact => contact.name === params.name)
      ? Notify.failure(`Contact ${params.name} already exists`)
      : contacts.some(contact => contact.number === params.number)
      ? Notify.failure(`Contact with number ${params.number} already exists`)
      : addContact(params);
    setParams({ name: '', number: '' });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="title">Contact</h1>
        <label>
          Name
          <input
            type="name"
            name="name"
            value={params.name}
            onChange={handleInputChange}
            className={s.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={params.number}
            onChange={handleInputChange}
            className={s.input}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. For example, +38-095-000-00-00 or 380951001010"
            required
          />
        </label>
        <button type="submit" className={s.submitButton} disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add to contacts'}
        </button>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.length === 0 ? (
            <h3>Contacts list is empty</h3>
          ) : (
            <>
              <Filter />
              <ul className={s.list}>
                {contacts.map(({ id, name, number }) => (
                  <ContactsListItem
                    key={id}
                    id={id}
                    name={name}
                    number={number}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}

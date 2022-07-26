import { useDeleteContactMutation } from 'redux/services';
import PropTypes from 'prop-types';
import s from './Contacts.module.css';

const ContactsListItem = ({ id, name, number }) => {
  const [onDeleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <li key={id} className={s.item}>
      <p>
        {name}: {number}
      </p>
      <button className={s.deleteButton} onClick={() => onDeleteContact(id)}>
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

ContactsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactsListItem;

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
        {isLoading ? 'Deleting...' : 'Delete'}{' '}
        <img
          src="https://img.icons8.com/fluency/344/filled-trash.png"
          width="25"
          height="25"
          alt="trash"
        />
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

import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="Loader">
      <Audio color="#00BFFF" height={80} width={80} className="Loader" />
    </div>
  );
};

export default Loader;

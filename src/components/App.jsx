export const App = () => {
  function hoopCount(n) {
    if (n >= 10) {
      return console.log('Great, now move on to tricks');
    } else {
      return console.log('Keep at it until you get it');
    }
  }
  hoopCount(11);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      React homework template
    </div>
  );
};

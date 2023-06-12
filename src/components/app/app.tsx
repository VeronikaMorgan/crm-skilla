import styles from './app.module.scss'
import NavBar from '../nav-bar/nav-bar';
import Header from '../header/header';
import Main from '../main/main';

function App() {
  return (
    <div className={styles.app}>
      <Header/>
      <NavBar/>
      <Main/>
    </div>
  );
}

export default App;

import './routers.css';
import NavBar from '../components/NavBar';
import HomeBanner from '../components/Home/HomeBanner';
import LiveItemInMain from '../components/Home/LiveItemInMain';
import KategorieInMain from '../components/Home/KategorieInMain';

function Home() {
  return (
    <div className='App' id="container">
      <header className='fixnav'>
      <NavBar></NavBar>
      </header>
      <HomeBanner></HomeBanner>
      <LiveItemInMain></LiveItemInMain>
      <KategorieInMain></KategorieInMain>
    </div>
  );
}


export default Home;
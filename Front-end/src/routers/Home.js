import './routers.css';
import NavBar from '../components/NavBar';
import HomeBanner from '../components/Home/HomeBanner';
import LiveItemInMain from '../components/Home/LiveItemInMain';
import KategorieInMain from '../components/Home/KategorieInMain';
import PopSearch from '../components/Home/PopSearch';
import Footer from '../components/Home/Footer';

function Home() {
  return (
    <div className='App' id="container">
      <header className='fixnav'>
      <NavBar></NavBar>
      </header>
      <HomeBanner></HomeBanner>
      <PopSearch />
      <LiveItemInMain></LiveItemInMain>
      <KategorieInMain></KategorieInMain>
      <Footer />
    </div>
  );
}


export default Home;
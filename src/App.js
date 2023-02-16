import Header from './components/header';
import Section from './components/section';
import Footer from './components/footer';
import { SECTIONS } from './enums';
import './App.css';

function App() {

  return (
    <>
      <Header />
      <main>
        { SECTIONS.map((section) => <Section key={section.id} {...section} />) }
      </main>
      <Footer />
    </>
  );
}

export default App;

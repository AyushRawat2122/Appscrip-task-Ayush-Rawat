import { NavigationTab, Footer } from "./components"
import { Products } from "./Pages"
import { useMediaQuery } from 'react-responsive';
function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <header>
        <div className="top-strip">
          <ul>
            {!isMobile && <li><img src="/images/Linear-element.png" alt="linearElement" /><span>Lorem ispum dolor</span></li>}
            <li><img src="/images/Linear-element.png" alt="linearElement" /><span>Lorem ispum dolor</span></li>
            {!isMobile && <li><img src="/images/Linear-element.png" alt="linearElement" /><span>Lorem ispum dolor</span></li>}
          </ul>
        </div>
        <NavigationTab />
      </header>
      <main>
        <Products />
      </main>
      <footer><Footer /></footer>
    </>
  )
}

export default App

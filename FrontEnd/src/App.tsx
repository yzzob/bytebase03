import './App.css';
// import TestPage from './pages/hi';
// import LoginPage from './pages/login';
import LoginPageAI from './pages/login'
function App() {
  return (
    <div style={{
      backgroundImage: `url('https://raw.githubusercontent.com/bytebase/bytebase.com/main/public/images/login-bg.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      width: '100%',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        right: '15%',
        top: '50%',
        transform: 'translateY(-50%)'
      }}>
        <LoginPageAI />
      </div>
    </div>
  )

}

export default App;
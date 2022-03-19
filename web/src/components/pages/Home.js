import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import '../Navbar.css';


import { Button } from '../Button';
import { Link } from 'react-router-dom';


function Home() {
  // const [button, setButton] = useState(true);
  localStorage.setItem("email", "");
  localStorage.setItem("userType", "");
  localStorage.setItem("isLoggedIn", false);
  return (
    <>
        <div className='home'>
          
          <Link
            to='/artist/sign-up'
            // className='nav-links-mobile'
            // onClick={closeMobileMenu}
          >
            <Button buttonStyle='btn--signup'>Sign up as an artist</Button>
            
          </Link>
          
          <Link
            to='/organizer/sign-up'
            // className='nav-links-mobile'
            // onClick={closeMobileMenu}
          >
            <Button buttonStyle='btn--signup'>Sign up as an organizer</Button>
            
          </Link>
        </div>
        

        <Footer />
    </>
  );
}

export default Home;
import '../App.css';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const NavButton = styled.button`
    background-color: white;
    border-width: 6px;
    color: #000000;
    font-size: 25px;
`;

const Header = () => (
  <header>
    <div className='wrapper'>
        <section className='columns'>
            <div className='column'>
                <Link to={'/page1'}>
                    <NavButton>
                        {'Page 1'}
                    </NavButton>
                </Link>
            </div>
            <div className='column'>
                <Link to={'/page2'}>
                    <NavButton>
                        {'Page 2'}
                    </NavButton>
                </Link>
            </div>
            <div className='column'>
                <Link to={'/page3'}>
                    <NavButton>
                        {'Page 3'}
                    </NavButton>
                </Link>
            </div>
        </section>
    </div>
  </header>
);

export default Header;
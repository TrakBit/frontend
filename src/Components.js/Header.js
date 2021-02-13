import '../App.css';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import {Button} from 'antd';
import { Row, Col } from 'antd';

const Header = () => (
  <header>
    <div className='wrapper'>
        <Row>
            <Col span={8}>
                <Link to={'/page1'}>
                    <Button>
                        {'Page 1'}
                    </Button>
                </Link>
            </Col>
            <Col span={8}>
                <Link to={'/page2'}>
                    <Button>
                        {'Page 2'}
                    </Button>
                </Link>
            </Col>
            <Col span={8}>
                <Link to={'/page3'}>
                    <Button>
                        {'Page 3'}
                    </Button>
                </Link>
            </Col>
        </Row>
    </div>
  </header>
);

export default Header;
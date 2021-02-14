import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../App.css';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Header from './Header';
import {Button, Input} from 'antd';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
`;

const RowContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  word-wrap: break-word;
`;

function Page2() {
    const history = useHistory();
    const [value, setValue] = useState('hello');

    useEffect(() => {
        history.push(`./page2?q=${value}`);
    }, [value]);

    return (
        <div className='App'>
            <Header/>
            <Container>
                <RowContainer>
                    <Input
                        style={{width: '200px'}}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <CopyToClipboard text={value}>
                        <Button>Copy</Button>
                    </CopyToClipboard>
                </RowContainer>
            </Container>
        </div>
    );
}

export default Page2;

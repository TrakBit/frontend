import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {DatePicker, Row, Col, Button, InputNumber} from 'antd';
import moment from 'moment';
import '../App.css';
import Header from './Header';
import {getItems} from '../Api';

const {RangePicker} = DatePicker;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
`;

function Page1() {
    const [screenWidth, setScreenWidth] = useState('50%');
    const [tags, setTags] = useState([]);
    const [fromDate, setFromDate] = useState(moment().subtract(15, 'days').unix());
    const [toDate, setToDate] = useState(moment().add(5, 'days').unix());
    const [pageSize, setPageSize] = useState(30);
    const [page, setPage] = useState(1);

    const getItemsData = async () => {
        const tagsData = [];
        const itemsData = await getItems(fromDate, toDate, pageSize, page);
        itemsData.items.forEach((item) => {
            item.tags.forEach((tag) => {
                const foundTag = tagsData.find((element) => element.name === tag);
                if (typeof foundTag === 'undefined') {
                    tagsData.push({name: tag, count: 1});
                } else {
                    foundTag.count = foundTag.count + 1;
                }
            });
        });
        setTags(tagsData);
    };

    useEffect(() => {
        if (window.innerWidth < 480) {
            setScreenWidth('100%');
        }
        getItemsData();
    }, []);

    const setValue = (val) => {
        setFromDate(val[0].unix());
        setToDate(val[1].unix());
    };

    return (
        <div className='App'>
            <Header/>
            <Container>
                <ResponsiveContainer
                    width={screenWidth}
                    height={400}
                >
                    <BarChart
                        width={500}
                        height={300}
                        data={tags}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='name'/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar
                            dataKey='count'
                            fill='#82ca9d'
                        />
                    </BarChart>
                </ResponsiveContainer>
                <Filters
                    setValue={setValue}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    page={page}
                    setPage={setPage}
                    getItemsData={getItemsData}
                />
            </Container>

        </div>
    );
}

const Filters = ({setValue, pageSize, setPageSize, page, setPage, getItemsData}) => {
    return (
        <>
            <Row>
                <Col span={8}>
                    {'Date:'}
                </Col>
                <Col span={16}>
                    <RangePicker
                        onChange={(val) => setValue(val)}
                    />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={8}>
                    {'Page Size:'}
                </Col>
                <Col span={16}>
                    <InputNumber
                        type={'number'}
                        min={1}
                        value={pageSize}
                        onChange={(number) => setPageSize(number)}
                    />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={8}>
                    {'Page:'}
                </Col>
                <Col span={16}>
                    <InputNumber
                        type={'number'}
                        min={1}
                        value={page}
                        onChange={(number) => setPage(number)}
                    />
                </Col>
            </Row>
            <br/>
            <Button onClick={() => getItemsData()}>
                Filter
            </Button>
        </>
    );
};

export default Page1;

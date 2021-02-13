import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../App.css';
import Header from './Header'
import {getItems} from '../Api';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
`;


function Page1() {
  const [screenWidth, setScreenWidth] = useState('50%');
  const [tags, setTags] = useState([]);


  useEffect(() => {
    const getItemsData = async() => {
      const tagsData = [];
      const itemsData = await getItems();
      itemsData.items.forEach(item => {
        item.tags.forEach(tag => {
          const foundTag = tagsData.find(element => element.name === tag)
          if (typeof foundTag !== "undefined") {
            foundTag.count = foundTag.count + 1
          } else {
            tagsData.push({name: tag, count: 1})
          }
        })
      });
      setTags(tagsData)
    }
    if (window.innerWidth < 480) {
        setScreenWidth('100%');
    }
    getItemsData()
  },[])


  return (
    <div className="App">
      <Header/>
        <Container>
          <ResponsiveContainer width={screenWidth} height={400}>
            <BarChart
              width={500}
              height={300}
              data={tags}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      <div>Page 1</div>
    </div>
  );
}

export default Page1;

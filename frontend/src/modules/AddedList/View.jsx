
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin';
import notification from 'antd/lib/notification';
import Table, { Column } from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import isEmpty from 'lodash/isEmpty'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import axios from 'axios'
import { getUserId } from '../../utils'
import { apiEndpoint } from '../../utils/contants'

const AddedList = () => {

    const [users, setUsers] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [input, setInput] = useState("");
    useEffect(async () => {
        const result = await axios.get(`${apiEndpoint}/users`);
        setUsers(result.data.users)
    }, []);

  const addSearch = async e => {
      let list = searchList
      list.push(e.target.value)
      setSearchList(list)
      setInput("")
      const result = await axios.get(`${apiEndpoint}/users?search=${JSON.stringify(list)}`);
      setUsers(result.data.users)
  }
  const closeTag = async (e, tag) => {
      let list = searchList
      list = searchList.filter(item => item !== tag)
      console.log("dsada",list)
      setSearchList(list)
      const result = await axios.get(`${apiEndpoint}/users?search=${JSON.stringify(list)}`);
      setUsers(result.data.users)
  }
  return (
    <section className="list-section">
      <Input 
        className="_spacer-sm"
        placeholder="Name" 
        value={input}
        onChange={e => setInput(e.target.value)}
        onPressEnter={addSearch}
      />

      {searchList.map(item => {
          return (
                <Tag 
                    closable 
                    onClose={(e) => closeTag(e, item)}
                    color="blue">
                  {item}
                </Tag>
          )
      })}
      <Table dataSource={users} scroll={{ x: 1000 }}>
            <Column
              title="Name"
              key="Name"
              render={record => (
                <span>
                  {record.name} 
                </span>
              )}
            />
            <Column
              title="Email"
              key="Email"
              render={record => (
                <span>
                  {record.email} 
                </span>
              )}
            />
            <Column
              title="Phone"
              key="Phone"
              render={record => (
                <span>
                  {record.phone} 
                </span>
              )}
            />
      </Table>

    </section>
  )
}

export default AddedList

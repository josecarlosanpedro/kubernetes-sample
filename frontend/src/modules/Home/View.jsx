
import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin';
import notification from 'antd/lib/notification';
import Table, { Column } from 'antd/lib/table';
import isEmpty from 'lodash/isEmpty'
import Button from 'antd/lib/button'
import axios from 'axios'
import { getUserId } from '../../utils'
import { apiEndpoint } from '../../utils/contants'

const propTypes = {
  services: PropTypes.object.isRequired
};
const Home = props => {
  const { services, users } = props

  const getUsers = () => {
    services.getUsersEpics()
  }
  const addUser = async data => {
    const { name, email, phone } = data
      const requestBody = {
        name,
        email,
        phone
      };
      await axios.post(`${apiEndpoint}/user`, requestBody).then(()=> {
        notification.success({
          message: 'user added'
        })
      }).catch(() => {
        notification.error({
          message: 'error while adding the user'
        })
      });
     
      
  }
  return (
    <section className="home-section">
      <Button type="primary"
        onClick={getUsers}
      > 
        Get Sample Users 
      </Button>
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
            <Column
              title="Action"
              key="action"
              render={record => {
                return (
                  <div>
                    <Button onClick={() => addUser(record)} icon="user-add" />
                  </div>
                )
              }}
            />
      </Table>

    </section>
  )
}

export default Home

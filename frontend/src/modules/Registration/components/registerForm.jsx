import React, { useState } from 'react'
import withRouter from 'react-router-dom/withRouter';
import notification from 'antd/lib/notification';
import axios from 'axios'
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';


const RegisterForm = props => {
  const { history, form } = props
  const [loading, setLoading] = useState(false);

  const { getFieldDecorator } = form;
  const handleLogin = () => {
    history.push('login')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        setLoading(true);
        const { email, password, confirm, firstName, lastName } = values
        try {
          const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {
                        email: "${email}"
                        password: "${password}"
                        confirm: "${confirm}"
                        firstName: "${firstName}"
                        lastName: "${lastName}"
                    }) {
                        _id
                        token
                        email
                    }
                }
            `
          };
          const { data } = await axios.post('http://localhost:3002/graphql', requestBody);

          if (data.errors) {
            notification.error({
              message: 'Registration Failed',
              description: data.errors[0].message
            })
            setLoading(false);
          }
          else {
            notification.success({
              message: 'Registration Success',
              description: "You can now login to the system"
            })
            form.resetFields()
            setLoading(false);
          }
        }
        catch (e) {
          setLoading(false);
        }
      }
    });
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  return (
    <section className="register-form-section">
      <Row>
        <Col sm={6} md={6} xl={8} />
        <Col sm={12} md={10} xl={8}>

          <h1>Registration</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  First Name&nbsp;
            </span>
              }
            >
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Last Name&nbsp;
            </span>
              }
            >
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Button type="primary" onClick={handleLogin} >
                Login
              </Button>
            </Form.Item>
          </Form>

        </Col>
        <Col sm={6} md={6} xl={8} />
      </Row>
    </section >
  )
}

export default Form.create()(withRouter(RegisterForm))

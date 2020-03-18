import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import checkError from '../../../libraries/CheckError';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = (props) => {

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (values) => {
    const { loginAccount, history } = props
    const { email, password } = values
    const result = await loginAccount({email, password})
    if (result) {
      const errors = result.error
      console.log('======== Bao Minh: onFinish -> result.error', result.error)
      checkError(errors.error)
    } else {
      // history.push('/project') 
    }
  }


  return (
    <Form
      {...layout}
      style={{...props.style}}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login
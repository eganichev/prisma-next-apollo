import React from 'react';
import { Row, Col, Button, Form, Input } from 'antd';
import { SignInMutationComponent, UsersQueryDocument } from '../generated/apollo-components';

type Props = {};
const initialState = { password: '', email: '' };
type State = typeof initialState;

class SigninUser extends React.Component<Props> {
  state: State = initialState;

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <SignInMutationComponent>
        {createUser => (
          <Form
            onSubmit={e => {              
              e.preventDefault();
              createUser({
                variables: { ...this.state },
                refetchQueries: [{ query: UsersQueryDocument }]
              }).then(() => {
                this.setState({ password: '', email: '' });
              });
            }}
          >
            <Row>
              <Col span={6}>
                <Form.Item>
                  <Input placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} type="text" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Input placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} type="text" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Button htmlType="submit">Signin User</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </SignInMutationComponent>
    );
  }
}

export default SigninUser;

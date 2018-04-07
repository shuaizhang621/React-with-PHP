import React from 'react';
import { Form, Input, Button, message } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.handleSearch(values.memberId, values.content);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('memberId', {
                        rules: [{ required: true, message: 'Please input your member id.' }],
                    })(
                        <Input placeholder="Member ID" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('content',)(
                        <Input placeholder="Anything about the book..." />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Search
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export const SearchForm = Form.create()(NormalLoginForm);


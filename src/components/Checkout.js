import { Table, Button, Icon } from 'antd';
import React from "react";

export class Checkout extends React.Component {
    render() {
        const columns = [{
            title: 'Copy ID',
            dataIndex: 'copyid',
            key: 'copyid',
        }, {
            title: 'Check Out Date',
            dataIndex: 'checkoutDate',
            key: 'checkoutDate',
        }, {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];

        return (
            <div className="check-out-form">
                <h2 className='title'>Books currently checked out:</h2>
                <Table
                    rowKey="copyid"
                    columns={columns}
                    dataSource={this.props.data}
                    className="result-table"
                    pagination={{pageSize: 5}}
                />
                <Button onClick={this.props.handleBack} className="back-button">Back</Button>
            </div>
        );
    }
}
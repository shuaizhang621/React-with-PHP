import { Table, Button, Icon } from 'antd';
import React from "react";
import {message} from "antd/lib/index";
import $ from "jquery";
import {API_ROOT} from "../constants";
import { Checkout } from "./Checkout";

export class ResultTable extends React.Component {
    onClickCheckOut = (record, ) => {
        console.log(record.copyid);
        console.log(this.props.mid);
        $.ajax({
            method: "POST",
            url: `${API_ROOT}checkout.php`,
            data: {
                mid: this.props.mid,
                copyid: record.copyid,
            },
        }).then((response) => {
            response = JSON.parse(response);
            console.log(response)
            this.props.handleCheckOut(response);
        }, (error) => {
            console.log('error: ');
            message.error(error.responseText);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const columns = [{
            title: 'Book ID',
            dataIndex: 'bookid',
            key: 'bookid',
        }, {
            title: 'Copy ID',
            dataIndex: 'copyid',
            key: 'copyid',
        }, {
            title: 'Title',
            dataIndex: 'booktitle',
            key: 'booktitle',
        }, {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },{
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: 'Publish Date',
            dataIndex: 'pdate',
            key: 'pdate',
        },{
            title: 'Check Out',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button record={record} className='check-out-button'
                            onClick={() => this.onClickCheckOut(record)}
                    >
                        <Icon type="shopping-cart" />
                    </Button>
                </span>
            ),
        }];
        return (
            <div className="result">
                <h2 className="title">Search Results:</h2>
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
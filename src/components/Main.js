import React from 'react';
import { SearchForm } from './Search';
import { ResultTable} from "./Result";
import { Switch, Route, Redirect } from 'react-router'
import { Checkout } from "./Checkout";
import { API_ROOT } from "../constants";
import { message } from 'antd';
import $ from 'jquery';

export class Main extends React.Component {

    state = {
        searched: false,
        checked: false,
        status: 1, //'search',
        data: [],
        checkdata: [],
        mid: '',
        content: '',
    };

    handleSearch = (memberId, content) => {
        $.ajax({
            method: "POST",
            url: `${API_ROOT}search.php`,
            data: {
                memberId: memberId,
                content: content,
            },
        }).then((response) => {
            response = JSON.parse(response);
            console.log('response: ');
            console.log(response);
            this.setState({
                searched: true,
                status: 2, //'result',
                data: response,
                mid: memberId,
                content: content,
            });
        }, (error) => {
            message.error(error.responseText);
        }).catch((error) => {
            console.log(error);
        });
    };

    handleCheckOut = (response) => {
        this.setState({
            checked: true,
            status: 3, //'checkout',
            checkdata: response,
        });
        console.log('response: ');
        console.log(response);
        console.log(this.state.checked);
    };

    handleBack1 = () => {
        this.setState({
            searched: false,
            status: 1, //"search",
        });
    };

    handleBack2 = () => {
        this.handleSearch(this.state.mid, this.state.content);
    };

    getRoot = () => {
        return <Redirect to="/search"/>;
    };

    getSearch = () => {
        return this.state.status === 1 ?
            <SearchForm searched={this.state.searched}
                        handleSearch={this.handleSearch}
            /> : <Redirect to="/result"/>;
    };

    getResult = () => {
        return this.state.status === 2 ?
            <ResultTable
                data={this.state.data}
                mid={this.state.mid}
                handleBack={this.handleBack1}
                handleCheckOut={this.handleCheckOut}
            /> : <Redirect to="/checkout"/>;
    };

    getCheckOut = () => {
        return this.state.status === 3 ?
            <Checkout
                data={this.state.checkdata}
                handleBack={this.handleBack2}
            /> : <Redirect to="/search"/>;
    };

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/search" render={this.getSearch}/>
                    <Route path="/result" render={this.getResult}/>
                    <Route path="/checkout" render={this.getCheckOut}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        )
    }
}
import React from 'react';
import List from './List';
import './Style.scss';
import { Store, C } from './Store';
import {observer} from "mobx-react";

class App extends React.Component {
    store = new Store();
    render() {
        window.addEventListener('resize',() => {
            setTimeout(() => this.store.resize(), 50)
        });
        return (
            <div className='App'>
                <div className='header'>
                    <a
                        href='#'
                        className='toggle backward'
                        onClick={() => this.store.toggle(C.BACKWARD)}
                    >{'<'}</a>
                    <List
                        list={this.store.list}
                        view={this.store.view}
                        select={this.store.select}
                    />
                    <a
                        href='#'
                        className='toggle forward'
                        onClick={() => this.store.toggle(C.FORWARD)}
                    >{'>'}</a>
                </div>
            </div>
        );
    }
}

export default observer(App);

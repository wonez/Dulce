import React from 'react';

import Nav from '../Nav/Nav';
import classes from './Entry.scss';
import typography from '../../_typography.scss';
import { IconMagnifyingGlass } from '../../UI/Icons/Icons';
import IconButton from '../../UI/IconButton/IconButton';
import { withRouter } from 'react-router-dom'

class Entry extends React.Component {

    state = {
        adjectives: ['New', 'Tasty', 'Fresh', 'Quick', 'Easy'],
        i: 0,
        search: '',
        interval: null,
    }

    componentDidMount(){
        const interval = setInterval(()=> {
            this.setState(prevState => {
                return{
                    ...prevState,
                    i: prevState.i < prevState.adjectives.length - 1 ? prevState.i + 1 : 0
                }
            })
        }, 1000)
        this.setState({
            interval
        })
    }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }

    searchInputHandler = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    searchSubmit = () => {
        this.props.history.push(`/search?value=${this.state.search}`)
    }

    handleCategories = () => {
        this.props.history.push('/categories');
    }

    render(){
        return(
            <div className={classes.Entry}>
                <div className={classes.Entry__Background}>
                    <div className={classes.Entry__Background__Gradient}>
                    </div>
                    <div className={classes.Entry__Background__Img}>
                    </div>
                </div>
                <div className={classes.Entry__Content}>
                    <nav className={classes.Entry__Nav}>
                        <Nav />
                    </nav>
                    <main className={classes.Entry__Search}>
                        <h1 className={classes.HeadingMain}>
                            <span className={classes.Em}>{this.state.adjectives[this.state.i]}</span> recepies added every day
                        </h1>
                        <div className={classes.Entry__Search__InputBox}>
                            <form onSubmit={this.searchSubmit}>
                                <input  value={this.state.search} 
                                        onChange={this.searchInputHandler}
                                        className={classes.Entry__Search__Input} type="text" placeholder="e.g. Pancakes"></input>
                                <div className={classes.Entry__Search__Icon}>
                                    <IconButton click={this.searchSubmit}>
                                        <IconMagnifyingGlass />
                                    </IconButton>
                                </div>
                            </form>
                        </div>
                        <a  className={classes.Entry__ShowAll}
                            onClick={this.handleCategories} >
                            Show all categories
                        </a>
                    </main>
                    <div className={classes.Entry__Empty}></div>
                </div>
            </div>
        );
    }
}

export default withRouter(Entry);
import React, {Component} from 'react';
import Aux from './Aux';
import ErrModal from '../UI/ErrModal/ErrModal';

const withErrorModal = (OtherComponent, axios) => {
    return class extends Component{

        state = {
            err: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({err: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({err: err.response.data});
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        handleModal = () => {
            this.setState({err: null});
        }

        render(){
            return(
                <Aux>
                    <ErrModal show={this.state.err} handleModal={this.handleModal}>
                        {this.state.err ? this.state.err.message : null}
                    </ErrModal>
                    <OtherComponent {...this.props}/>
                </Aux>
            );
        };
    }
};

export default withErrorModal;
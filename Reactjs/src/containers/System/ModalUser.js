import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    state = {

    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFormParent();
    }
    render() {
        console.log(this.props)
        console.log(this.props.isOpen)
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'modal-user-container'}
                    size='lg'
                >
                    <ModalHeader toggle={() => this.toggle()} >Create a new user</ModalHeader>
                    <ModalBody>

                        <div className="modal-user-body">
                            <div className="input-container"> <label>Email</label>
                                <input type="text" />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="password" />
                            </div>
                            <div className="input-container">
                                <label>First name</label>
                                <input type="firstName" />
                            </div>
                            <div className="input-container">
                                <label>Last name</label>
                                <input type="lastName" />
                            </div>
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input type="password" />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter Footer>
                        <Button color="primary" className='px-3' onClick={() => this.toggle()}>Save changes</Button>{''}
                        <Button color="secondary" className='px-3' onclick={() => this.toggle()}>Close</Button>
                    </ModalFooter>
                </Modal >
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

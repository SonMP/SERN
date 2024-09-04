import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {

    /** life cycle
     *   Run component:
     * 1.run constructor -> init state
     * 2.Render
     * 3.Did mount -> set state
     * 4.Render(re-render)
     */
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }
    state = {

    }

    async componentDidMount() {
        let response = await userService.getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
        // console.log(response);
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })

    }
    toggleShow = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    render() {
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers);
        return (
            <div className='user-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleShow}
                    test='abc'
                />
                <div className="title text-center">Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    > <i class="fa-solid fa-plus"></i> Add new user</button>
                </div>
                <div className='user-table mt-4 mx-1'>
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr className='divClass'>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i class="fa-solid fa-pencil"></i></button>
                                        <button className='btn-delete'><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}


                    </table>
                </div>
            </div>


        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as action from '../../../store/actions';
import './UserRedux.scss';

import lightbox from 'lightbox2';
import $ from 'jquery';
import 'lightbox2/dist/css/lightbox.css';
import 'lightbox2';
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
});
class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageUrl: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await userService.getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapShot) {
        //render => didUpdate
        //hien tai (this) va qua khu(previous)
        //[] [3]
        //[3] [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl
            })
        }
    }

    render() {
        let { genderArr, positionArr, roleArr, previewImageUrl } = this.state;
        // console.log('gender:', positionArr, roleArr)
        // console.log('reduxxx check:', this.props.roleRedux);
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    UserRedux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 text-center'>{isLoadingGender === true ? 'Loading gender....' : ''}</div>
                            <div className='col-12'>
                                <label><FormattedMessage id='manage-user.add' /></label>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label>   <FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label> <FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id='manage-user.gender' /></label>
                                <select className='form-control'>
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map((item, index) => {
                                            return (
                                                <option key={index}> {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>

                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id='manage-user.position' /></label>
                                <select className='form-control'>
                                    {positionArr && positionArr.length > 0 &&
                                        positionArr.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id='manage-user.role' /></label>
                                <select className='form-control'>
                                    {roleArr && roleArr.length > 0 &&
                                        roleArr.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id='manage-user.upload' /> <i class="fa-solid fa-upload"></i></label>
                                    {previewImageUrl && (
                                        <a href={previewImageUrl} data-lightbox="example-set" data-title="My caption">
                                            <div className='preview-image' style={{ backgroundImage: `url(${previewImageUrl})` }}></div>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'>
                                    <FormattedMessage id='manage-user.save' />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(action.fetchGenderStart()),
        getPositionStart: () => dispatch(action.fetchPositionStart()),
        getRoleStart: () => dispatch(action.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);

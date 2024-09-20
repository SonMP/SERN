import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import 'react-markdown-editor-lite/lib/index.css';
import userService from '../../../services/userService';
// import { Select } from 'react-select/dist/Select-fd7cb895.cjs.prod';

import Select from 'react-select';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getAllRequireDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            hasOldData: false
        })
    }
    handleChangeSelected = async (selectedOption) => {
        this.setState({
            selectedOption
        })
        let res = await userService.getDetailInforDoctor(selectedOption.value);
        if (res && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false,
            })
        }
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        let { hasOldData, listPayment, listPrice, listProvince, listDoctors, selectedOption } = this.state;
        let language = this.props.language;
        // console.log('ec', this.state.listDoctors);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelected}
                            options={listDoctors}
                            placeHolder={<FormattedMessage id='admin.manage-doctor.select-doctor' />} />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='select col-4 form-group'>
                        <label> Chọn giá </label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelected}
                            options={listPrice}
                            placeHolder={'Chọn giá'} />
                    </div>
                    <div className='select col-4 form-group'>
                        <label> Chọn phương thức thanh toán </label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelected}
                            options={listPayment}
                            placeHolder={'Chọn phương thức thanh toán'} />
                    </div>
                    <div className='select col-4 form-group'>
                        <label> Chọn tỉnh thành </label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelected}
                            options={listProvince}
                            placeHolder={'Chọn tỉnh thành'} />
                    </div>
                    <div className='select col-4 form-group'>
                        <label> Tên phòng khám </label>
                        <input className='form-control' />
                    </div>
                    <div className='select col-4 form-group'>
                        <label> Địa chỉ phòng khám </label>
                        <input className='form-control' />
                    </div>
                    <div className='select col-4 form-group'>
                        <label> Note </label>
                        <input className='form-control' />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {hasOldData === true ? <span><FormattedMessage id='admin.manage-doctor.save' /></span> : <span><FormattedMessage id='admin.manage-doctor.add' /></span>}
                </button>
            </div >

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(action.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(action.saveDetailDoctor(data)),
        getAllRequireDoctorInfor: () => dispatch(action.getRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

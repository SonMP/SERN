import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: []
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await userService.getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {

        }
    }
    render() {
        let { dataProfile } = this.state;
        let language = this.props.language;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log(dataProfile);
        // console.log(dataProfile.Doctor_Infor.priceData)
        return (
            <div className='profile-doctor-container'>
                <div className="intro-doctor">
                    <div className="content-left" style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}>
                    </div>
                    <div className="content-right">
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {dataProfile.Markdown &&
                                dataProfile.Markdown.description &&
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>}
                        </div>
                    </div>

                </div>
                <div className='price'>
                    Giá khám: {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI && dataProfile.Doctor_Infor.priceData ?
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                        : ''}
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN && dataProfile.Doctor_Infor.priceData ?
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        /> : ''}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

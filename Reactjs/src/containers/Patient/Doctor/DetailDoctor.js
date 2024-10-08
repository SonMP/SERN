import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import userService from '../../../services/userService';
import { DEFAULT_INTL_CONFIG } from 'react-intl/src/utils';
import { lang } from 'moment';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';
require('dotenv').config();

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await userService.getDetailInforDoctor(id);
            // console.log(res.data)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                    currentDoctorId: id
                })
            }
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.detailDoctor !== prevState.detailDoctor) {
        }
    }

    render() {
        let { detailDoctor, currentDoctorId } = this.state;
        // console.log('detaildoctor', detailDoctor);
        let language = this.props.language;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {

            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            "https://developers.facebook.com/docs/plugins/" : window.location.href;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className="intro-doctor">
                        <div className="content-left" style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}>
                        </div>
                        <div className="content-right">
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>}
                                <LikeAndShare
                                    dataHref={currentURL} />
                            </div>

                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className='content-left'>
                            <DoctorSchedule doctorIdFromParent={currentDoctorId} />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor doctorIdFromParent={currentDoctorId} />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.Markdown &&
                            detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className="comment-doctor">
                        <Comment
                            dataHref={currentURL}
                            width={'100%'} />
                    </div>
                </div>

            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import userService from '../../../services/userService';
import './DocTorSchedule.scss';


class DocTorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }
    componentDidMount() {
        this.setArrDays(this.props.language)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            // console.log('moment vie:', moment(new Date()).format('dddd - DD/MM'));
            // console.log('moment en:', moment(new Date()).locale('en').format("ddd - DD/MM"));
            this.setArrDays(this.props.language);
        }

    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setArrDays = async (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);
        }
        this.setState({
            allDays: arrDate
        })
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await userService.getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        console.log('aaa', allAvailableTime);
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })}

                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i class="fa-solid fa-calendar-days"></i>
                            <span>
                                <FormattedMessage id='manage-schedule.examination schedule' />
                            </span>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button key={index}> {timeDisplay}</button>
                                    )
                                })
                                :
                                <div>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocTorSchedule);

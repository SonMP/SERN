import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doctorImg1 from "../../../assets/doctor/img-doctor.png";


class OutStandingDoctor extends Component {

    render() {
        return (
            <div>

                <div className='section-share section-outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'> Cơ sở y tế</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='customize-border'>
                                        <img src={doctorImg1} />
                                        <div>Giáo sư 1</div>
                                        <div>Cơ xương khớp</div>
                                    </div>

                                </div>
                                <div className='section-customize'>
                                    <img src={doctorImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>
                                <div className='section-customize'>
                                    <img src={doctorImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={doctorImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={doctorImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={doctorImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

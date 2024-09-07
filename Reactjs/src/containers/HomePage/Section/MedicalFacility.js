import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import medicalFacilityImg1 from "../../../assets/medical-facility/img-medical-facility1.jpg";


class MedicalFacility extends Component {

    render() {
        return (
            <div>

                <div className='section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'> Cơ sở y tế</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg1} />
                                    <div>Bệnh viện hữu nghị Việt Đức</div>
                                </div>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg1} />
                                    <div>Bệnh viện hữu nghị Việt Đức</div>
                                </div>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg1} />
                                    <div>Bệnh viện hữu nghị Việt Đức</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={medicalFacilityImg1} />
                                    <div>Bệnh viện hữu nghị Việt Đức</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={medicalFacilityImg1} />
                                    <div>Bệnh viện hữu nghị Việt Đức</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={medicalFacilityImg1} />
                                    <div>Bệnh viện hữu nghị Việt Đức</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);

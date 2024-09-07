import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg1 from "../../../assets/specialty/img-specialty1.png";

class Specialty extends Component {


    render() {

        return (
            <>

                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'> Chuyên khoa phổ biến</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <img src={specialtyImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>
                                <div className='section-customize'>
                                    <img src={specialtyImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>
                                <div className='section-customize'>
                                    <img src={specialtyImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={specialtyImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={specialtyImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>

                                <div className='section-customize'>
                                    <img src={specialtyImg1} />
                                    <div>Cơ xương khớp</div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

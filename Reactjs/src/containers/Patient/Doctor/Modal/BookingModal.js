import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let { isShowModal, closeModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        return (
            <>
                <Modal
                    isOpen={isShowModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >

                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className='left'>Thong tin dat lich kham</span>
                            <span className='right' onClick={closeModal}><i className='fas fa-times'></i></span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor doctorId={doctorId} />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ tên</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Sdt</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Dia chi email</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Dia chi lien he</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Ly do kham</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Dat cho ai</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Gioi tinh</label>
                                    <input className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className='btn-booking-confirm'>Xac nhan</button>
                            <button className='btn-booking-cancel' onClick={closeModal}>Huy</button>
                        </div>
                    </div>
                </Modal>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

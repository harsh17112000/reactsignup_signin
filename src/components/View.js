import React from 'react';
import { PhoneOutlined, MailOutlined, WifiOutlined } from '@ant-design/icons';
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { Avatar } from 'antd';

const View = ({ show, onHide, viewdata }) => {
    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card_data d-flex justify-content-center">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body className='text-center'>
                                <Avatar
                                    className=''
                                    style={{
                                        color: '#f56a00',
                                        backgroundColor: '#fde3cf', fontSize: 40, width: 50, height: 42
                                    }}>
                                    {viewdata.username[0].toUpperCase()}
                                </Avatar>
                                <Card.Title className='mt-2'>Name: {viewdata.username}</Card.Title>
                                <Card.Text className='mt-2 d-flex justify-content-center align-items-center'><MailOutlined /> &nbsp; Email: <span>{viewdata.email}</span> </Card.Text>
                                <Card.Text className='mt-2 d-flex justify-content-center align-items-center'><WifiOutlined /> &nbsp; City: <span>{viewdata.website}</span> </Card.Text>
                                <Card.Text className='mt-2 d-flex justify-content-center align-items-center'><PhoneOutlined /> &nbsp; Phone: <span>{viewdata.phone} </span></Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
};

export default View;

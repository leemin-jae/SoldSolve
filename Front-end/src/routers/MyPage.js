import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Modal from '../components/Modals/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faReceipt } from '@fortawesome/free-solid-svg-icons'

import './routers.css';

function MyPage() {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <>
            <NavBar />
            <div className='mypage' style={{ margin: 30 }}>
                <h3>MY PAGE</h3>
                <div className='account_container'>
                    <div className='column'>사진자리</div>
                    <div className='column'>
                        <div className=''>이름자리</div>
                        <div className=''>회원정보 수정 자리</div>
                        
                    </div>
                </div>
                <div className='history_container'>
                    <div className='column'>
                        <button className='dot' onClick={openModal}>
                        <FontAwesomeIcon className='icon' icon={faCartArrowDown} size="2x" />
                        <div>구매내역</div>
                        </button>
                        <Modal open={modalOpen} close={closeModal} header="Modal heading">
                            구매내역리스트
                        </Modal>
                    </div>
                    <div className='column'>
                        <button className='dot' onClick={openModal}>
                        <FontAwesomeIcon className='icon' icon={faReceipt} size="2x" />
                        <div>판매내역</div>
                        </button>
                        <Modal open={modalOpen} close={closeModal} header="Modal heading">
                            판매내역리스트
                        </Modal>
                    </div>
                </div>
                <hr />
                <div className='heart_container'>
                    <div className='column'>
                        찜한상품
                    </div>
                    <div className='column'>
                        더보기
                    </div>
                </div>
                <div>
                    상품 6개만 나오게
                    없으면 없다 표시
                </div>
                <hr />
            </div>

        </>
    )
}



export default MyPage
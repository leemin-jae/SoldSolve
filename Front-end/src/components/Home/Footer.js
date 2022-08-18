import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';

function Footer() {
    return (
        <div>
            <footer className="bg-light text-center text-white foot">
                <div className="container p-3 pb-0">
                    <section>
                    <IconButton onClick={function () { alert('관리자 이메일이 복사되었습니다.') }} ><CopyToClipboard text={'list3895@gmail.com'}><GoogleIcon color="disabled" /></CopyToClipboard></IconButton>
                        <a href="https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C110"><GitHubIcon color="disabled" /></a>
                    </section>
                </div>
                <div className="text-center p-1 text-black" style={{fontSize: 12}} >
                    © 2022 Copyright:   SSAFY 10C1반
                </div>
            </footer>
        </div>
    )
}

export default Footer
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
    return (
        <div>
            <footer class="bg-light text-center text-white foot">
                <div class="container p-3 pb-0">
                    <section>
                        <a href="/#"><GoogleIcon color="disabled" /></a>
                        <a href="/#"><GitHubIcon color="disabled" /></a>
                    </section>
                </div>
                <div class="text-center p-1 text-black" style={{fontSize: 12}} >
                    © 2022 Copyright:   SSAFY 10C1반
                </div>
            </footer>
        </div>
    )
}

export default Footer
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';


function LikeButton(no) {
    const [like, setLike] = useState(false)
    useEffect(() => {
      async function likeData(no) {
        const res = await axios.get(
          `/api/wishes/check/` + no.no, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
        )
        // console.log(res.data)
        if (res.data === true) {
          setLike(true)
        }
      }
      likeData(no)
    }, [like, no])

    const LikeChange = (e) => {
      e.preventDefault();

      if (like === true) {
        axios({
          url: `/api/wishes`,
          method: 'delete',
          params: { product: no.no },
          headers: { Authorization: `Bearer ${localStorage.token}` }
        })
          .then(res => {
            alert("찜목록에서 삭제되었습니다.")
            setLike(false)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios({
          url: `/api/wishes`,
          method: 'post',
          params: { product: no.no },
          headers: { Authorization: `Bearer ${localStorage.token}` }
        })
          .then(res => {
            alert("찜목록에 추가되었습니다.")
            setLike(true)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }

    return (
      <>
        {like ?
          <IconButton style={{color:'red'}} aria-label="add to favorites" onClick={LikeChange}>
            <FavoriteIcon />
          </IconButton>
          :
          <IconButton aria-label="add to favorites" onClick={LikeChange}>
            <FavoriteBorderIcon />
          </IconButton>
        }
      </>
    )
}

export default LikeButton
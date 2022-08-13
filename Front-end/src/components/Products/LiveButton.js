import React, { useEffect, useState } from 'react'
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';

function LiveButton(no) {
  const [live, setLive] = useState(false)
  useEffect(() => {
    async function liveData(no) {
      const res = await axios.get(
        `/api/requests/check/` + no.no, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }
      )
      // console.log(res.data)
      if (res.data === true) {
        setLive(true)
      }
    }
    liveData(no)
  }, [live, no])

  const LiveChange = (e) => {
    e.preventDefault();

    if (live === true) {
      axios({
        url: `/api/requests`,
        method: 'delete',
        params: { product: no.no },
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          alert("라이브 요청이 해제되었습니다.")
          setLive(false)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios({
        url: `/api/requests`,
        method: 'post',
        params: { product: no.no },
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          alert("라이브가 요청되었습니다.")
          setLive(true)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <>
      {live ?
        <IconButton aria-label="add to favorites" onClick={LiveChange}>
          <AlarmOnIcon />
        </IconButton>
        :
        <IconButton aria-label="add to favorites" onClick={LiveChange}>
          <AlarmAddIcon />
        </IconButton>
      }
    </>
  )
}

export default LiveButton
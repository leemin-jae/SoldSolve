import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


function SearchBar() {
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const params = useParams();

  useEffect(()=>{
    if (params.category) {
      setCategory(params.category)
      document.getElementById("searchCategory").value = params.category
    }
    if (params.title) {
      setTitle(params.title)
      document.getElementById("standard-search").value = params.title

    }
  },[params])


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category)
    if ((category === ''|| category === 'all') && title !== '') {
      document.location.href = `/search/` + title;
    } else if (title === '') {
      alert("검색어를 입력해주세요")
    } else {
      document.location.href = `/search/` + category + `/` + title;
    }
  }
  return (
    <div className="test searchcontainer2">
        <Box className="searchbox"
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <NativeSelect
              defaultValue={"none"}
              color="secondary"
              onChange={event => setCategory(event.target.value)}
              id="searchCategory"
            >
              <option value={"all"}>카테고리</option>
              <option value={"digital"}>디지털기기</option>
              <option value={"appliances"}>생활가전</option>
              <option value={"furniture"}>가구</option>
              <option value={"fashion"}>패션/잡화</option>
              <option value={"beauty"}>뷰티/미용</option>
              <option value={"sports"}>스포츠</option>
              <option value={"games"}>취미/게임</option>
              <option value={"book"}>도서</option>
              <option value={"etc"}>기타</option>
            </NativeSelect>
          </FormControl>
          <TextField
            id="standard-search"
            type="search"
            variant="standard"
            color="secondary"
            onChange={event => setTitle(event.target.value)}
          />
          <button type="submit" onClick={handleSubmit}><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></button>
        </Box>
      </div>
  )
}

export default SearchBar
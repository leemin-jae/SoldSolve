
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NavBar from "../components/NavBar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Search() {
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === ''){
      alert("검색어를 입력해주세요")
    } else {
      document.location.href = `/` + category + `/` + title;
    }
  }

  return (
    <>
    <NavBar />
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
          >
              <option value={"none"}>카테고리</option>
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
      <div className="searchcontainer">
        <h5>최근 검색어</h5>
        </div>
        <div className="searchcontainer2">
        <Box>
        <Stack direction="row" spacing={1}>
            <a href="/#"><Chip label="Extra Soft" /></a>
            <a href="/#"><Chip label="Soft" /></a>
            <a href="/#"><Chip label="Medium" /></a>
            <a href="/#"><Chip label="Hard" /></a>
            </Stack>
        </Box>
      </div>
      <div className="searchcontainer">
        <h5>인기 검색어</h5>
        </div>
        <div className="searchcontainer2">
        <Box>
        <Stack spacing={1} className="searchbox">
            <a href="/#"><Chip label="Extra Soft" /></a>
            <a href="/#"><Chip label="Soft" /></a>
            <a href="/#"><Chip label="Medium" /></a>
            <a href="/#"><Chip label="Hard" /></a>
            </Stack>
        </Box>
      </div>
      <div className="searchcontainer2"></div>
    </>
  );
}

export default Search;
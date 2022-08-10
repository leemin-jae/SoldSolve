
import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SearchBar from "../components/Search/SearchBar";

function Search() {
  return (
    <>
      <NavBar />
      <SearchBar></SearchBar>
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
          <Stack direction="row" spacing={1} className="searchbox">
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
import NavBar from "../components/NavBar";
import Chip from '@mui/material/Chip';
import SearchBar from "../components/Search/SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

function Search() {
  const [pops, setPops] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `/api/pop`
      );
      // console.log(result.data)
      setPops(result.data.slice(0, 5))
      // setLoading(false)
    }
    fetchData();
  }, []);

  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]'),
  )

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])

  const handleAddKeyword = (text) => {
    console.log('text', text)
    const newKeyword = {
      id: Date.now(),
      text: text,
    }
    setKeywords([newKeyword, ...keywords])
  }

  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id !== id
    })
    setKeywords(nextKeyword)
  }

  function History({ keywords, onRemoveKeyword }) {
    console.log('keyword', keywords)
    if (keywords.length === 0) {
      return <div>최근 검색된 기록이 없습니다.</div>
    }
    return (
      <>
        <Swiper
          style={{ width: 400 }}
          slidesPerView={4}
          centeredSlides={true}
        >
          {keywords.map(({ id, text }) => {
            return (
              <SwiperSlide key={id} style={{ marginLeft: 10}}>
                <div style={{ textAlign: 'center', display: 'flex' }}>
                  <a href={`/search/${text}`} style={{ textDecoration: 'none'}}><Chip label={text} /></a>
                  <button
                    onClick={() => {
                      onRemoveKeyword(id)
                    }}
                  >
                    X
                  </button>
                </div>

              </SwiperSlide>
            )
          })}
        </Swiper>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <SearchBar onAddKeyword={handleAddKeyword}></SearchBar>
      <div className="searchcontainer">
        <h5>최근 검색어</h5>
      </div>
      <div className="searchcontainer2">
        <History
          keywords={keywords}
          onRemoveKeyword={handleRemoveKeyword}
        />
      </div>
      <div className="searchcontainer">
        <h5>인기 검색어</h5>
      </div>
      <div className="searchcontainer2" >
        <Swiper
          style={{ width: 400 }}
          slidesPerView={4}
          centeredSlides={true}
        >
          {pops.length > 0 ?
            <>
              {pops.map((pop) => {
                console.log(pop)
                return (
                  <SwiperSlide key={pop.popId} style={{ textAlign: 'center'}}>
                      <a href={`/search/${pop.title}`} style={{ textDecoration: 'none' }}><Chip label={pop.title} /></a>
                  </SwiperSlide>
                );
              })}
            </>
            : null}
        </Swiper>
      </div>
      <div className="searchcontainer2"></div>
    </>
  );
}

export default Search;
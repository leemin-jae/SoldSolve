import NavBar from "../components/NavBar"

function FindAccount() {
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="test">
          <div className="test3">
            <h1 className="my-5">ID/PW 찾기</h1>
            <div className="form">
              <h5 className="findtext">가입할때 사용하신 Email을 통해</h5>
              <h5 className="findtext">인증번호를 입력해주세요</h5>
                <form>
                  <input className="inputform" type="text" placeholder="EMAIL"></input><br />
                  <input className="inputform" type="text" placeholder="EMAIL CODE"></input><br />
                  <button className="inputform submitbutton" type="submit">SUBMIT</button>
                </form>
            </div>
          </div>   
        </div>
      </div>
    </div>
  )
}

export default FindAccount;
// import { maxHeight } from "@mui/system";
import NavBar from "../components/NavBar"

function NotFound() {
  return (
    <div>
      <NavBar></NavBar>
      <hr />
      <div className="test">
        <img src='../../404.png' style={{ width: '100%', marginBottom: '100px', position: 'relative', paddingBottom: '330px', top: '50px', display: 'block' }} alt="404" />
      </div>
    </div>
  )
}

export default NotFound;
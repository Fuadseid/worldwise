import PageNav from "../components/PageNav"
import { Link } from "react-router-dom"
function Home() {
    return (
        <div>
            <PageNav/>
            Worldwise <br />
            <Link to='./app'>Go to app </Link>
        </div>
    )
}

export default Home

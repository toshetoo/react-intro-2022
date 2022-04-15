import { useState } from "react";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Main } from "../main/Main";

export function Layout() {
    const [message, setMessage] = useState('Layout works in state!');
    const [counter, setCounter] = useState(0);
    const [intervalID, setIntervalID] = useState();

    const onClickHandler = () => {
        const int = setInterval(() => {
            setCounter((oldCount) => oldCount + 1);
        }, 500)

        setIntervalID(int);
    }

    const stopInterval = () => {
        clearInterval(intervalID);
        setIntervalID(null);
    }


    return (
        <div>
            <Header />
            Layout works!
            <button onClick={onClickHandler}>Start counter</button>
            <Main message={message} counter={counter} stopIntervalFn={stopInterval} />
            <Footer />
        </div>
    );
}

// export default Layout;
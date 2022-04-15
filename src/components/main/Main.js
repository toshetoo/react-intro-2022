export function Main({ message, counter, stopIntervalFn }) {

    const onClickHandler = () => {
        stopIntervalFn();
    }

    return (
        <div className="main-content">
            Main -- { message }
            <div>
                Counter -- { counter }
            </div>
            <button onClick={onClickHandler}>Stop interval</button>
        </div>
    )
}
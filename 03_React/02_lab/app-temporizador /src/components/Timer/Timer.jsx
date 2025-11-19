export default function Controles({play, playControl, hour, minuts, seconds, pauseControl, resetControl }) {

    
    return (
        <>
            <div className="controls">
                <ul className="controls__screen">
                    <li className="controls__item controls__screen-hour">{hour}</li>
                    <li className="controls__points">:</li>
                    <li className="controls__item controls__screen-minuts">{minuts}</li>
                    <li className="controls__points">:</li>
                    <li className="controls__item controls__screen-seconds">{seconds}</li>
                </ul>
                <div className="controls__btn">
                    <button className={ play ? 'controls__btn-start' : 'controls__btn-pause'}
                        onClick={play ? playControl : pauseControl}>
                        {play ? 'Start' : 'Pause'}
                    </button>
                    <button className="controls__btn-reset"
                        onClick={resetControl}>
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}
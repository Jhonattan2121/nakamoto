import { useState } from "react";
import styles from './FlipCard.module.css';

const FlipCard = () => {
    const [isFlipping, setIsFlipping] = useState(true);

    const handleFlip = () => {
        setIsFlipping(!isFlipping);
    };

    return (
        <div className={styles.flipContainer} onClick={handleFlip} >
            <div
                className={styles.flipCard}
                style={{ animationPlayState: isFlipping ? 'running' : 'paused' }} 
            >
                {/* Front Side */}
                <div className={styles.front}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="400px" height="560px" version="1.1"
                         viewBox="0 0 400 560">
                        <defs>
                            <style type="text/css">
                            {`.str0 {stroke:black;stroke-width:0;stroke-miterlimit:2.61313}
                                  .fil0 {fill:black}
                                  .fil1 {fill:none;fill-rule:nonzero}`}
                            </style>
                            <clipPath id="clip-frame">
                                <rect x="5" y="5" width="390" height="550" rx="20" ry="20"/>
                            </clipPath>
                        </defs>
                        <g id="Layer_x0020_1">
                            <metadata id="CorelCorpID_0Corel-Layer"/>
                            <rect id="frame" x="5" y="5" width="390" height="550" rx="20" ry="20"/>
                            <g id="BCKGRND" clipPath="url(#clip-frame)"/>
                            <image href="https://www.stampverse.io/s/A141762779593898329" x="5" y="5" width="390" height="550"
                                   preserveAspectRatio="xMidYMid meet" clipPath="url(#clip-frame)"/>
                            <rect x="5" y="5" width="390" height="550" rx="20" ry="20" fill="none" stroke="#000"
                                  strokeWidth="10"/>
                        </g>
                    </svg>
                </div>
                {/* Back Side */}
                <div className={styles.back}>
                    <div className={styles.backContent}>
                        <iframe
                            src="https://www.stampverse.io/s/A885284008816384188"
                            frameBorder="0"
                            className={styles.iframeContent}
                        />
                        <div className={styles.holoEffect}></div>
                        <div className={styles.overlayText}>
                            <p className={styles.title}>NSI</p>
                            <p className={styles.subtitle}>Nakamoto</p>
                            <p className={styles.subtitle}>STAMP</p>
                            <p className={styles.subtitle}>Index</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;

import React from 'react';

import classes from './LearnMore.scss';
import typography from '../../_typography.scss';

import ButtonLink from '../../UI/ButtonLink/ButtonLink';

const LearnMore = () => {
   return(
        <div id='learn-more' className={classes.LearnMore}>
            <div className={classes.LearnMore__TextBox}>
                <h3 className={[typography['margin-bottom-sm'], typography.HeadingTertiary].join(' ')}>Learn More</h3>
                <p className={typography['margin-bottom-sm']}>
                    Dulce is a social network designed with people passionate for sweets in mind. Dulce gives you ability to learn sugar full recepies from users around the world.
                </p>
                <p className={typography['margin-bottom-sm']}>
                    Not only that, but to meet new people and cultures. To express your feelings about certain recepie and many other things.
                </p>
                <p className={typography['margin-bottom-sm']} >You can help Dulce by sharing recepies you know or simple by voting for recepies you find interesting.</p>
                <ButtonLink> 
                    Join now &rarr;
                </ButtonLink>
            </div>
            <video className={classes.LearnMore__Video}  autoPlay muted loop >
                <source src="https://storage.googleapis.com/coverr-main/mp4/Sugar.mp4" type="video/mp4" />
            </video>
        </div>
   );
}

export default LearnMore
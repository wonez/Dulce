import React from 'react'

import classes from './Person.scss'

const Person = ({ data }) => {
    return(
        <div className={classes.AuthorBox}>
            <div    className={classes.Avatar} 
                    style={{backgroundImage: `url(${data.imgPath})`}}>
                {/* slika */}
            </div>
            <div className={classes.Data}>
                <h5 className={classes.Data__Name}>{data.name}</h5>
                <p className={classes.Data__Followers}>{data.followers} Followers</p>
            </div>
        </div>
    );
}

export default Person;
import React from 'react'

import classes from './Person.scss'

const Person = ({ data, click }) => {
    return(
        <div className={classes.AuthorBox}>
            <div    className={classes.Avatar} 
                    style={{backgroundImage: `url(${data.avatarUrl})`}}>
                {/* slika */}
            </div>
            <div className={classes.Data}>
                <h5 onClick={click} className={classes.Data__Name}>{`${data.name} ${data.surname}`}</h5>
                <p className={classes.Data__Followers}>{data.following.length} Followers</p>
            </div>
        </div>
    );
}

export default Person;
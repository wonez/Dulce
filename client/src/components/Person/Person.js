import React from 'react'

import classes from './Person.scss'

const Person = ({ data, click }) => {
    const date = new Date(data.dateCreated).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return(
        <div className={classes.AuthorBox}>
            <div    className={classes.Avatar} 
                    style={{backgroundImage: `url(${data.avatarUrl})`}}>
                {/* slika */}
            </div>
            <div className={classes.Data}>
                <h5 onClick={click} className={classes.Data__Name}>{`${data.name} ${data.surname}`}</h5>
                <p className={classes.Data__Followers}>Joined: {date}</p>
            </div>
        </div>
    );
}

export default Person;
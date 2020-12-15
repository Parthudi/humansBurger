import React from 'react'
import classes from './footer.css'

const footer = (props) => {
    return(
        <div className={classes.fot}>
            <footer className="page-footer font-small cyan darken-3">

        <div className="footer-copyright text-center py-3" style={{ color:"whitesmoke" ,backgroundColor:"black", textAlign:"center"}}>© 2020:
            <a > PARTH PARMAR </a>
        </div>
        
            </footer>

        </div>
    )
}

export default footer


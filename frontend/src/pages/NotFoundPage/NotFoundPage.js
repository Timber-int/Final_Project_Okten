import React from 'react';

import {Link} from 'react-router-dom';
import css from './NotFoundPage.module.css';


const NotFoundPage = () => {
    return (
        <div>
            <center><div className={css.not_content}>😱 Sorry but not content at this page 😰</div></center>
            <Link to={'/'} className={css.return_home}>Return Home</Link>
        </div>
    );
};

export {NotFoundPage};

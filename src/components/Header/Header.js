import React from 'react';
import {
    Link,
    useLocation,
} from "react-router-dom";
import classnames from 'classnames';

import styles from './Header.module.css';

const ROUTES = [
    {
        pathname: '/watch',
        title: 'Watch',
    },
    {
        pathname: '/watched',
        title: 'Watched',
    },
    {
        pathname: '/search',
        title: 'Search',
    }
];

export function Header () {
    let location = useLocation();
    const { pathname } = location;

    return (
        <div className={styles.header}>
            {ROUTES.map((route) => {
                const classname = classnames(styles.link, {
                    [styles.current]: (pathname === route.pathname),
                });
                return <Link key={route.pathname} className={classname} to={route.pathname}>{route.title}</Link>
            })}
        </div>
    );
}

export default Header;

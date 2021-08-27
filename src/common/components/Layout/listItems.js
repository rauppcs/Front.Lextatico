import React, { Fragment } from 'react';
import { ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';

const mainList = [
    {
        name: "Analisadores",
        icon: DashboardIcon,
        route: "/analisadores"
    }
];

const secondaryList = [
    {

    }
];

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export const mainListItems = mainList.map((val, index) => {
    return (
        <ListItemLink href="/login">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={val.name} />
        </ListItemLink>
    );
});

export const secondaryListItems = secondaryList.map((val, index) => {
    return (
        <div></div>
    )
});

import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

const ToolbarComponent = () => (
    <AppBar
        title="Framgia FQS"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
);

export default ToolbarComponent;

import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// import ExpandLess from '@material-ui/icons/RemoveRounded';
import ExpandMore from '@material-ui/icons/AddRounded';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import sidebar from '../sidebar';
import Link, {LinkProps} from '../components/common/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    icons: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.primary.main,
      minWidth: theme.spacing(2),
    },
    menuItemText: {
      fontSize: '0.8rem',
    },
    menuItem: {
      color: 'unset',
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.complex,
      }),
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'unset',
        textDecoration: 'none',
      },
    },
    menuItemOpen: {
      paddingBottom: theme.spacing(0.25),
    },
    collapseButton: {
      paddingLeft: theme.spacing(1),
    },
    collapseListItem: {
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    sectionHeading: {
      fontWeight: 700,
      color: theme.palette.primary.main,
      // '&:hover': {
      //   fontWeight: 700,
      // },
    },
    hightlight: {
      fontWeight: 700,
    },
    nested: {
      paddingTop: theme.spacing(0.2),
      paddingBottom: theme.spacing(0.2),
      paddingLeft: theme.spacing(16),
    },
  }),
);

export default function NestedList() {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);
  const router = useRouter();

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      className={classes.root}>
      {sidebar.map(({title, contents}) => {
        return (
          <div key={title}>
            <ListItem
              button
              disableRipple
              className={classes.collapseListItem}
              disableTouchRipple
              // onClick={handleClick}
            >
              {/* {open ? (
                <ExpandLess className={classes.icons} />
              ) : (
                <ExpandMore className={classes.icons} />
              )} */}
              <ExpandMore className={classes.icons} />
              <ListItemText
                className={classes.collapseButton}
                primaryTypographyProps={{
                  classes: {
                    root: classes.sectionHeading,
                  },
                }}
                primary={title}
              />
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{marginTop: '-10px'}}>
                {contents.map(({title: subtitle, url}) => (
                  <ListItem
                    key={url}
                    button
                    disableRipple
                    disableTouchRipple
                    className={clsx([classes.nested, classes.menuItem])}
                    component={React.forwardRef<HTMLAnchorElement, LinkProps>(
                      (props, ref) => (
                        <Link ref={ref} naked {...props} />
                      ),
                    )}
                    href={url}>
                    <ListItemText
                      primaryTypographyProps={{
                        classes: {
                          root: clsx({
                            [classes.menuItemText]: true,
                            [classes.hightlight]: router.pathname === url,
                          }),
                        },
                      }}
                      primary={subtitle}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
}

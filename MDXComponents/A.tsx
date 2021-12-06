import React from 'react';
import Link, {LinkProps} from '../components/common/Link';
import useActiveLink from './useActiveLink';

function NavLink(props: LinkProps) {
  const {link} = useActiveLink();
  const active = link === props.href.toString().slice(1);
  return <Link color={active ? 'primary' : 'inherit'} {...props} naked />;
}

function ContentLink(props: LinkProps) {
  return <Link color={'primary'} {...props} naked />;
}

export default function A(props: LinkProps) {
  return (
    <>
      {props.className && props.className.includes('toc-link') ? (
        <NavLink {...props} />
      ) : (
        <ContentLink {...props} />
      )}
    </>
  );
}

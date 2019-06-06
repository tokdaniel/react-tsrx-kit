import * as React from "react";
import { Link, LinkProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const ForwardedRefLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ ref as any } { ...props } />
));

const LinkButton = (props) => (
  <Button
    component={ ForwardedRefLink }
    href='#'
    { ...props }
  />
);

export default LinkButton;

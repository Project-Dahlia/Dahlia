export const getInitials = (firstName: string, lastName: string): string => {
  const name = `${firstName} ${lastName}`;
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
};

export const getIconClassNames = (
  routeHref: string,
  isCollapsed: boolean,
  isPath: (path: string) => boolean,
  strokePaths: string[],
  fillPaths: string[]
): string => {
  let classNames = 'h-6 w-6';

  if (isCollapsed) {
    if (strokePaths.includes(routeHref)) {
      classNames += ' stroke-gray-900';
    } else if (fillPaths.includes(routeHref)) {
      classNames += ' fill-gray-900';
    }
  }

  if (isPath(routeHref)) {
    if (fillPaths.includes(routeHref)) {
      classNames += ' fill-white';
    } else if (strokePaths.includes(routeHref)) {
      classNames += ' stroke-white';
    }
  }

  return classNames;
};

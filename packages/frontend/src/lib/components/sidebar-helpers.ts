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
  isPath: (path: string) => boolean
): string => {
  let classNames = 'h-6 w-6';

  if (isCollapsed) {
    classNames += ' stroke-gray-900';
  }

  if (isPath(routeHref)) {
    classNames += ' stroke-black';
  }

  return classNames;
};

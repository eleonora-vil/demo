export const splitPathToArray = (inputPath: string) => {
  const pathParts = inputPath.split('/').filter((part) => part !== ''); // Split the path and remove empty parts
  const result = [];

  for (const part of pathParts) {
    const currentPath = `/${part}`;
    const label = generateLabel(part);
    result.push({ path: currentPath, label });
  }

  return result;
};

function generateLabel(part: string) {
  return part.charAt(0).toUpperCase() + part.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
}

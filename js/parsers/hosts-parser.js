export function parseHosts(data) {
  const parts = data.trim().split("\n");

  return parts.map((part) => {
    const [name, hostsRequired] = part.trim().split(",");

    return {
      name,
      hostsRequired: parseInt(hostsRequired),
    };
  });
}

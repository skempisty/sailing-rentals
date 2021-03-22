export default function buildUserFullName(firstName, lastName) {
  return [firstName, lastName].filter(Boolean).join(' ');
}

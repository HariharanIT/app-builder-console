export default function (url_string: string) {
  const url = new URL(url_string);
  return url.searchParams;
}

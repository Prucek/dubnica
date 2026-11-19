// Small DOM adapter shared by native browser DOMParser and parser parity tests.
// Source HTML is parsed in a detached document; it is never inserted into the page.
export function createHtmlLoader(parseDocument) {
  return function load(html) {
    const document = parseDocument(html);
    function wrap(nodes) {
      const list = [...new Set(nodes.filter(Boolean))];
      return {
        length: list.length,
        text: () => list.map(node => node.textContent ?? '').join(''),
        toArray: () => list,
        eq: index => wrap([list[index < 0 ? list.length + index : index]]),
        first: () => wrap(list.slice(0, 1)),
        slice: (start, end) => wrap(list.slice(start, end)),
        children: selector => wrap(list.flatMap(node => [...(node.children ?? [])]).filter(node => !selector || node.matches(selector))),
        find: selector => wrap(list.flatMap(node => [...node.querySelectorAll(selector)])),
        add: other => wrap([...list, ...other.toArray()]),
        each: callback => { list.forEach((node, index) => callback(index, node)); },
        map: callback => ({ get: () => list.map((node, index) => callback(index, node)) }),
      };
    }
    return input => wrap(typeof input === 'string' ? [...document.querySelectorAll(input)] : [input]);
  };
}

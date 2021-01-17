export function epoch() {
  return Math.floor(Date.now() / 1000);
}
export function isEmpty(obj: any): boolean {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

export function ifEmpty(obj: any): any {
  return obj ? obj : undefined;
}

export function assignNonEmpty(dest: object, src: object): object {
  for (const prop in src) {
    const val = src[prop];
    if (val !== undefined && val !== null) {
      dest[prop] = val;
    }
  }
  return dest;
}

export function assignNullAsUndefined(dest: object, src: object): object {
  for (const prop in src) {
    const val = src[prop];
    dest[prop] = val !== null ? val : undefined;
  }
  return dest;
}

export function areEqual(o1: any, o2: any) {
  if (o1 === null || o1 === undefined || o2 === null || o2 === undefined) {
    return o1 === o2;
  }

  if (o1.constructor !== o2.constructor) {
    return false;
  }

  if (o1 instanceof Function || o1 instanceof RegExp) {
    return o1 === o2;
  }

  if (o1 === o2 || o1.valueOf() === o2.valueOf()) {
    return true;
  }

  if (o1 instanceof Date) return false;

  if (Array.isArray(o1) && o1.length !== o2.length) {
    return false;
  }
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }

  const firstKeys = Object.keys(o1);

  const allKeysExist = Object.keys(o2).every(
    (i) => firstKeys.indexOf(i) !== -1
  );

  const allKeyValuesMatch = firstKeys.every((i) => areEqual(o1[i], o2[i]));

  return allKeysExist && allKeyValuesMatch;
}

export function isInThisHost(link: HTMLAnchorElement) {
  const thisHost = window.location.host;
  const anchorHost = link.host;
  return thisHost === anchorHost;
}

export function secureAnchor(link: HTMLAnchorElement) {
  link.rel = 'noopener noreferrer nofollow';
  link.target = '_blank';
}

export function openURL(url: string) {
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  secureAnchor(link);
  link.setAttribute('style', 'display:none');
  document.body.appendChild(link); // for Firefox
  link.click();
  link.parentNode.removeChild(link); // for IE11
}

export function toRelativeURL(url: string) {
  return url.replace(/^.*\/\/[^\/]+/, '');
}

export function emptyNode(parent: Node) {
  let last: Node;
  while ((last = parent.lastChild)) {
    parent.removeChild(last);
  }
}

export function removeWhiteSpaceNodes(parent: Node) {
  const nodes = parent.childNodes;
  for (let i = 0, len = nodes.length; i < len; i++) {
    if (
      nodes[i] &&
      nodes[i].nodeType == Node.TEXT_NODE &&
      !/\S/.test(nodes[i].nodeValue)
    ) {
      parent.replaceChild(document.createTextNode(''), nodes[i]);
    } else if (nodes[i]) {
      removeWhiteSpaceNodes(nodes[i]);
    }
  }
}

export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function roundedPercents(nums: number[]): number[] {
  const total = nums.reduce((a, b) => a + b, 0);
  const len = nums.length;
  if (total === 0) return new Array(len).fill(0);

  const results = [];
  let percents = [];

  const ratio = 100 / total;
  let remainder = 100;
  for (let i = 0; i < len; i++) {
    percents[i] = nums[i] * ratio;
    results[i] = Math.round(percents[i]);
    remainder -= results[i];
  }

  if (remainder !== 0) {
    let flags = { size: 0 };
    percents = percents.map((percent) => {
      const floor = Math.floor(percent);
      if (floor === percent) return percent;
      else return floor + 0.5 - percent;
    });

    if (remainder > 0) {
      percents.forEach((percent, index) => {
        if (percent <= 0) {
          flags[index] = true;
          flags.size++;
        }
      });
    } else {
      percents.forEach((percent, index) => {
        if (percent >= 0) {
          flags[index] = true;
          flags.size++;
        }
      });
    }

    if (flags.size === percents.length) {
      results[0] += remainder;
      return results;
    }

    const flagsCopy = Object.assign({}, flags);
    for (; remainder < 0; remainder++) {
      if (flags.size === percents.length) flags = Object.assign({}, flagsCopy);
      const index = percents.reduce(
        (res, percent, index) => {
          if (flags[index]) return res;
          if (percent > res.minPercent) {
            res.minPercent = percent;
            res.minIndex = index;
          }
          return res;
        },
        { minPercent: -0.5, minIndex: 0 }
      ).minIndex;
      results[index] -= 1;
      if (results[index] === 0) {
        flagsCopy[index] = true;
      }
      flags[index] = true;
      flags.size++;
    }

    for (; remainder > 0; remainder--) {
      if (flags.size === percents.length) flags = { size: undefined };
      const index = percents.reduce(
        (res, percent, index) => {
          if (flags[index]) return res;
          if (percent < res.maxPercent) {
            res.maxPercent = percent;
            res.maxIndex = index;
          }
          return res;
        },
        { maxPercent: 0.5, maxIndex: 0 }
      ).maxIndex;
      results[index] += 1;
      flags[index] = true;
      flags.size++;
    }
  }
  return results;
}

export function permute(permutation: any[]): any[][] {
  const length = permutation.length;
  const result = [permutation.slice()];
  const c = new Array(length).fill(0);
  let i = 1;
  let k: number;
  let p: number;
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

export function extractHTML(
  html: string,
  limit: number
): { html: string; ellipsis: boolean } {
  const container: Element = document.createElement('DIV');
  container.innerHTML = html;
  const treeWalker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node: Node) => {
        const parent = node.parentElement;
        if (parent && parent.nodeType === Node.ELEMENT_NODE) {
          const el = <Element>parent;
          const isSpan = el.tagName === 'SPAN';
          if (isSpan) {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const map = new Map<Element, Element>();

  let length = 0;
  let ellipsis = false;
  let root: Element = document.createElement('DIV');
  map.set(container, root);
  for (let idx = 0; treeWalker.nextNode(); idx++) {
    const node = treeWalker.currentNode;
    let clone: Node;
    let inc = 0;
    let ended = false;
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = <Element>node;
      const isSpan = el.tagName === 'SPAN';
      if (isSpan) {
        // formula, scriptlet, etc.?
        inc = 1;
      }
      if (length + inc > limit) {
        ended = true;
      } else {
        const cloneEl = <Element>el.cloneNode(false);
        clone = cloneEl;
        map.set(el, cloneEl);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      inc = text.length;
      if (length + inc > limit) {
        text = text.substring(0, limit - length);
        let idx = text.lastIndexOf(' ');
        if (idx >= 0) text = text.substring(0, idx);
        ended = true;
      }
      if (text) clone = document.createTextNode(text);
    }

    const parent: HTMLElement = node.parentElement;
    const parentClone = map.get(parent);
    if (clone) {
      parentClone.appendChild(clone);
    }

    length += inc;
    if (ended) {
      parentClone.appendChild(document.createTextNode(' ...'));
      ellipsis = true;
      break;
    }
  }
  return { html: root.innerHTML, ellipsis };
}

export function truncateMillis(num: number) {
  return Math.floor(num * 1000) / 1000;
}

export function getDimensionStyles(h: number, aspectRatio?: number): string[] {
  let width: string;
  let height: string;
  if (aspectRatio) {
    width = (aspectRatio ? Math.round(h * aspectRatio) : '') + 'px';
    height = h + 'px';
  } else {
    width = height = 'auto';
  }
  return [width, height];
}

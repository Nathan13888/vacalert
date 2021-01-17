export function testShared(s: string) {
  console.log('test shared :>> ', s);
}

export class QueryTerm {
  // field?: string;
  // value: string;
  constructor(
    public name: string | undefined,
    public value: string,
    public negate?: boolean,
  ) {}
}

export class QueryParser {
  constructor() {}

  toString(terms: QueryTerm[]): string {
    let s = '';
    for (const term of terms) {
      if (term.value) {
        if (s.length > 0) s += ' ';
        if (term.negate) s += '-';
        if (term.name) {
          s += term.name + ':';
        }
        const quoted = term.value.includes(' ') || term.value.includes(':');
        if (quoted) {
          s += '"';
        }
        s += term.value;
        if (quoted) {
          s += '"';
        }
      }
    }
    return s;
  }

  parse(query: string): QueryTerm[] {
    const terms: QueryTerm[] = [];
    if (!query) return terms;

    const len = query.length;
    let start = 0;
    let inFence: string | undefined = undefined;
    const words: string[] = [];
    let namePrefix = false;
    let negatePrefix = false;
    for (let i = 0; i < len; i++) {
      const c = query.charAt(i);
      let end = -1;
      let startNext = -1;
      if (!inFence) {
        if (c === ':') {
          namePrefix = true;
        } else if (namePrefix && c === '"') {
          namePrefix = false;
          inFence = c;
        } else if (c === '-') {
          negatePrefix = true;
        } else if (negatePrefix && c === '"') {
          negatePrefix = false;
          inFence = c;
        } else if (c === '"') {
          end = 0;
          startNext = 0;
          inFence = c;
        } else if (c === ' ') {
          namePrefix = false;
          negatePrefix = false;
          end = 0;
          startNext = 1;
        }
      } else if (inFence === '"' && c === '"') {
        end = 1;
        startNext = 1;
        inFence = undefined;
      }

      if (startNext === -1 && i === len - 1) {
        end = 2;
        startNext = 0;
      }
      if (startNext !== -1) {
        const s = query.substring(start, i + end).trimRight();
        if (s.length > 0) {
          words.push(s);
        }
        start = i + startNext;
        namePrefix = false;
        negatePrefix = false;
      }
    }

    for (let word of words) {
      let phrase: string | undefined = undefined;
      let negate: boolean | undefined = undefined;
      if (word.startsWith('-')) {
        negate = true;
        word = word.substring(1);
      }
      if (word.startsWith('"') && word.endsWith('"')) {
        if (word.length > 2) {
          phrase = this.removeDoubleQuotes(word);
        }
      } else {
        const idx = word.indexOf(':');
        if (idx !== -1) {
          const name = word.substring(0, idx);
          let value = word.substring(idx + 1);
          value = this.removeDoubleQuotes(value);
          if (value.length > 0) {
            terms.push(new QueryTerm(name, value, negate));
          }
        } else {
          phrase = word;
        }
      }
      if (phrase) {
        terms.push(new QueryTerm(undefined, phrase, negate));
      }
    }

    return terms;
  }

  private removeDoubleQuotes(value: string, trim = true) {
    value = value.replace(/^"(.*)"$/, '$1');
    if (trim) value.trim();
    return value;
  }

  removeDuplicates(queryTerms: QueryTerm[]) {
    const map = new Map<string, number[]>();
    queryTerms.forEach((qt, index) => {
      const k = qt.name + ':' + qt.value;
      let a = map.get(k);
      if (a === undefined) {
        a = [];
        map.set(k, a);
      }
      a.push(index);
    });
    console.log('dels *queryTerms :>> ', queryTerms);
    const dels: number[] = [];
    for (const e of map.entries()) {
      const a = e[1];
      if (a.length > 1) {
        let n = 0;
        a.forEach(i => {
          console.log('dels duplicate queryTerms[i]e :>> ', queryTerms[i]);
          n += queryTerms[i].negate ? -1 : 1;
        });
        console.log('dels result positive count:>> ', n);
        if (n === 0) {
          dels.push(...a);
        } else {
          const last = a[a.length - 1];
          queryTerms[last].negate = n < 0 ? true : undefined;
          dels.push(...a.slice(0, a.length - 1));
        }
      }
    }
    console.log('dels :>> ', dels);
    dels.sort((a, b) => a - b);
    dels.reverse();
    console.log('dels sorted :>> ', dels);
    dels.forEach(n => queryTerms.splice(n, 1));
  }
}

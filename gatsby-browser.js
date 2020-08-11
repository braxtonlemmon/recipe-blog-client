import { wrapRootElement as wrap } from './root-wrapper';
import 'whatwg-fetch';

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer');
    console.log('Successfully imported intersection-observer');
  }
}

export const wrapPageElement = wrap;
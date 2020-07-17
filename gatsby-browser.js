import { wrapRootElement as wrap } from './root-wrapper';

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer');
    console.log('Successfully imported intersection-observer');
  } else {
    console.log('Did not need to import intersection-observer');
  }
}

export const wrapPageElement = wrap;
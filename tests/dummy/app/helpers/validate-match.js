import { helper } from '@ember/component/helper';

export default helper(function validateMatch(params, hash) {
  return ({ value }) => {
    return value === hash.match ? [] : ['Must match exactly'];
  };
});
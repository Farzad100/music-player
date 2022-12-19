/* eslint-disable linebreak-style */
export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`;
    if (binding.modifiers.right) {
      iconClass += ' float-right';
    }
    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400';
    }
    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};

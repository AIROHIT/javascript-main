var App = function () {

  function getLevelNodes(node) {
    return Array.from(node.parentNode.children);
  }

  function getChildIndex(node) {
    return getLevelNodes(node).indexOf(node);
  }

  function tagNodeName(node) {
    node.innerHTML = node.nodeName + node.innerHTML;
  }

  function clearInside(node) {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeName === '#text') {
        child.remove();
      }
    });
  }

  function handleImage(node) {
    if (node.nodeName === 'IMG') {
      node.src = '';
      node.alt = 'IMG';
    }
  }

  function walk(node, cb) {
    cb(node);
    if (node.children.length) {
      walk(node.children[0], cb);
    }
    if (node.nextElementSibling) {
      walk(node.nextElementSibling, cb);
    }
  }

  function init() {
    var $el = document.getElementById('tree');
    walk($el.children[0], node => {
      var levelNodes = getLevelNodes(node);
      var childIndex = getChildIndex(node);
      var width = 90 / levelNodes.length;
      var leftSlice = 100 / levelNodes.length;
      var left = leftSlice * childIndex;
      clearInside(node);
      tagNodeName(node);
      handleImage(node);
      node.style.cssText += `;
        width: ${width}%;
        left: ${left}%;
      `;
    });
  }

  return { init };

}();

document.addEventListener(
'DOMContentLoaded',
App.init.bind(App));
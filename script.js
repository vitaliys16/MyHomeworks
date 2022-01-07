'use strict';

const input = document.querySelector('.input-selector');
const btn =  document.querySelector('.btn-render');

const DomElement = function(selector, height, width, bg, fontSize) {
    let cssText = {
        height: height,
        width: width,
        bg: bg,
        fontSize: fontSize,
    };
    this.render = function() {
        if (selector.value.indexOf(".") == 0) {
            if (selector.value.trim().replace(/\s/g, '').length === 1) {
                alert('назови как нибудь тэг после точки');
                selector.value = selector.value.trim().replace(/\s/g, '');
                return;
            }
            let block = document.createElement('textarea');
                block.className = selector.value.substr(1).trim().replace(/\s/g, '');
                block.style.margin = '10% auto';
                block.style.outline = 'none';
                block.style.border = 'none';
                block.style.resize = 'none';
                block.style.overflow = 'hidden';
                block.style.textAlign = 'center';
                block.style.display = 'block';
                block.style.height = cssText.height + 'px';
                block.style.width = cssText.width + 'px';
                block.style.background = cssText.bg;
                block.style.fontSize = cssText.fontSize + 'px';
                block.innerHTML = "Добро пожаловать в КВАДРАТ!";
                document.body.append(block);
        } else if (selector.value.indexOf("#") == 0) {
            if (selector.value.trim().replace(/\s/g, '').length === 1) {
                alert('назови как нибудь тэг после решетки');
                selector.value = selector.value.trim().replace(/\s/g, '');
                return;
            }
            let block = document.createElement('textarea');
                block.id = selector.value.substr(1).trim().replace(/\s/g, '');
                block.style.margin = '10% auto';
                block.style.outline = 'none';
                block.style.border = 'none';
                block.style.resize = 'none';
                block.style.overflow = 'hidden';
                block.style.textAlign = 'center';
                block.style.display = 'block';
                block.style.height = cssText.height + 'px';
                block.style.width = cssText.width + 'px';
                block.style.background = cssText.bg;
                block.style.fontSize = cssText.fontSize + 'px';
                block.innerHTML = "Добро пожаловать в КВАДРАТ!";
                document.body.append(block);
        } else {
            alert('начни строку с точки, либо с решетки (#)');
            console.log(typeof selector);
        }
    };
};

const newObject = new DomElement(input, 200, 200, 'yellow', 25);

btn.addEventListener('click', newObject.render);

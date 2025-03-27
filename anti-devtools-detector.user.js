// ==UserScript==
// @name         屏蔽 DevTools 检测
// @namespace    https://github.com/LFWQSP2641/
// @version      1.1
// @description  拦截 devtools-detector.js 脚本，禁用页面检测 DevTools 的功能。
// @author       LFWQSP2641
// @match        *://*.chaoxing.com/*
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // 1. 拦截 devtools-detector.js
    if (true) {
        const observer = new MutationObserver(() => {
            document.querySelectorAll('script[src*="devtools-detector.js"]').forEach(el => {
                console.log("Tampermonkey: 拦截 devtools-detector.js");
                el.remove();
            });
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    // 2. 覆盖 devtoolsDetector 对象
    if (false) {
        const script = document.createElement('script');
        script.textContent = `
            // 在全局作用域定义一个假的 devtoolsDetector 对象
            window.devtoolsDetector = {
                // 主要方法的模拟实现
                isLaunch: () => false,
                launch: () => {},
                stop: () => {},
                isOpen: false,
                addListener: () => {},
                removeListener: () => {},
                setDetectDelay: () => {},
                
                // 模拟检测器返回假结果
                _broadcast: () => {},
                _detectLoop: () => {},
                _isOpen: false,
                _detectLoopStopped: true
            };
            
            // 防止原始对象被重新定义
            Object.defineProperty(window, 'devtoolsDetector', {
                writable: false,
                configurable: false
            });
        `;

        // 将脚本注入页面
        document.documentElement.appendChild(script);
        document.documentElement.removeChild(script);
    }

    // 4. 多层防御，拦截关键的对象和方法。
    if (false) {
        // 在页面加载最开始就注入我们的代码
        const script = document.createElement('script');
        script.textContent = `
            // 1. 首先，保存原始的属性描述符方法，防止它们被篡改
            const originalDefineProperty = Object.defineProperty;
            const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            
            // 2. 创建一个假的 devtoolsDetector 对象
            const fakeDetector = {
                isLaunch: () => false,
                launch: () => {},
                stop: () => {},
                addListener: () => {},
                removeListener: () => {},
                setDetectDelay: () => {},
                _detectLoop: () => {},
                _broadcast: () => {},
                _detectLoopStopped: true,
                isOpen: false,
                _isOpen: false
            };
            
            // 3. 拦截全局 window 的 devtoolsDetector 属性设置
            originalDefineProperty(window, 'devtoolsDetector', {
                configurable: true,
                get: function() {
                    return fakeDetector;
                },
                set: function() {
                    // 忽略所有设置尝试
                    console.log("拦截到 devtoolsDetector 设置尝试");
                    return fakeDetector;
                }
            });
            
            // 4. 劫持函数构造器，防止检测脚本通过 Function 创建检测函数
            const originalFunction = Function;
            window.Function = function() {
                const fnBody = arguments[arguments.length - 1];
                if (typeof fnBody === 'string') {
                    // 检查函数体中是否包含特定关键词
                    if (fnBody.includes('debugger') || 
                        fnBody.includes('toString') && (fnBody.includes('isOpen') || fnBody.includes('devtools'))) {
                        // 返回一个无害的函数
                        return function() { return false; };
                    }
                }
                // 否则使用原始构造函数
                return originalFunction.apply(this, arguments);
            };
            
            // 5. 阻止定时器检测
            const originalSetTimeout = window.setTimeout;
            window.setTimeout = function(fn, delay) {
                if (typeof fn === 'function' && delay >= 100 && delay <= 1000) {
                    const fnStr = fn.toString();
                    if (fnStr.includes('devtools') || fnStr.includes('debugger') || fnStr.includes('_detectLoop')) {
                        // 替换为无操作的函数
                        fn = function() {};
                    }
                }
                return originalSetTimeout.apply(this, arguments);
            };
            
            // 6. 劫持 console.* 方法，因为一些检测器会利用这些方法
            if (window.console) {
                const originalLog = console.log;
                const originalTable = console.table;
                const originalClear = console.clear;
                
                console.log = function() {
                    // 过滤掉与检测相关的调用
                    const stackTrace = new Error().stack || '';
                    if (stackTrace.includes('devtools') || stackTrace.includes('detector')) {
                        return;
                    }
                    return originalLog.apply(this, arguments);
                };
                
                console.table = function() {
                    const stackTrace = new Error().stack || '';
                    if (stackTrace.includes('devtools') || stackTrace.includes('detector')) {
                        return;
                    }
                    return originalTable.apply(this, arguments);
                };
                
                console.clear = function() {
                    const stackTrace = new Error().stack || '';
                    if (stackTrace.includes('devtools') || stackTrace.includes('detector')) {
                        return;
                    }
                    return originalClear.apply(this, arguments);
                };
            }
            
            console.log('🛡️ DevTools 保护已激活');
        `;

        // 尽早添加到页面
        document.documentElement.appendChild(script);
        document.documentElement.removeChild(script);

        // 添加DOM过滤器，移除加载的检测脚本
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.tagName === 'SCRIPT' &&
                        (node.src && (node.src.includes('devtools-detector') ||
                            node.src.includes('devtoolsDetector')))) {
                        console.log("已拦截检测脚本的加载");
                        node.remove();
                    }
                }
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    }

    // 4.5. 4 的 ai 优化版本
    if (true) {
        // 在页面加载最开始就注入我们的代码
        const script = document.createElement('script');
        script.textContent = `
            // 保存原始方法，避免它们被篡改
            const originalDefineProperty = Object.defineProperty;
            const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            
            // 创建不可变的假 devtoolsDetector 对象
            const fakeDetector = Object.freeze({
                isLaunch: () => false,
                launch: () => {},
                stop: () => {},
                addListener: () => {},
                removeListener: () => {},
                setDetectDelay: () => {},
                _detectLoop: () => {},
                _broadcast: () => {},
                _detectLoopStopped: true,
                isOpen: false,
                _isOpen: false
            });
            
            // 拦截全局 window 的 devtoolsDetector 属性设置
            originalDefineProperty(window, 'devtoolsDetector', {
                configurable: false, // 防止属性被重新配置
                enumerable: true,
                get: function() {
                    return fakeDetector;
                },
                set: function() {
                    // 忽略所有设置尝试，静默失败
                    return fakeDetector;
                }
            });
            
            // 劫持函数构造器，防止通过 Function 创建检测函数
            const originalFunction = Function;
            window.Function = function() {
                const fnBody = arguments[arguments.length - 1];
                if (typeof fnBody === 'string') {
                    // 检查函数体中是否包含特定关键词
                    if (fnBody.includes('debugger') || 
                        (fnBody.includes('toString') && (fnBody.includes('isOpen') || fnBody.includes('devtools')))) {
                        return function() { return false; };
                    }
                }
                return originalFunction.apply(this, arguments);
            };
            // 保持原始函数的原型链
            window.Function.prototype = originalFunction.prototype;
            
            // 阻止定时器检测
            const originalSetTimeout = window.setTimeout;
            window.setTimeout = function(fn, delay) {
                // 只拦截可能的检测函数
                if (typeof fn === 'function' && delay >= 100 && delay <= 1000) {
                    try {
                        const fnStr = fn.toString();
                        if (fnStr.includes('devtools') || fnStr.includes('debugger') || fnStr.includes('_detectLoop')) {
                            fn = function() {};
                        }
                    } catch (e) {
                        // 防止异常中断脚本执行
                    }
                }
                return originalSetTimeout.apply(this, arguments);
            };
            
            // 劫持 console 方法，减少检测可能性
            if (window.console) {
                const methods = ['log', 'table', 'clear', 'trace', 'debug'];
                methods.forEach(method => {
                    if (typeof console[method] === 'function') {
                        const original = console[method];
                        console[method] = function() {
                            // 检测调用栈是否与检测相关
                            try {
                                const stackTrace = new Error().stack || '';
                                if (stackTrace.includes('devtools') || stackTrace.includes('detector')) {
                                    return;
                                }
                            } catch (e) {
                                // 防止异常破坏页面功能
                            }
                            return original.apply(this, arguments);
                        };
                    }
                });
            }
            
            // 记录激活状态，但避免明显特征
            const ts = Date.now();
            sessionStorage.setItem('_sys' + ts, '1');
        `;

        // 尽早添加到页面并立即移除
        (document.head || document.documentElement).appendChild(script);
        script.remove();

        // 添加DOM过滤器，移除加载的检测脚本
        const scriptFilter = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type !== 'childList') continue;

                for (const node of mutation.addedNodes) {
                    if (node.nodeName === 'SCRIPT' &&
                        node.src &&
                        /devtools[-_]detector|devtoolsDetector/i.test(node.src)) {
                        console.log("已拦截检测脚本的加载");
                        node.remove();
                    }
                }
            }
        });

        // 使用更高效的选择器
        scriptFilter.observe(document, {
            childList: true,
            subtree: true
        });

        // 定时检查观察器是否正常运行
        const checkInterval = setInterval(() => {
            if (!scriptFilter || !document.body) return;

            if (!scriptFilter.takeRecords || scriptFilter.takeRecords().length === 0) {
                // 重新初始化观察器如果它停止工作
                scriptFilter.disconnect();
                scriptFilter.observe(document, { childList: true, subtree: true });
            }
        }, 30000);

        // 页面卸载时清理资源
        window.addEventListener('unload', () => {
            scriptFilter.disconnect();
            clearInterval(checkInterval);
        }, { once: true });
    }
    
    // 105. 拦截 XMLHttpRequest
    // （由于网页通过 <script> 标签直接加载 devtoolsDetector ，无法拦截）
    if (false) {
        // 重写 XMLHttpRequest
        const originalXHR = unsafeWindow.XMLHttpRequest;
        unsafeWindow.XMLHttpRequest = function () {
            const xhr = new originalXHR();
            const originalOpen = xhr.open;

            xhr.open = function () {
                const url = arguments[1];
                if (url && (
                    url.includes('devtools-detector') ||
                    url.includes('devtoolsDetector')
                )) {
                    // 使用空实现替换
                    xhr.addEventListener('readystatechange', function () {
                        if (xhr.readyState === 4) {
                            Object.defineProperty(xhr, 'responseText', {
                                value: 'window.devtoolsDetector = { isOpen: false, launch: function(){}, stop: function(){}, isLaunch: function(){ return false; }, addListener: function(){} };'
                            });
                        }
                    });
                }

                return originalOpen.apply(this, arguments);
            };

            return xhr;
        };
    }
})();

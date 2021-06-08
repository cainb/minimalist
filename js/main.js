// Copyright © 2021 Cai Hai. All Rights Reserved.

// 深色模式按钮

$(document).ready(function () {
	(() => {
		const rootElement = document.documentElement; // <html>
		const darkModeStorageKey = "user-color-scheme"; // 作为 localStorage 的 key
		const darkModeMediaQueryKey = "--color-mode";
		const rootElementDarkModeAttributeName = "data-user-color-scheme";
		const darkModeToggleBottonElement = document.getElementById("light-dark-button");

		const setLS = (k, v) => {
			try {
				localStorage.setItem(k, v);
			} catch (e) {}
		};

		const removeLS = (k) => {
			try {
				localStorage.removeItem(k);
			} catch (e) {}
		};

		const getLS = (k) => {
			try {
				return localStorage.getItem(k);
			} catch (e) {
				return null; // 和 localStorage 中没有找到对应 key 的行为一致
			}
		};

		const getModeFromCSSMediaQuery = () => {
			const res = getComputedStyle(rootElement).getPropertyValue(darkModeMediaQueryKey);
			if (res.length) return res.replace(/\"/g, "").trim();
			return res === "dark" ? "dark" : "light";
		};

		const resetRootDarkModeAttributeAndLS = () => {
			rootElement.removeAttribute(rootElementDarkModeAttributeName);
			removeLS(darkModeStorageKey);
		};

		const validColorModeKeys = {
			dark: true,
			light: true,
		};

		const applyCustomDarkModeSettings = (mode) => {
			// 接受从「按钮」处传来的模式，或者从 localStorage 读取
			const currentSetting = mode || getLS(darkModeStorageKey);

			if (currentSetting === getModeFromCSSMediaQuery()) {
				// 当用户自定义的显示模式和 prefers-color-scheme 相同时重置、恢复到自动模式
				resetRootDarkModeAttributeAndLS();
			} else if (validColorModeKeys[currentSetting]) {
				// 相比 Array#indexOf，这种写法 Uglify 后字节数更少
				rootElement.setAttribute(rootElementDarkModeAttributeName, currentSetting);
			} else {
				// 首次访问或从未使用过按钮、localStorage 中没有存储的值，currentSetting 是 null
				// 或者 localStorage 被篡改，currentSetting 不是合法值
				resetRootDarkModeAttributeAndLS();
			}
		};

		const invertDarkModeObj = {
			dark: "light",
			light: "dark",
		};

		const toggleCustomDarkMode = () => {
			let currentSetting = getLS(darkModeStorageKey);

			if (validColorModeKeys[currentSetting]) {
				// 从 localStorage 中读取模式，并取相反的模式
				currentSetting = invertDarkModeObj[currentSetting];
			} else if (currentSetting === null) {
				// localStorage 中没有相关值，或者 localStorage 抛了 Error
				// 从 CSS 中读取当前 prefers-color-scheme 并取相反的模式
				currentSetting = invertDarkModeObj[getModeFromCSSMediaQuery()];
			} else {
				// 不知道出了什么其它幺蛾子，比如 localStorage 被篡改成非法值
				return; // 直接 return;
			}
			// 将相反的模式写入 localStorage
			setLS(darkModeStorageKey, currentSetting);

			return currentSetting;
		};

		// 当页面加载时，将显示模式设置为 localStorage 中自定义的值（如果有的话）
		applyCustomDarkModeSettings();

		darkModeToggleBottonElement.addEventListener("click", () => {
			// 当用户点击「按钮」时，获得新的显示模式、写入 localStorage、并在页面上生效
			applyCustomDarkModeSettings(toggleCustomDarkMode());
		});
	})();
});

// 信息卡片 - 信息卡片切换按钮

$(document).ready(function () {
    const cardButton = document.querySelector('.card-button');
    const cardSearchButton = document.querySelector('.card-search-button');
    const cardSearch = document.querySelector('.card-search');
    const body = document.querySelector('body');

    cardButton.addEventListener('click', ()=> {
        cardSearch.style.display = 'flex'
    })

    cardSearchButton.addEventListener('click', ()=> {
        cardSearch.style.display = 'none'
    })

    window.addEventListener('click', (e) => {
        if(e.target == body) {
            cardSearch.style.display = 'none'
        }
    })
})

// 搜索卡片 - 时间与日期

function getTime() {
	var dateObj = new Date();
	var year = dateObj.getFullYear(); // 年
	var month = dateObj.getMonth() + 1; // 月 (注意：月份+1)
	var date = dateObj.getDate(); // 日
	var day = dateObj.getDay();
	var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	var week = weeks[day]; // 根据day值，获取星期数组中的星期数。
	var hours = dateObj.getHours(); // 小时
	var minutes = dateObj.getMinutes(); // 分钟
	var seconds = dateObj.getSeconds(); // 秒
	if (month < 10) {
		month = "0" + month;
	}
	if (date < 10) {
		date = "0" + date;
	}
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var newTime = hours + ":" + minutes + ":" + seconds; // 获取时间
	var newDate = year + "年" + month + "月" + date + "日" + "&nbsp &nbsp" + week; // 获取年月日
	document.getElementById("time").innerHTML = newTime; // 在div中写入时间
	document.getElementById("date").innerHTML = newDate; // 在div中写入年月日
	setTimeout("getTime()", 500); // 每隔 500ms 执行一次 getTime()
}

// 搜索卡片 - 聚合搜索

$(document).ready(function () {
	//搜索引擎菜单列表默认参数
	var se_list_preinstall = {
		1: {
			id: 1,
			title: "必应",
			url: "https://cn.bing.com/search",
			name: "q",
			img: "./img/bing.png",
		},
		2: {
			id: 2,
			title: "谷歌",
			url: "https://www.google.com/search",
			name: "q",
			img: "./img/google.png",
		},
		3: {
			id: 3,
			title: "百度",
			url: "https://www.baidu.com/s",
			name: "wd",
			img: "./img/baidu.png",
		},
	};
	//获取搜索引擎列表参数
	function getSeList() {
		var se_list_local = Cookies.get("se_list");
		if (se_list_local !== "{}" && se_list_local) {
			return JSON.parse(se_list_local);
		} else {
			setSeList(se_list_preinstall);
			return se_list_preinstall;
		}
	}
	//载入搜索引擎列表参数
	function setSeList(se_list) {
		if (se_list) {
			Cookies.set("se_list", se_list, { expires: 36500 });
			return true;
		}
		return false;
	}
	//选择搜索引擎点击事件
	$(document).on("click", function (e) {
		if ($(".search-engine").is(":hidden") && $(".se").is(e.target)) {
			if ($(".se").is(e.target)) {
				seList();
				$(".search-engine").show();
			}
		} else {
			if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
				$(".search-engine").hide();
			}
		}
	});
	//点击搜索引擎列表
	$(".search-engine-list").on("click", ".se-li", function () {
		var url = $(this).attr("url");
		var name = $(this).attr("name");
		var img = $(this).attr("img");
		$(".search").attr("action", url);
		$(".wd").attr("name", name);
		$(".se").attr("src", img);
		$(".search-engine").hide();
	});
	//加载搜索引擎列表
	function seList() {
		var html = "";
		var se_list = getSeList();
		for (var i in se_list) {
			html += "<li class='se-li' url='" + se_list[i]["url"] + "' name='" + se_list[i]["name"] + "' img='" + se_list[i]["img"] + "'><img src='" + se_list[i]["img"] + "'></img>" + se_list[i]["title"] + "</li>";
		}
	}
	// 生成并引入搜索引擎列表 cookie
	(function (factory) {
		var registeredInModuleLoader;
		if (typeof define === "function" && define.amd) {
			define(factory);
			registeredInModuleLoader = true;
		}
		if (typeof exports === "object") {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = (window.Cookies = factory());
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	})(function () {
		function extend() {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[i];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
		function decode(s) {
			return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
		}
		function init(converter) {
			function api() {}
			function set(key, value, attributes) {
				if (typeof document === "undefined") {
					return;
				}
				attributes = extend(
					{
						path: "/",
					},
					api.defaults,
					attributes
				);
				if (typeof attributes.expires === "number") {
					attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e5);
				}
				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
				try {
					var result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}
				value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				key = encodeURIComponent(String(key))
					.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
					.replace(/[\(\)]/g, escape);
				var stringifiedAttributes = "";
				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += "; " + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					// Considers RFC 6265 section 5.2:
					// ...
					// 3.  If the remaining unparsed-attributes contains a %x3B (";")
					//     character:
					// Consume the characters of the unparsed-attributes up to,
					// not including, the first %x3B (";") character.
					// ...
					stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
				}
				return (document.cookie = key + "=" + value + stringifiedAttributes);
			}
			function get(key, json) {
				if (typeof document === "undefined") {
					return;
				}
				var jar = {};
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all.
				var cookies = document.cookie ? document.cookie.split("; ") : [];
				var i = 0;
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split("=");
					var cookie = parts.slice(1).join("=");
					if (!json && cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
					try {
						var name = decode(parts[0]);
						cookie = (converter.read || converter)(cookie, name) || decode(cookie);
						if (json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
						jar[name] = cookie;
						if (key === name) {
							break;
						}
					} catch (e) {}
				}
				return key ? jar[key] : jar;
			}
			api.set = set;
			api.get = function (key) {
				return get(key, false /* read as raw */);
			};
			api.getJSON = function (key) {
				return get(key, true /* read as json */);
			};
			api.remove = function (key, attributes) {
				set(
					key,
					"",
					extend(attributes, {
						expires: -1,
					})
				);
			};
			api.defaults = {};
			api.withConverter = init;
			return api;
		}
		return init(function () {});
	});
});

// 搜索卡片 - 一言句子

$(document).ready(function hitokoto() {
	fetch("https://v1.hitokoto.cn/?c=i")
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			// 一言句子正文
			var hitokoto = document.getElementById("hitokoto");
			hitokoto.innerText = "\xa0\xa0\xa0\xa0" + data.hitokoto;
			// 一言句子作者与出处
			var hitofrom = document.getElementById("hitofrom");
			hitofrom.innerText = "—" + " " + data.from_who + "\xa0" + "《 " + data.from + " 》";
			// data.hitokoto: 正文
			// data.from_who: 作者
			// data.from: 出处
		})
		.catch(function (err) {
			console.error(err);
		});
});
// ==UserScript==
// @name         网课小助手（自用独立版）· 超星学习通｜知到智慧树 · AI答题
// @namespace    wangke-helper-custom
// @version      0.9.10
// @author       基于 isMobile 的原版修改
// @description  🫧独立自用版（不接收原作者更新）🫧：1、适配超星学习通、知到智慧树；2、自动播放视频、自动完成章节任务点与作业；3、自动答题（单选/多选/判断/填空/简答）；4、可自备密钥接入兼容 OpenAI 接口的 AI 模型，也支持第三方题库（AnswererWrapper 配置），两者可自由搭配（AI优先 / 题库优先）；5、支持联网校验答案、多种深度思考参数、模型准确率自测；6、设置页「总开关」可一键启停脚本（关闭后立刻停工）；7、日志抓取不再自动复制，改为手动点「复制」；8、密钥只保存在本机，不收集任何隐私信息；9、仅供学习交流使用。
// @license      MIT
// @icon         data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='54' text-anchor='middle' dominant-baseline='central' font-size='82' font-family='Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif'%3E%F0%9F%92%AF%3C/text%3E%3C/svg%3E
// @match        *://*.chaoxing.com/*
// @match        *://*.edu.cn/*
// @match        *://*.nbdlib.cn/*
// @match         *://*.hnsyu.net/*
// @match        *://*.gdhkmooc.com/*
// @match        *://*.zhihuishu.com/*
// @require      https://lib.baomitu.com/vue/3.4.31/vue.global.prod.js
// @require      https://lib.baomitu.com/vue-demi/0.14.7/index.iife.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://lib.baomitu.com/element-plus/2.7.2/index.full.min.js
// @require      https://lib.baomitu.com/pinia/2.3.1/pinia.iife.min.js
// @require      https://lib.baomitu.com/rxjs/7.8.2/rxjs.umd.min.js
// @require      https://lib.baomitu.com/blueimp-md5/2.19.0/js/md5.min.js
// @resource     ElementPlus       https://lib.baomitu.com/element-plus/2.7.2/index.css
// @resource     ElementPlusStyle  https://lib.baomitu.com/element-plus/2.8.2/index.min.css
// @resource     ttf               https://www.forestpolice.org/ttf/2.0/table.json
// @connect      api.tikuhai.com
// @connect      cx.icodef.com
// @connect      62.234.36.191
// @connect      api.deepseek.com
// @connect      html.duckduckgo.com
// @connect      *
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const a=document.createElement("style");a.textContent=e,document.head.append(a)})('.el-popper.is-pure, .el-select__popper, .el-dropdown__popper, .el-tooltip__popper, .el-popover__popper {  z-index: 100100 !important;}.el-message {  z-index: 100200 !important;}.el-message-box {  z-index: 100300 !important;}.el-notification {  z-index: 100400 !important;} .main-page{--app-font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--el-font-family: var(--app-font-family);z-index:100003;position:fixed;color:#1f2329;font-family:var(--app-font-family)!important;font-size:14px;line-height:1.5715;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}.main-page *,.main-page input,.main-page button,.main-page textarea{font-family:var(--app-font-family)!important;letter-spacing:0}.main-page .el-card,.main-page .el-tabs,.main-page .el-text,.main-page .el-button,.main-page .el-input,.main-page .el-input__inner,.main-page .el-input-number,.main-page .el-table{font-family:var(--app-font-family)!important}.main-page .overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1001}.main-page .el-card{border:0}.main-page .card-header{display:flex;justify-content:space-between;flex-direction:row;align-items:center;margin:0;padding:0;cursor:move}.main-page .card-header .title{font-size:14px;display:flex;align-items:center;justify-content:center;font-weight:500}.main-page .warning-icon{margin-left:5px}.main-page .zoom-icon{cursor:pointer}.main-page .zoom-icon.is-spaced{margin-left:8px}.main-page .minus{margin:5px 10px -10px 0}.main-page .compact-divider{margin:0}.main-page .demo-tabs{display:initial}.main-page .el-card__header{background-color:#1f71e0;color:#fff;padding:7px 10px 7px 16px;margin:0}.main-page .el-card__body{padding:0 16px 20px}.main-page .el-tabs__nav-wrap:after{height:1px}.main-page .el-tabs__active-bar{background-color:#176ae5}.main-page .el-tabs__item{font-size:13px;height:34px}.main-page .el-tabs__item.is-top{font-weight:400;color:#4e5969;padding:0 8px 0 12px}.main-page .el-tabs__item.is-active{font-weight:500;color:#176ae5;padding:0 8px 0 12px}.main-page .script-home{padding-top:2px}.main-page .log .el-text{font-weight:400;white-space:normal}.main-page .log-time{font-weight:400}.main-page .log-action-link{color:#176ae5;cursor:pointer;text-decoration:none}.main-page .log-action-link:hover{color:#409eff;text-decoration:underline}.main-page .log-divider{margin:0}.main-page .token-input,.main-page .question-list{font-size:12px}.main-page .token-label{border-radius:0}.main-page .question_table{width:625px}.main-page .setting{margin-top:-8px;font-size:14px}.main-page .setting-section-title{font-size:13px}.main-page .setting-checkbox{margin-bottom:6px}.main-page .setting-number{margin-top:6px}.main-page .setting .el-form-item{margin-bottom:0} ');

(function (vue, pinia, rxjs, md5, ElementPlus) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  /*! Element Plus Icons Vue v2.3.2 */
  var _sfc_main118 = /* @__PURE__ */ vue.defineComponent({
    name: "FullScreen",
    __name: "full-screen",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"
        })
      ]));
    }
  }), full_screen_default = _sfc_main118;
  var _sfc_main169 = /* @__PURE__ */ vue.defineComponent({
    name: "Minus",
    __name: "minus",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"
        })
      ]));
    }
  }), minus_default = _sfc_main169;
  var _sfc_main288 = /* @__PURE__ */ vue.defineComponent({
    name: "Warning",
    __name: "warning",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768m48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0m-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32"
        })
      ]));
    }
  }), warning_default = _sfc_main288;
  var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const getScriptInfo = () => {
    return {
      name: _GM_info.script.name,
      author: _GM_info.script.author,
      namespace: _GM_info.script.namespace,
      version: _GM_info.script.version,
      description: _GM_info.script.description
    };
  };
  const CONFIG_STORAGE_KEY = "config";
  const LEGACY_CONFIG_STORAGE_KEY = "globalConfig";
  const isPlainObject = (value) => {
    return Object.prototype.toString.call(value) === "[object Object]";
  };
  const cloneLatestValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => cloneLatestValue(item));
    }
    if (isPlainObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, cloneLatestValue(item)])
      );
    }
    return value;
  };
  const getItemName = (item) => {
    if (!isPlainObject(item) || typeof item.name !== "string")
      return null;
    return item.name;
  };
  const deepMergeByLatest = (latestValue, storedValue) => {
    if (isPlainObject(latestValue)) {
      const storedObject = isPlainObject(storedValue) ? storedValue : {};
      const latestKeys = Object.keys(latestValue);
      return Object.fromEntries(
        Object.entries(storedObject).filter(([key]) => !latestKeys.includes(key)).concat(
          Object.entries(latestValue).map(([key, latestItem]) => [
            key,
            deepMergeByLatest(latestItem, storedObject[key])
          ])
        )
      );
    }
    if (Array.isArray(latestValue)) {
      if (!Array.isArray(storedValue))
        return cloneLatestValue(latestValue);
      if (!latestValue.length)
        return cloneLatestValue(storedValue);
      if (latestValue.some((item) => getItemName(item) === null))
        return cloneLatestValue(storedValue);
      const usedIndexes = /* @__PURE__ */ new Set();
      const mergedItems = latestValue.map((latestItem) => {
        const latestName = getItemName(latestItem);
        const storedIndex = storedValue.findIndex(
          (item, index) => !usedIndexes.has(index) && getItemName(item) === latestName
        );
        if (storedIndex === -1)
          return cloneLatestValue(latestItem);
        usedIndexes.add(storedIndex);
        return deepMergeByLatest(latestItem, storedValue[storedIndex]);
      });
      storedValue.forEach((storedItem, index) => {
        if (!usedIndexes.has(index))
          mergedItems.push(cloneLatestValue(storedItem));
      });
      return mergedItems;
    }
    return storedValue === void 0 ? cloneLatestValue(latestValue) : storedValue;
  };
  const LEGACY_AI_PRESET_NAMES = new Set([
    "OpenAI 官方",
    "智谱 GLM",
    "月之暗面 Kimi",
    "阿里云百炼 通义千问",
    "火山方舟 豆包",
    "硅基流动",
    "OpenRouter",
    "Google Gemini",
    "Mistral AI",
    "自定义（兼容 OpenAI 接口）",
    "Claude 官方",
    "Anthropic",
    "百度文心一言",
    "腾讯混元",
    "讯飞星火"
  ]);
  const pruneAiProviders = (providers) => {
    const presetNames = new Set(AI_PRESET_PROVIDERS.map((preset) => preset.name));
    return (Array.isArray(providers) ? providers : []).filter((provider) => {
      if (!isPlainObject(provider))
        return false;
      if (presetNames.has(provider.name))
        return true;
      if (LEGACY_AI_PRESET_NAMES.has(provider.name)) {
        console.log("[网课小助手] 已移除旧版内置预设：" + provider.name + "（如需使用请在「自定义模型」里填写）");
        return false;
      }
      if (provider.enabled)
        return true;
      return Boolean(String(provider.apiKey || "").trim() || String(provider.url || "").trim() || String(provider.model || "").trim());
    });
  };
  const migrateConfig = (storedConfig, defaultConfig) => {
    const mergedConfig = deepMergeByLatest(defaultConfig, storedConfig);
    mergedConfig.version = defaultConfig.version;
    mergedConfig.aiProviders = pruneAiProviders(mergedConfig.aiProviders);
    return mergedConfig;
  };
  const getLocalStorageConfig = () => {
    try {
      return localStorage.getItem(CONFIG_STORAGE_KEY) || "";
    } catch (error) {
      console.error(error);
      return "";
    }
  };
  const setLocalStorageConfig = (serializedConfig) => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, serializedConfig);
    } catch (error) {
      console.error(error);
    }
  };
  const getStoredConfigText = () => {
    const gmConfig = _GM_getValue(CONFIG_STORAGE_KEY);
    if (typeof gmConfig === "string" && gmConfig)
      return gmConfig;
    const localConfig = getLocalStorageConfig();
    if (localConfig)
      return localConfig;
    const legacyConfig = _GM_getValue(LEGACY_CONFIG_STORAGE_KEY);
    if (typeof legacyConfig === "string" && legacyConfig)
      return legacyConfig;
    return "";
  };
  const persistConfig = (config2) => {
    const serializedConfig = JSON.stringify(config2);
    _GM_setValue(CONFIG_STORAGE_KEY, serializedConfig);
    _GM_setValue(LEGACY_CONFIG_STORAGE_KEY, serializedConfig);
    setLocalStorageConfig(serializedConfig);
  };
  const AI_PRESET_PROVIDERS = [
    {
      name: "DeepSeek 官方",
      url: "https://api.deepseek.com/v1",
      model: "deepseek-chat",
      apiKey: "",
      enabled: false
    },
    {
      name: "自定义模型",
      url: "",
      model: "",
      apiKey: "",
      enabled: false
    }
  ];
  const AI_DEFAULT_URL_HINT = "https://api.deepseek.com/v1";
  const AI_ANSWER_TYPE_HINTS = {
    "0": "单选题，只能选一个选项",
    "1": "多选题，可能有一个或多个正确选项",
    "2": "填空题，请按题目中空的先后顺序用换行分隔作答",
    "3": "判断题，answer 只能填 A 或 B",
    "4": "简答题，请直接给出简明的参考答案",
    "5": "计算题，请先写所用公式，再代入题目给出的数值计算，最后给出结果与单位"
  };
  const AI_DEFAULT_SYSTEM_PROMPT = [
    "你是高校课程的答题助手，任务是从给定选项中选出正确答案。",
    "输出规则（务必严格遵守）：",
    "1、只输出选项字母，不要输出选项内容、解析、序号、引号或任何解释文字。",
    "2、单选题：输出一个字母，例如 A。多选题：把正确选项的字母连写，例如 ABD。",
    "3、判断题：题目会给出两个选项，按选项顺序用 A 表示第一个、B 表示第二个；",
    "   若题面明确写了“正确/错误”，则 A 对应正确、B 对应错误。",
    "4、填空题：按空位顺序输出，多个空之间用换行分隔，不要带题号。",
    "5、简答题、计算题：直接给出完整的参考答案与解题过程（写明公式、代入过程、结果与单位），",
    "   不要省略中间步骤，不要只写第一个字或只写标题；答案要能直接抄进答题框。",
    "6、先在心里逐项判断每个选项是否正确，再输出最终字母；",
    "   输出前自检：字母必须都在题目给出的选项范围内，多选不要漏掉正确项。",
    "7、不要用 ``` 代码块包裹答案，不要输出“答案：”之类的前缀。",
    "8、如果确实无法判断，输出一个问号 ?（不要瞎猜、不要输出解释）。"
  ].join("\n");
  const resolveAnswerModeFromStoredConfig = (storedConfig) => {
    const storedParams = storedConfig && storedConfig.otherParams && Array.isArray(storedConfig.otherParams.params) && storedConfig.otherParams.params.length
      ? storedConfig.otherParams.params
      : null;
    if (!storedParams)
      return "auto";
    const modeParam = storedParams.find(
      (param) => param && (param.name === "答案来源" || param.name === "答题方式" ||
        String(param.name || "").includes("第三方题库") || String(param.name || "").includes("答案来源"))
    );
    if (!modeParam)
      return "auto";
    if (modeParam.type === "boolean")
      return modeParam.value === false ? "ai" : "auto";
    if (modeParam.value === false)
      return "ai";
    if (typeof modeParam.value === "string" && ["auto", "bank", "ai", "bankFirst"].includes(modeParam.value))
      return modeParam.value;
    return "auto";
  };
  const resolveStoredBankToken = (storedConfig) => {
    var _a, _b, _c, _d, _e, _f;
    const bankToken = (_b = (_a = storedConfig == null ? void 0 : storedConfig.bankConfig) == null ? void 0 : _a.token) != null ? _b : "";
    if (String(bankToken).trim())
      return String(bankToken);
    const queryToken = (_f = (_e = (_d = (_c = storedConfig == null ? void 0 : storedConfig.queryApis) == null ? void 0 : _c[0]) == null ? void 0 : _d.token) != null ? _e : "") != null ? _f : "";
    return String(queryToken);
  };
  const resolveStoredBankEnabled = (storedConfig) => {
    var _a, _b;
    const bankConfig = (storedConfig == null ? void 0 : storedConfig.bankConfig) || {};
    const customConfig = String((_a = bankConfig.customConfig) != null ? _a : "").trim();
    const token = String((_b = bankConfig.token) != null ? _b : "").trim();
    if (typeof bankConfig.enabled === "boolean")
      return bankConfig.enabled;
    if (customConfig)
      return true;
    if (token)
      return true;
    if (storedConfig && typeof storedConfig.queryApis === "object") {
      const queryToken = ((storedConfig.queryApis || [])[0] || {}).token;
      if (String(queryToken || "").trim())
        return true;
    }
    return false;
  };
  const normalizeAnswerModeParam = (globalConfig, modeParamDefault, answerMode) => {
    const paramList = globalConfig.otherParams.params || [];
    const legacyIndex = paramList.findIndex(
      (param) => param && param.type === "boolean" && String(param.name || "").includes("第三方题库")
    );
    if (legacyIndex !== -1)
      paramList.splice(legacyIndex, 1);
    // 合并后可能同时存在「答案来源」与旧的「答题方式」，去掉旧名那个，避免出现两个下拉
    const duplicated = paramList.filter(isAnswerModeParam);
    if (duplicated.length > 1) {
      const keep = duplicated.find((param) => param.name === "答案来源") || duplicated[0];
      duplicated.forEach((param) => {
        if (param === keep)
          return;
        const index = paramList.indexOf(param);
        if (index !== -1)
          paramList.splice(index, 1);
      });
    }
    const modeParam = paramList.find(isAnswerModeParam);
    if (modeParam) {
      // 统一改名为「答案来源」，并归一化历史取值
      modeParam.name = "答案来源";
      modeParam.value = answerMode;
      modeParam.options = modeParamDefault.options;
    } else {
      paramList.push(Object.assign({}, modeParamDefault, { value: answerMode }));
    }
  };
  const readParsedStoredConfig = () => {
    const text = getStoredConfigText();
    if (!text)
      return {};
    const parsed = safeJsonParse(text, null);
    if (!isPlainObject(parsed)) {
      console.warn("[网课小助手] 本地配置无法解析，已按默认配置启动（原内容已保留，可在脚本管理器中清除）");
      return {};
    }
    return parsed;
  };
  // ============ 总开关 ============
  // 「脚本总开关」：只有它为 true 时脚本才会执行自动化操作（答题 / 播放 / 跳章节等）。
  // 关闭后脚本只保留悬浮窗，方便随时再打开。
  // 老配置里没有这个参数、或被手动删掉时，按"开启"处理，避免升级后脚本莫名不工作。
  const SCRIPT_MASTER_PARAM_NAME = "脚本总开关";
  let masterSwitchCache = null;
  const isScriptEnabled = () => {
    try {
      const paramList = useConfigStore().otherParams.params || [];
      const masterParam = paramList.find((param) => param && param.name === SCRIPT_MASTER_PARAM_NAME);
      if (!masterParam)
        return true;
      const enabled = masterParam.value !== false;
      masterSwitchCache = enabled;
      return enabled;
    } catch (error) {
      // 读不到配置（例如 pinia 未就绪）时，用上一次读到的值兜底，最后才默认开启
      return masterSwitchCache === null ? true : masterSwitchCache;
    }
  };
  // 供各处逻辑统一调用：返回 true 表示总开关已关闭，应当立即停止手上的工作
  const isScriptDisabled = () => !isScriptEnabled();
  // 兜底：万一老配置的参数数组里没有总开关（例如数组元素被改坏过），初始化时补上，
  // 保证设置页那一类目一定有开关可用
  const ensureMasterSwitchParam = (globalConfig) => {
    const paramList = (globalConfig && globalConfig.otherParams && globalConfig.otherParams.params) || [];
    if (paramList.some((param) => param && param.name === SCRIPT_MASTER_PARAM_NAME))
      return;
    paramList.push({ name: SCRIPT_MASTER_PARAM_NAME, value: true, type: "boolean" });
  };
  const useConfigStore = pinia.defineStore("configStore", {
    state: () => {
      const scriptInfo = getScriptInfo();
      const parsedStoredConfig = readParsedStoredConfig();
      const hasStoredConfig = Object.keys(parsedStoredConfig).length > 0;
      const panelAnswerMode = hasStoredConfig ? resolveAnswerModeFromStoredConfig(parsedStoredConfig) : "auto";
      const storedBankToken = hasStoredConfig ? resolveStoredBankToken(parsedStoredConfig) : "";
      const bankEnabledByDefault = hasStoredConfig ? resolveStoredBankEnabled(parsedStoredConfig) : false;
      const storedAiOptions = isPlainObject(parsedStoredConfig.aiConfig) ? parsedStoredConfig.aiConfig : {};
      const defaultConfig = {
        version: scriptInfo.version,
        isMinus: false,
        position: {
          x: "800px",
          y: "200px"
        },
        menuIndex: "0",
        platformName: "cx",
        platformParams: {
          cx: {
            name: "超星网课助手",
            parts: [
              {
                name: "章节设置",
                params: [
                  {
                    name: "章节作业自动提交",
                    value: true,
                    type: "boolean"
                  },
                  {
                    name: "是否自动下一章节",
                    value: true,
                    type: "boolean"
                  },
                  {
                    name: "只答题，不做其他",
                    value: false,
                    type: "boolean"
                  }
                ]
              },
              {
                name: "考试设置",
                params: [{
                  name: "是否自动切换",
                  value: true,
                  type: "boolean"
                }]
              }
            ]
          },
          zhs: {
            name: "智慧树网课助手",
            parts: [{
              name: "答题设置",
              params: [{
                name: "是否自动切换",
                value: true,
                type: "boolean"
              }]
            }]
          },
          unknown: {
            name: "未知平台",
            parts: [{
              name: "答题设置",
              params: [{
                name: "是否自动切换",
                value: true,
                type: "boolean"
              }]
            }]
          }
        },
        otherParams: {
          name: "其他参数",
          params: [
            {
              name: "切换、答题间隔，单位秒",
              value: 3,
              type: "number"
            },
            {
              name: "正确率达到多少自动提交",
              value: 85,
              type: "number"
            },
            {
              name: "答案相似度超过多少选择",
              value: 60,
              type: "number",
              min: 0,
              max: 100,
              step: 1
            },
            {
              name: "答案来源",
              value: panelAnswerMode,
              type: "select",
              group: "答题方式",
              options: [
                { label: "AI优先（只用 AI，不查题库）", value: "auto" },
                { label: "题库优先（题库没有再用 AI）", value: "bankFirst" }
              ]
            },
            {
              // 总开关：关闭后脚本不执行任何自动化操作（面板仍会显示，方便随时打开）
              name: SCRIPT_MASTER_PARAM_NAME,
              value: true,
              type: "boolean"
            }
          ]
        },
        queryApis: [
          {
            name: "题库",
            token: "",
            url: "http://api.tikuhai.com"
          }
        ],
        bankConfig: {
          enabled: bankEnabledByDefault,
          customConfig: "",
          token: storedBankToken,
          tidy: true,
          probeOnStartup: true
        },
        aiConfig: {
          enabled: false,
          systemPrompt: "",
          temperature: 0.2,
          timeout: 60,
          maxRetries: 2,
          verify: ["off", "ai", "all"].includes(storedAiOptions.verify) ? storedAiOptions.verify : "off",
          sendImages: storedAiOptions.sendImages !== false,
          reasoning: ["off", "auto", "provider", "custom"].includes(storedAiOptions.reasoning) ? storedAiOptions.reasoning : "off",
          reasoningParams: String(storedAiOptions.reasoningParams || ""),
          webSearch: ["off", "provider", "script"].includes(storedAiOptions.webSearch) ? storedAiOptions.webSearch : "off"
        },
        aiProviders: AI_PRESET_PROVIDERS.map((provider) => Object.assign({}, provider))
      };
      let globalConfig = defaultConfig;
      if (hasStoredConfig) {
        try {
          globalConfig = migrateConfig(parsedStoredConfig, defaultConfig);
        } catch (error) {
          console.error("[网课小助手] 配置迁移失败，已回退到默认配置", error);
          globalConfig = defaultConfig;
        }
      }
      normalizeAnswerModeParam(globalConfig, defaultConfig.otherParams.params[3], panelAnswerMode);
      ensureMasterSwitchParam(globalConfig);
      persistConfig(globalConfig);
      return globalConfig;
    },
    actions: {}
  });
  const formatDateTime = (dt) => {
    dt.getFullYear();
    dt.getMonth() + 1;
    dt.getDate();
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  const pad = (n) => {
    return n < 10 ? "0" + n : n.toString();
  };
  const getDateTime = () => {
    let now = /* @__PURE__ */ new Date();
    return formatDateTime(now);
  };
  const useLogStore = pinia.defineStore("logStore", {
    state: () => ({
      logList: []
    }),
    actions: {
      addLog(message, type) {
        try {
          if (!Array.isArray(this.logList))
            this.logList = [];
          const log = {
            message,
            time: getDateTime(),
            type
          };
          this.logList.push(log);
          if (this.logList.length > 300)
            this.logList.splice(0, this.logList.length - 300);
        } catch (error) {
          console.warn("[网课小助手] 写日志失败", error);
        }
      }
    }
  });
  const useQuestionStore = pinia.defineStore("questionStore", {
    state: () => ({
      questionList: []
    }),
    actions: {
      addQuestion(question) {
        this.questionList.push(question);
      },
      clearQuestion() {
        this.questionList = [];
      }
    }
  });
  const sleep = (second) => {
    return new Promise((resolve) => setTimeout(resolve, second * 1e3));
  };
  const createApiHeaders = (referer) => {
    const _self = _unsafeWindow;
    const getCookie = typeof _self.getCookie === "function" ? _self.getCookie.bind(_self) : () => "";
    return {
      "Content-Type": "application/json",
      "referer": referer,
      "u": _self.uid || getCookie("UID") || getCookie("_uid") || "",
      "t": Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3).toString()
    };
  };
  const withScriptInfoParams = (url2) => {
    const scriptInfo = getScriptInfo();
    return url2 + `?s=${scriptInfo.author}&v=${scriptInfo.version}`;
  };
  const handleError = (msg) => ({
    code: 10003,
    data: {
      answer: [],
      num: "",
      usenum: ""
    },
    msg
  });
  const apis = [
    "http://api.tikuhai.com/search"
  ];
  const DIAG_ID = "wksx-diagnostic-banner";
  const showDiagnostic = (message, detail) => {
    try {
      let box = document.getElementById(DIAG_ID);
      if (!box) {
        box = document.createElement("div");
        box.id = DIAG_ID;
        box.style.cssText = [
          "position:fixed", "z-index:2147483647", "left:12px", "bottom:12px", "max-width:min(560px,92vw)",
          "padding:10px 12px", "border-radius:8px", "background:#c0392b", "color:#fff",
          "font:12px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
          "box-shadow:0 6px 24px rgba(0,0,0,.35)", "white-space:pre-wrap", "word-break:break-all"
        ].join(";");
        const title = document.createElement("div");
        title.style.cssText = "font-weight:700;margin-bottom:4px";
        title.textContent = "网课小助手：悬浮窗未能显示";
        const body = document.createElement("div");
        body.textContent = String(message || "");
        const hint = document.createElement("div");
        hint.style.cssText = "margin-top:6px;opacity:.9";
        hint.textContent = "请把这段文字截图发给作者；关闭本提示后脚本仍会继续尝试运行。";
        const close = document.createElement("button");
        close.textContent = "关闭";
        close.style.cssText = "margin-top:8px;padding:2px 10px;border:0;border-radius:4px;cursor:pointer";
        close.onclick = () => box.remove();
        box.appendChild(title);
        box.appendChild(body);
        if (detail) {
          const pre = document.createElement("div");
          pre.style.cssText = "margin-top:6px;opacity:.85";
          pre.textContent = String(detail).slice(0, 500);
          box.appendChild(pre);
        }
        box.appendChild(hint);
        box.appendChild(close);
        (document.body || document.documentElement).appendChild(box);
      } else {
        box.querySelector("div:nth-child(2)").textContent = String(message || "");
      }
    } catch (error) {
      console.warn("[网课小助手] 诊断提示也无法显示", error);
    }
  };
  const stripLogHtml = (html) => {
    return String(html == null ? "" : html)
      .replace(/<img[^>]*src=["']?([^"'>\s]+)[^>]*>/gi, "[图片]")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  };
  const safeLog = (type, message) => {
    try {
      useLogStore().addLog(message, type);
    } catch (error) {
      console.warn("[网课小助手] 日志写入异常（已忽略）", error);
    }
  };
  const BANK_CONFIG_HINT = '{"name":"我的题库","url":"https://xxx/api","method":"post","type":"fetch","contentType":"json","data":{"title":"${title}","options":"${options}","type":"${type}"},"handler":"return (res) => { const d = JSON.parse(res); if (d.code === 1 && d.data) return [d.data.question, d.data.answer]; return undefined; }"}';
  const DIAG_VALUE_KEY = "diagnosticSnapshot";
  const DIAG_MAX_CHARS = 2e4;
  const describeAiProviders = (config) => {
    const list = Array.isArray(config == null ? void 0 : config.aiProviders) ? config.aiProviders : [];
    if (!list.length)
      return "（没有配置任何模型）";
    return list.map((p, i) => {
      const key = String((p == null ? void 0 : p.apiKey) || "");
      const masked = key ? `${key.slice(0, 4)}***（${key.length}位）` : "未填写";
      return `      ${i + 1}. ${p == null ? void 0 : p.name} | 启用=${p == null ? void 0 : p.enabled} | 模型=${(p == null ? void 0 : p.model) || "未填"} | 密钥=${masked} | 地址=${(p == null ? void 0 : p.url) || "未填"}`;
    }).join("\n");
  };
  const buildDiagnosticText = () => {
    const lines = [];
    const push = (s) => lines.push(s);
    const scriptInfo = getScriptInfo();
    push("========== 网课小助手 诊断报告 ==========");
    push(`生成时间：${(/* @__PURE__ */ new Date()).toLocaleString()}`);
    push(`脚本版本：${scriptInfo.version}`);
    push("");
    push("---------- 运行环境 ----------");
    try {
      push(`页面地址：${location.href}`);
      push(`页面标题：${document.title}`);
      push(`窗口尺寸：${window.innerWidth} × ${window.innerHeight}`);
      push(`浏览器：${navigator.userAgent}`);
      push(`页面可见性：${document.visibilityState || "未知"}`);
    } catch (error) {
      push(`环境信息读取失败：${error && error.message}`);
    }
    push("");
    push("---------- 关键库 ----------");
    [
      ["Vue", () => typeof Vue !== "undefined" && Vue ? Vue.version || "已加载" : "未加载"],
      ["ElementPlus", () => typeof ElementPlus !== "undefined" && ElementPlus ? "已加载" : "未加载"],
      ["Pinia", () => typeof Pinia !== "undefined" && Pinia ? "已加载" : "未加载"],
      ["rxjs", () => typeof rxjs !== "undefined" && rxjs ? "已加载" : "未加载"],
      ["md5", () => typeof md5 === "function" ? "已加载" : "未加载"],
      ["GM_xmlhttpRequest", () => typeof GM_xmlhttpRequest === "function" ? "可用" : "不可用"],
      ["GM_setClipboard", () => typeof GM_setClipboard === "function" ? "可用" : "不可用"]
    ].forEach(([name, fn]) => {
      let value = "";
      try {
        value = String(fn());
      } catch (error) {
        value = "检测失败：" + (error && error.message);
      }
      push(`  ${name}：${value}`);
    });
    let config = null;
    try {
      config = useConfigStore();
    } catch (error) {
      push(`配置读取失败：${error && error.message}`);
    }
    push("");
    push("---------- 面板状态 ----------");
    push(`  平台：${(config == null ? void 0 : config.platformName) || "未知"}`);
    push(`  折叠状态：${config == null ? void 0 : config.isMinus}`);
    push(`  面板位置：${JSON.stringify(config == null ? void 0 : config.position)}`);
    push(`  当前标签：${config == null ? void 0 : config.menuIndex}`);
    push(`  document.readyState：${document.readyState}`);
    push("");
    push("---------- 答题方式 ----------");
    const params = (config == null ? void 0 : config.otherParams) ? config.otherParams.params || [] : [];
    params.forEach((p) => {
      if (p && ["答题方式", "是否使用第三方题库", "自动提交", "正确率达到多少自动提交", "答案相似度超过多少选择"].includes(p.name))
        push(`  ${p.name}：${p.value}`);
    });
    push("");
    push("---------- AI 配置 ----------");
    if (config == null ? void 0 : config.aiConfig) {
      const a = config.aiConfig;
      push(`  AI 答题：${a.enabled ? "开启" : "关闭"}`);
      push(`  联网校验：${a.verify || "off"} | 校验联网方式：${a.webSearch || "off"}`);
      push(`  深度思考：${a.reasoning || "off"} | 思考参数：${a.reasoningParams || "（空）"}`);
      push(`  随机度：${a.temperature} | 超时：${a.timeout}s | 失败重试：${a.maxRetries}`);
    } else {
      push("  （没有 aiConfig 字段）");
    }
    push("  模型列表：");
    push(describeAiProviders(config));
    push("");
    push("---------- 题库配置 ----------");
    if (config == null ? void 0 : config.bankConfig) {
      const b = config.bankConfig;
      const custom = String(b.customConfig || "");
      push(`  题库启用：${b.enabled ? "开启" : "关闭"}`);
      push(`  内置密钥：${b.token ? `已填写（${String(b.token).length}位）` : "未填写"}`);
      push(`  自定义配置：${custom ? `已填写（${custom.length}字符）` : "未填写（用内置题库）"}`);
    } else {
      push("  （没有 bankConfig 字段）");
    }
    push("");
    push("---------- 页面结构探测 ----------");
    try {
      const iframes = document.querySelectorAll("iframe");
      push(`  iframe 数量：${iframes.length}`);
      const videos = document.querySelectorAll("video");
      const audios = document.querySelectorAll("audio");
      push(`  顶层 video/audio：${videos.length} / ${audios.length}`);
      if (iframes.length) {
        for (let i = 0; i < Math.min(iframes.length, 3); i++) {
          const frame = iframes[i];
          let inner = "无法访问（跨域）";
          try {
            const doc = frame.contentDocument;
            if (doc) {
              const v = doc.querySelectorAll("video").length;
              const a = doc.querySelectorAll("audio").length;
              const q = doc.querySelectorAll(".TiMu, .questionLi, .mark_item").length;
              inner = `video=${v} audio=${a} 题目节点=${q}`;
            }
          } catch (error) {
            inner = "跨域不可读";
          }
          push(`    iframe[${i}]：${inner}`);
        }
      }
      const host = document.querySelector("div[data-wksx-panel]") || document.querySelectorAll("div").length;
      push(`  面板宿主：${typeof host === "number" ? `已扫描 ${host} 个 div` : "找到"}`);
      push(`  页面题目节点（顶层）：${document.querySelectorAll(".TiMu, .questionLi, .mark_item").length}`);
    } catch (error) {
      push(`  探测失败：${error && error.message}`);
    }
    push("");
    push("---------- 运行日志（最近 300 条） ----------");
    const list = Array.isArray(useLogStore().logList) ? useLogStore().logList : [];
    if (!list.length) {
      push("  （还没有任何日志）");
    } else {
      list.forEach((item) => push(`  [${item.time}] ${stripLogHtml(item.message || "")}`));
    }
    push("");
    push("========== 报告结束 ==========");
    const text = lines.join("\n");
    return text.length > DIAG_MAX_CHARS ? text.slice(0, DIAG_MAX_CHARS) + "\n…（内容过长已截断）" : text;
  };
  const collectDiagnostic = () => {
    const text = buildDiagnosticText();
    try {
      GM_setValue(DIAG_VALUE_KEY, text);
    } catch (error) {
      console.warn("[网课小助手] 诊断报告保存失败", error);
    }
    useLogStore().addLog(`已生成诊断报告（${text.length} 字符）`, "success");
    return text;
  };
  const copyTextToClipboard = (text) => {
    try {
      if (typeof GM_setClipboard === "function") {
        GM_setClipboard(text);
        return true;
      }
    } catch (error) {
      console.warn("[网课小助手] GM_setClipboard 失败", error);
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      (document.body || document.documentElement).appendChild(textarea);
      textarea.select();
      const done = document.execCommand("copy");
      textarea.remove();
      return done;
    } catch (error) {
      console.warn("[网课小助手] 复制失败", error);
      return false;
    }
  };
  const safeJsonParse = (text, fallback) => {
    try {
      return JSON.parse(text);
    } catch (error) {
      console.warn("[网课小助手] JSON 解析失败", error);
      return fallback;
    }
  };
  const getQuestionOptionTexts = (question) => {
    if (Array.isArray(question.optionTextList) && question.optionTextList.length)
      return question.optionTextList.slice();
    return (question.optionsText || []).slice();
  };
  const fillPlaceholders = (template, question) => {
    const title = String(question.title || "");
    const type = String(question.type || "");
    const options = getQuestionOptionTexts(question).join("\n");
    // suggestion_* 是 AnswererWrapper 里"用于提示的同类题干/选项"，
    // 脚本没有这个数据源，填空字符串，避免把占位符原样发给题库。
    const suggestionTitle = String(question.suggestionTitle || "");
    const suggestionOptions = String(question.suggestionOptions || "");
    return String(template)
      .split("${title}").join(title)
      .split("${type}").join(type)
      .split("${options}").join(options)
      .split("${suggestion_title}").join(suggestionTitle)
      .split("${suggestion_options}").join(suggestionOptions);
  };
  const buildCustomBankData = (dataTemplate, question) => {
    const walk = (value) => {
      if (typeof value === "string")
        return fillPlaceholders(value, question);
      if (Array.isArray(value))
        return value.map((item) => walk(item));
      if (value && typeof value === "object")
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, walk(item)]));
      return value;
    };
    const out = {};
    Object.entries(dataTemplate || {}).forEach(([key, value]) => {
      out[key] = walk(value);
    });
    return out;
  };
  const buildCustomBankQuery = (baseUrl, data) => {
    const query = Object.entries(data || []).filter(([, value]) => typeof value !== "object").map(([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(String(value))).join("&");
    if (!query)
      return baseUrl;
    return baseUrl + (baseUrl.includes("?") ? "&" : "?") + query;
  };
  const runCustomBankHandler = (handlerCode, responseText, response, question) => {
    // handler 的第一个参数 res 必须是解析后的对象（AnswererWrapper 约定）
    let parsed = responseText;
    if (typeof responseText === "string") {
      const text = responseText.trim();
      if (text) {
        try {
          parsed = JSON.parse(text);
        } catch (error) {
          parsed = text;
        }
      }
    }
    const factory = new Function(
      "res",
      "question",
      "response",
      String(handlerCode || "return (res) => undefined;") + "\n//# sourceURL=answerer-wrapper-handler.js"
    );
    const answerer = factory(parsed, question || null, response);
    if (typeof answerer !== "function") {
      throw new Error("handler 没返回函数，写法应为：return (res) => …");
    }
    return answerer(parsed);
  };
  const flattenAnswerValues = (value, out) => {
    if (value === null || value === void 0)
      return out;
    if (Array.isArray(value)) {
      value.forEach((item) => flattenAnswerValues(item, out));
      return out;
    }
    if (typeof value === "object") {
      const nested = value.answer !== void 0 ? value.answer : value.data !== void 0 ? value.data : value.result;
      if (nested !== void 0)
        return flattenAnswerValues(nested, out);
      return out;
    }
    const text = String(value).trim();
    if (text)
      out.push(text);
    return out;
  };
  // 题库有时会把"没有答案"也当成一条结果返回，例如言溪：
  //   ["非常抱歉，题库没有该题的答案（ 每日持续更新中，或尝试开启题库=> AI人工智能自动搜题 ）",
  //    null,
  //    { tags: [{ text: "搜不到答案", ... }] }]
  // 这种必须识别为"未命中"，绝不能当成答案填进作答框。
  const isBankNoAnswer = (value) => {
    const text = typeof value === "string" ? value : JSON.stringify(value == null ? "" : value);
    if (!text)
      return false;
    return /搜不到答案|题库没有该题的答案|题库没有这道题的答案|没有该题的答案|每日持续更新中|找不到该题|暂无答案|未收录|no answer/i.test(text);
  };
  const looksLikeBankMeta = (value) => Boolean(
    value && typeof value === "object" && !Array.isArray(value) &&
    (value.tags !== void 0 || value.ai !== void 0 || value.similarity !== void 0 || value.source !== void 0)
  );
  const isLetterAnswer = (text) => /^[A-Za-z]{1,26}$/.test(text);
  // 选项字母（"A" / "ABD"）、或很短的文字（"正确" / "对" / "北京"），题面那种长句不算答案
  const useAnswerCandidate = (list) => list && list.length > 0 && list.length <= 26 && list.every((item) => {
    const text = String(item).trim();
    if (!text)
      return false;
    if (isLetterAnswer(text))
      return true;
    const chars = Array.from(text).length;
    return chars <= 8 && !/[。？！；、，,.;?!]/.test(text);
  });
  // 题库有时把多选答案返回成一整个字母串（"ABD"），按选项数拆成字母
  const splitLetterString = (list) => {
    if (!Array.isArray(list) || list.length !== 1)
      return list;
    const text = String(list[0] || "").trim();
    if (text.length < 2 || text.length > 6)
      return list;
    if (!/^[A-Za-z]+$/.test(text))
      return list;
    return text.toUpperCase().split("");
  };
  // 填空题(2)/简答题(4) 的答案本来就是一整段文字，不能用"短答案"的规则去卡
  const isTextAnswerType = (question) => Boolean(question && ["2", "4", "填空题", "简答题"].includes(String(question.type)));
  const parseCustomBankResult = (raw, question) => {
    if (raw === null || raw === void 0 || raw === "")
      return null;
    // 先整体判一次：题库把"没有答案"当成结果返回时，直接认为未命中
    if (isBankNoAnswer(raw))
      return null;
    const textType = isTextAnswerType(question);
    const acceptable = (list) => (textType ? list.length > 0 : useAnswerCandidate(list));
    if (!Array.isArray(raw)) {
      const single = splitLetterString(flattenAnswerValues(raw, []));
      return single.length ? single : null;
    }
    // 整体就是一个答案形状的扁平数组（如 ["A","B","D"]）→ 整体就是答案
    const whole = splitLetterString(flattenAnswerValues(raw, []));
    if (whole.length === raw.length && acceptable(whole))
      return whole;
    // 否则按 [题面, 答案, 元数据] / [答案, undefined, 元数据] 逐个元素找
    const candidates = [];
    for (const item of raw) {
      if (looksLikeBankMeta(item))
        continue;
      if (item === null || item === void 0 || item === "")
        continue;
      const list = splitLetterString(flattenAnswerValues(item, []));
      // 候选里若含"非常抱歉/搜不到答案"这类占位文字，整条丢弃
      if (list.length && list.some((entry) => isBankNoAnswer(entry)))
        continue;
      if (list.length && acceptable(list))
        candidates.push(list);
    }
    if (!candidates.length)
      return null;
    // 文本型题目：题库返回 [题面, 答案, 元数据]，题面经常比短答案还长，
    // 绝不能按“最长的那段”挑（0.9.3 之前就是这么把题面写进空里的）。
    // 先排掉“长得像题面”的候选（和题干相等、或是题干的子串），
    // 再按题库惯例取最后一条（答案排在题面之后）。
    if (textType) {
      const usable = candidates.filter((list) => !list.some((entry) => isBankNoAnswer(entry)));
      if (!usable.length)
        return null;
      const plainText = (value) => String(value == null ? "" : value).replace(/\s+/g, "");
      const titleText = plainText(question && question.title);
      const titleLike = (list) => {
        const text = plainText(list.join(""));
        if (!text)
          return true;
        if (!titleText)
          return false;
        return text === titleText || titleText.includes(text);
      };
      const answerLike = usable.filter((list) => !titleLike(list));
      const pool = answerLike.length ? answerLike : usable;
      const picked = pool[pool.length - 1];
      // 兜底还是挑到了题面本身 → 题库实际上没有给答案
      if (picked.length === 1 && titleText && plainText(picked[0]) === titleText)
        return null;
      return picked;
    }
    // 选择题：优先「纯选项字母」的候选
    const letterOnly = candidates.find((list) => list.every((item) => isLetterAnswer(String(item).trim())));
    if (letterOnly)
      return letterOnly;
    // 非字母型答案（判断题「对/错」、短文本）：答案通常在题面之后，
    // 所以从后往前找，并排除与题面完全相同的那条（那是题面，不是答案）。
    const titleText = String((question && question.title) || "").trim();
    for (let i = candidates.length - 1; i >= 0; i--) {
      const list = candidates[i];
      const text = list.map((item) => String(item).trim()).join("");
      if (titleText && text === titleText)
        continue;
      return list;
    }
    return candidates[candidates.length - 1];
  };
  const normalizeBankConfig = (raw) => {
    const source = raw && typeof raw === "object" ? raw : {};
    const config = Object.assign({}, source);
    config.name = String(source.name || "").trim() || "自定义题库";
    config.url = String(source.url || "").trim();
    config.method = String(source.method || "post").toLowerCase() === "get" ? "get" : "post";
    config.contentType = String(source.contentType || "json").toLowerCase();
    config.data = source.data && typeof source.data === "object" ? source.data : {};
    return config;
  };
  const validateCustomBankConfig = (text) => {
    const trimmed = String(text || "").trim();
    if (!trimmed)
      return { ok: false, reason: "题库配置为空" };
    if (/\\\$\{/.test(trimmed))
      return { ok: false, reason: "占位符被多余转义了：请写成 ${title}，不要写成 \\${title}" };
    const preview = () => JSON.stringify(trimmed.slice(0, 100));
    const parsed = safeJsonParse(trimmed, null);
    if (!parsed)
      return { ok: false, reason: "不是合法 JSON（检查引号与逗号，且不能写注释）｜开头：" + preview() };
    // 支持两种写法：单个对象 {…}，或对象数组 [{…},{…}]（AnswererWrapper 常见格式）
    const list = Array.isArray(parsed) ? parsed : [parsed];
    if (!list.length)
      return { ok: false, reason: "配置里没有任何题库对象" };
    if (!list.every((item) => item && typeof item === "object" && !Array.isArray(item)))
      return { ok: false, reason: "数组中每一项都必须是对象 {…}｜开头：" + preview() };
    for (const [index, item] of list.entries()) {
      const label = list.length > 1 ? `第 ${index + 1} 个题库` : "题库";
      if (!item.url)
        return { ok: false, reason: `${label}缺少 url 字段` };
      if (!/^https?:\/\//i.test(String(item.url)))
        return { ok: false, reason: `${label}的 url 必须以 http:// 或 https:// 开头` };
      if (!item.handler)
        return { ok: false, reason: `${label}缺少 handler 字段` };
      // 只做「能不能解析成一个函数」的语法检查，不用假数据真的执行它。
      // 真实 handler 往往依赖响应字段（如 res.data.question），拿假数据执行必然报错。
      try {
        const factory = new Function("return (" + String(item.handler).replace(/^\s*return\s+/, "") + ");");
        const produced = factory();
        if (typeof produced !== "function")
          return { ok: false, reason: `${label}的 handler 没有返回函数，请写成 return (res) => {...}` };
      } catch (error) {
        return { ok: false, reason: `${label}的 handler 写法有误（语法错误）：` + (error && error.message ? error.message : error) };
      }
    }
    return { ok: true, reason: "" };
  };
  const customBankHeaders = (contentType, isGet) => {
    const extra = isGet || contentType === "form"
      ? (isGet ? {} : { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" })
      : { "Content-Type": "application/json" };
    return Object.assign({ "Accept": "application/json, text/plain, */*" }, extra);
  };
  const fetchCustomBankRaw = (config, question) => {
    return new Promise((resolve) => {
      const data = buildCustomBankData(config.data, question);
      const isGet = config.method === "get";
      const url2 = isGet ? buildCustomBankQuery(config.url, data) : config.url;
      let body;
      if (!isGet) {
        body = config.contentType === "form"
          ? Object.entries(data).filter(([, value]) => typeof value !== "object").map(([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(String(value))).join("&")
          : JSON.stringify(data, (key, value) => (value === void 0 ? null : value));
      }
      let settled = false;
      const finish = (value) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(guard);
        resolve(value);
      };
      const guard = setTimeout(() => {
        safeLog("warning", `题库「${config.name}」请求无响应，已按超时处理`);
        finish({ code: 10003, error: "请求超时" });
      }, BANK_REQUEST_TIMEOUT);
      try {
        _GM_xmlhttpRequest({
          url: url2,
          method: isGet ? "GET" : "POST",
          headers: customBankHeaders(config.contentType, isGet),
          data: body,
          timeout: BANK_REQUEST_TIMEOUT,
          onload: (response) => finish({ code: 0, response, responseText: response.responseText }),
          onerror: () => finish({ code: 10003, error: "请求出错" }),
          ontimeout: () => finish({ code: 10003, error: "请求超时" }),
          onabort: () => finish({ code: 10003, error: "请求被中断" })
        });
      } catch (error) {
        finish({ code: 10003, error: "请求发出失败：" + (error && error.message ? error.message : error) });
      }
    });
  };
  const fetchCustomBankAnswer = async (config, question) => {
    const raw = await fetchCustomBankRaw(config, question);
    if (raw.code === 10003)
      return handleError(`题库「${config.name}」${raw.error}`);
    safeLog("primary", `题库「${config.name}」响应原文：${String(raw.responseText || "").slice(0, 200)}`);
    let result;
    try {
      result = runCustomBankHandler(config.handler, raw.responseText, raw.response, question);
    } catch (error) {
      safeLog("danger", `题库「${config.name}」handler 出错：${error && error.message ? error.message : error}`);
      return handleError(`题库「${config.name}」handler 出错：${error && error.message ? error.message : error}`);
    }
    try {
      safeLog("primary", `题库「${config.name}」handler 返回：${JSON.stringify(result === void 0 ? null : result).slice(0, 200)}`);
    } catch (error) {
      /* 诊断失败不影响答题 */
    }
    const answer = parseCustomBankResult(result, question);
    if (!answer || !answer.length)
      return handleError(`题库「${config.name}」没有这道题的答案`);
    return {
      code: 200,
      data: { answer, num: "", usenum: config.name },
      msg: "自定义题库"
    };
  };
  const parseCustomBankConfigList = (rawConfig) => {
    const parsed = safeJsonParse(String(rawConfig || ""), null);
    if (!parsed)
      return [];
    const list = Array.isArray(parsed) ? parsed : [parsed];
    return list.filter((item) => item && typeof item === "object" && !Array.isArray(item)).map(normalizeBankConfig);
  };
  const getCustomBankAnswer = async (question) => {
    const configStore = useConfigStore();
    const rawConfig = (configStore.bankConfig || {}).customConfig || "";
    const validation = validateCustomBankConfig(rawConfig);
    if (!validation.ok)
      return handleError(`自定义题库配置不可用：${validation.reason}`);
    const configList = parseCustomBankConfigList(rawConfig);
    if (!configList.length)
      return handleError("自定义题库配置里没有可用的题库");
    let lastMessage = "";
    for (const config of configList) {
      const result = await fetchCustomBankAnswer(config, question);
      if (result && result.code === 200)
        return result;
      lastMessage = (result && result.msg) || "无答案";
      safeLog("primary", `题库「${config.name}」未命中：${lastMessage}`);
      // 请求层面的失败（超时/报错）就没必要继续试下一个了
      if (/超时|无响应|请求出错|请求被中断|请求发出失败/.test(lastMessage))
        break;
    }
    return handleError(configList.length > 1
      ? `配置的 ${configList.length} 个题库都没有这道题（最后一条：${lastMessage}）`
      : lastMessage);
  };
  const BANK_REQUEST_TIMEOUT = 6e3;
  const getAnswerFrom = async (question, url2) => {
    var _a;
    const configStore = useConfigStore();
    const headers = createApiHeaders(question.refer);
    const data = JSON.stringify({
      "question": question.title,
      "options": question.optionsText,
      "type": question.type,
      "questionData": question.element.outerHTML,
      "workType": question.workType,
      "id": ((_a = question.refer.match(/courseId=(\d+)/)) == null ? void 0 : _a[1]) || "",
      "key": (configStore.bankConfig || {}).token || configStore.queryApis[0].token
    });
    return new Promise((resolve) => {
      let settled = false;
      const finish = (result) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(guard);
        resolve(result);
      };
      const guard = setTimeout(() => {
        safeLog("warning", "题库请求无响应，已按超时处理");
        finish(handleError(`请求超时（${BANK_REQUEST_TIMEOUT / 1e3}秒无响应）`));
      }, BANK_REQUEST_TIMEOUT);
      try {
        _GM_xmlhttpRequest({
          url: withScriptInfoParams(url2),
          method: "POST",
          headers,
          data,
          timeout: 5e3,
          onload: (response) => {
            try {
              const apiResponse = JSON.parse(response.responseText);
              finish(apiResponse);
            } catch (e) {
              finish(handleError("解析出错"));
            }
          },
          onerror: () => finish(handleError("请求出错")),
          ontimeout: () => finish(handleError("请求超时")),
          onabort: () => finish(handleError("请求被中断"))
        });
      } catch (e) {
        finish(handleError("请求发出失败：" + (e && e.message ? e.message : e)));
      }
    });
  };
  const WEB_SEARCH_PROVIDER_TIMEOUT = 12e3;
  const DUCKDUCKGO_ENDPOINT = "https://html.duckduckgo.com/html/";
  const stripSearchHtml = (html) => {
    return String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim();
  };
  const fetchWithTimeout = (url2, options, timeoutMs) => {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (value) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(guard);
        resolve(value);
      };
      const guard = setTimeout(() => finish({ ok: false, error: "请求超时" }), timeoutMs);
      const request = _GM_xmlhttpRequest({
        url: url2,
        method: (options && options.method) || "GET",
        headers: (options && options.headers) || {},
        data: options && options.data,
        timeout: timeoutMs,
        onload: (response) => finish({ ok: response.status >= 200 && response.status < 300, status: response.status, text: response.responseText || "" }),
        onerror: () => finish({ ok: false, error: "请求出错" }),
        ontimeout: () => finish({ ok: false, error: "请求超时" }),
        onabort: () => finish({ ok: false, error: "请求被中断" })
      });
      if (request && typeof request.abort === "function" && guard)
        return;
    });
  };
  const isDuckDuckGoBlocked = (text) => /anomaly|challenge|too many requests|captcha/i.test(String(text || ""));
  const duckDuckGoSearch = async (query, limit) => {
    const max = Math.max(1, Math.min(8, Number(limit) || 5));
    const url2 = `${DUCKDUCKGO_ENDPOINT}?q=${encodeURIComponent(query)}`;
    const response = await fetchWithTimeout(url2, { method: "GET" }, 12e3);
    if (!response.ok)
      throw new Error(response.error || `HTTP ${response.status}`);
    if (isDuckDuckGoBlocked(response.text))
      throw new Error("搜索被限流");
    const snippets = [];
    const blockRe = /<a[^>]+class="[^"]*result__a[^"]*"[^>]*>([\s\S]*?)<\/a>([\s\S]{0,1200}?)(?=<a[^>]+class="[^"]*result__a|<\/div>\s*<\/div>\s*<\/div>|$)/gi;
    let match;
    while ((match = blockRe.exec(response.text)) && snippets.length < max) {
      const title = stripSearchHtml(match[1]);
      const body = stripSearchHtml(match[2]).slice(0, 260);
      const line = [title, body].filter(Boolean).join(" —— ");
      if (line)
        snippets.push(line);
    }
    if (!snippets.length) {
      const fallback = stripSearchHtml(response.text).slice(0, 1200);
      if (fallback)
        snippets.push(fallback);
    }
    return snippets.slice(0, max);
  };
  const getWebSearchMode = () => {
    const configStore = useConfigStore();
    const mode = String((configStore.aiConfig || {}).webSearch || "off");
    return ["off", "provider", "script"].includes(mode) ? mode : "off";
  };
  const providerSupportsReasoning = (profile) => Boolean(profile && (profile.reasoning || profile.enableSearch));
  const buildReasoningParams = (provider) => {
    const configStore = useConfigStore();
    const aiConfig = configStore.aiConfig || {};
    const mode = String(aiConfig.reasoning || "off");
    if (mode === "off")
      return { params: {}, profile: null, note: "" };
    if (mode === "custom") {
      const custom = safeJsonParse(String(aiConfig.reasoningParams || "{}"), null);
      if (!custom || typeof custom !== "object")
        return { params: {}, profile: null, note: "深度思考参数不是合法 JSON，已忽略" };
      return { params: custom, profile: null, note: "使用自定义深度思考参数" };
    }
    const model = String(provider.model || "").toLowerCase();
    if (/reasoner|reasoning|thinking|o1|o3|o4|qwq|deepseek-r1|r1-/.test(model)) {
      return { params: {}, profile: { reasoning: true, dropTemperature: true }, note: "该模型自带深度思考（无需额外参数）" };
    }
    if (/openrouter/.test(String(provider.url || ""))) {
      const effort = mode === "provider" ? "high" : "medium";
      return { params: { reasoning: { effort } }, profile: { reasoning: true }, note: `OpenRouter 思考强度 ${effort}` };
    }
    if (/bigmodel\.cn/.test(String(provider.url || ""))) {
      return { params: { thinking: { type: "enabled" } }, profile: { reasoning: true }, note: "智谱 GLM 思考模式" };
    }
    if (/generativelanguage\.googleapis/.test(String(provider.url || ""))) {
      return { params: { reasoning_effort: "high" }, profile: { reasoning: true }, note: "Gemini 思考强度 high" };
    }
    const effort = mode === "provider" ? "high" : "medium";
    return { params: { reasoning_effort: effort }, profile: { reasoning: true }, note: `reasoning_effort=${effort}（部分模型不支持会被服务端忽略）` };
  };
  const getVerificationMode = () => {
    const configStore = useConfigStore();
    const mode = String((configStore.aiConfig || {}).verify || "off");
    return ["off", "ai", "all"].includes(mode) ? mode : "off";
  };
  const buildVerificationPrompt = (question, candidate, snippets, hasProviderSearch) => {
    const optionTexts = getQuestionOptionTexts(question);
    const lines = [];
    lines.push("请核对下面这道题的答案是否正确，必要时给出修正后的答案。");
    lines.push(`【题目】${question.title}`);
    if (optionTexts.length) {
      lines.push("【选项】");
      optionTexts.forEach((text, index) => {
        lines.push(`${String.fromCharCode(65 + index)}. ${text}`);
      });
    }
    const typeHint = AI_ANSWER_TYPE_HINTS[String(question.type)];
    if (typeHint)
      lines.push(`【题型】${typeHint}`);
    lines.push(`【待核对答案】${(Array.isArray(candidate) ? candidate : [candidate]).join(" ")}`);
    if (snippets && snippets.length) {
      lines.push("【联网检索结果】");
      snippets.forEach((snippet, index) => lines.push(`${index + 1}) ${snippet}`));
    } else if (!hasProviderSearch) {
      lines.push("【联网检索结果】（本次没有拿到检索结果，请仅凭题目与选项核对）");
    }
    lines.push("规则：如果待核对答案正确，原样输出该答案；如果不正确，输出修正后的答案。");
    lines.push("只输出选项字母（多选连写），不要输出任何解释；无法判断时输出问号 ?。");
    return lines.join("\n");
  };
  const callAiRaw = (question, provider, messages, overrides) => {
    return new Promise((resolve) => {
      const configStore = useConfigStore();
      const aiConfig = configStore.aiConfig || {};
      const url2 = buildAiAnswerUrl(provider.url);
      if (!url2)
        return resolve({ error: "接口地址为空" });
      const timeoutMs = (Number(aiConfig.timeout) || 60) * 1e3;
      let settled = false;
      const finish = (value) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(guard);
        resolve(value);
      };
      const guard = setTimeout(() => finish({ error: `无响应（超过${timeoutMs / 1e3}秒）` }), timeoutMs + 3e3);
      const body = Object.assign(
        { model: provider.model, messages, stream: false },
        overrides || {}
      );
      try {
        _GM_xmlhttpRequest({
          url: url2,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${String(provider.apiKey).trim()}`
          },
          data: JSON.stringify(body),
          timeout: timeoutMs,
          onload: (response) => {
            if (response.status < 200 || response.status >= 300) {
              return finish({ error: `HTTP ${response.status}：${String(response.responseText || "").slice(0, 160)}` });
            }
            let payload = null;
            try {
              payload = JSON.parse(response.responseText);
            } catch (error) {
              return finish({ error: "返回内容无法解析" });
            }
            if (payload && payload.error)
              return finish({ error: payload.error.message || "接口报错" });
            const content = payload && payload.choices && payload.choices[0] && payload.choices[0].message && payload.choices[0].message.content;
            if (typeof content !== "string" || !content.trim())
              return finish({ error: "未返回内容" });
            finish({ text: content, payload });
          },
          onerror: () => finish({ error: "请求失败" }),
          ontimeout: () => finish({ error: "请求超时" }),
          onabort: () => finish({ error: "请求被中断" })
        });
      } catch (error) {
        finish({ error: "请求发出失败：" + (error && error.message ? error.message : error) });
      }
    });
  };
  const runVerification = async (question, candidate, provider, usenum) => {
    const configStore = useConfigStore();
    const aiConfig = configStore.aiConfig || {};
    const isChoice = ["0", "1", "3", "单选题", "多选题", "判断题"].includes(String(question.type));
    if (!isChoice)
      return null;
    const answerList = Array.isArray(candidate) ? candidate : [candidate];
    if (!answerList.length || !answerList.every((item) => /^[A-Za-z]$/.test(String(item).trim())))
      return null;
    const searchMode = getWebSearchMode();
    const providerProfile = providerSupportsReasoning(buildReasoningParams(provider).profile) ? buildReasoningParams(provider) : null;
    let snippets = [];
    let usedProviderSearch = false;
    let searchNote = "";
    const extraParams = Object.assign({}, buildReasoningParams(provider).params);
    let effectiveSearchMode = searchMode;
    if (searchMode === "provider") {
      const model = String(provider.model || "");
      if (/openrouter/.test(String(provider.url || ""))) {
        extraParams.model = model.includes(":online") ? model : `${model}:online`;
        usedProviderSearch = true;
        searchNote = "使用 OpenRouter 内置联网";
      } else if (/dashscope/.test(String(provider.url || ""))) {
        extraParams.enable_search = true;
        extraParams.search_options = { enable_source: false, enable_citation: false };
        usedProviderSearch = true;
        searchNote = "使用通义千问内置联网";
      } else {
        // 这个服务商没有内置联网能力（例如 DeepSeek 官方）：
        // 原来会静默地"不联网"，现在自动改用脚本联网检索。
        effectiveSearchMode = "script";
        safeLog("warning", `当前模型（${getAiProviderLabel(provider)}）不支持「模型自带联网」，已自动改用脚本联网检索`);
      }
    }
    if (effectiveSearchMode === "script" && !usedProviderSearch) {
      try {
        snippets = await duckDuckGoSearch(String(question.title || "").slice(0, 120), 5);
        searchNote = snippets.length ? `联网检索到 ${snippets.length} 条结果` : "联网检索没有拿到结果";
        safeLog("primary", `校验联网：${searchNote}`);
      } catch (error) {
        searchNote = "联网检索失败：" + (error && error.message ? error.message : error);
        safeLog("warning", `校验联网失败：${error && error.message ? error.message : error}（将继续用模型自身知识核对）`);
      }
    }
    const messages = [
      { role: "system", content: "你是严谨的阅卷老师，负责核对答案。严格遵守输出格式要求。" },
      { role: "user", content: buildVerificationPrompt(question, answerList, snippets, usedProviderSearch || searchNote.indexOf("检索到") !== -1) }
    ];
    const overrides = Object.assign({ temperature: 0 }, extraParams);
    if (extraParams.model)
      overrides.model = extraParams.model;
    const result = await callAiRaw(question, provider, messages, overrides);
    if (result.error) {
      safeLog("warning", `校验未完成（${result.error}）${searchNote ? "｜" + searchNote : ""}`);
      return null;
    }
    safeLog("info", `校验原文：${JSON.stringify(String(result.text).trim().slice(0, 60))}`);
    const verified = toAnswerArray(result.text, question, provider);
    const verifiedList = Array.isArray(verified) ? verified : [verified];
    if (!verifiedList.length || !verifiedList.every((item) => /^[A-Za-z]$/.test(String(item).trim()))) {
      safeLog("warning", "校验结果无法识别，保留原答案");
      return null;
    }
    const before = answerList.map((item) => String(item).trim().toUpperCase()).join("");
    const after = verifiedList.map((item) => String(item).trim().toUpperCase()).join("");
    if (before === after) {
      safeLog("success", `校验通过：答案保持 ${after}${searchNote ? "（" + searchNote + "）" : ""}`);
      return null;
    }
    safeLog("warning", `校验改判：${before} → ${after}${searchNote ? "（" + searchNote + "）" : ""}`);
    return {
      code: 200,
      data: { answer: verifiedList, num: "", usenum: `${usenum || "答案"}（联网校验）` },
      msg: "校验改判"
    };
  };
  const buildAiAnswerUrl = (baseUrl) => {
    const url2 = String(baseUrl || "").trim().replace(/\/+$/, "");
    if (!url2)
      return "";
    if (/\/chat\/completions$/i.test(url2))
      return url2;
    if (/\/v\d+$/i.test(url2) || /\/compatible-mode\/v\d+$/i.test(url2) || /\/api\/paas\/v\d+$/i.test(url2) || /\/api\/v\d+$/i.test(url2))
      return url2 + "/chat/completions";
    return url2 + "/v1/chat/completions";
  };
  const getAiProviderLabel = (provider) => {
    return String(provider.name || "").trim() || "自定义模型";
  };
  const getActiveAiProviders = () => {
    const configStore = useConfigStore();
    return (configStore.aiProviders || []).filter(
      (provider) => provider.enabled && String(provider.apiKey || "").trim() && String(provider.url || "").trim() && String(provider.model || "").trim()
    );
  };
  const stripAiHtml = (html) => {
    return String(html || "").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim().slice(0, 1200);
  };
  const buildAiQuestionPrompt = (question, imagesSent) => {
    const lines = [];
    const typeHint = AI_ANSWER_TYPE_HINTS[String(question.type)];
    lines.push(typeHint ? `【题型】${typeHint}` : "【题型】未知，请根据题意判断");
    lines.push(`【题目】${question.title}`);
    // 诊断：把实际发给模型的内容摘要写进日志，便于排查答错原因
    try {
      const titleText = String(question.title || "");
      const optionList = Array.isArray(question.optionsText) ? question.optionsText : [];
      const usableOptions = optionList.filter((item) => String(item || "").trim()).length;
      const suspiciousText = titleText + " " + optionList.join(" ");
      const hasReplacement = /[\uFFFD]/.test(suspiciousText);
      const looksGarbled = titleText.length > 0 && !/[\u4e00-\u9fa5A-Za-z0-9]/.test(titleText);
      safeLog("primary",
        "【发给AI的内容】题型=" + String(question.type) +
        "｜题干" + titleText.length + "字" + (hasReplacement || looksGarbled ? "(疑似乱码)" : "") +
        "｜选项" + usableOptions + "/" + optionList.length + "个" +
        "\n题干：" + titleText.slice(0, 100) +
        (optionList.length ? "\n选项：" + optionList.map((t, i) => String.fromCharCode(65 + i) + "." + String(t || "").slice(0, 24)).join("  ") : ""));
    } catch (error) {
      /* 诊断失败不影响答题 */
    }
    // 题目里的“今天/今年/当前”这类相对时间，必须给模型一个基准日期，否则会算错。
    try {
      const now = /* @__PURE__ */ new Date();
      const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][now.getDay()] || "";
      lines.push(`【当前日期】${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${weekday}（涉及“今天/今年/现在”时以此为准）`);
    } catch (error) {
      /* 取不到日期就不写 */
    }
    if (question.optionsText && question.optionsText.length) {
      lines.push("【选项】");
      question.optionsText.forEach((optionText, index) => {
        const letter = index < 26 ? String.fromCharCode(65 + index) : `选项${index + 1}`;
        lines.push(`${letter}. ${optionText}`);
      });
    }
    const htmlText = question.element && question.element.outerHTML ? stripAiHtml(question.element.outerHTML) : "";
    // The HTML dump repeats the options verbatim, which makes the model answer with option
    // text instead of letters — strip every option string out of it first.
    let supplement = htmlText;
    (question.optionsText || []).forEach((optionText) => {
      const text = String(optionText || "").trim();
      if (text)
        supplement = supplement.split(text).join(" ");
    });
    supplement = supplement.replace(/\s+/g, " ").trim();
    if (supplement && supplement.length > String(question.title || "").length + 10) {
      lines.push(`【题干补充】${supplement.slice(0, 600)}`);
    }
    // 题干里的图片（常含公式、常数、电路图）模型看不到内容，
    // 至少把地址列出来，并在提示里说明"图片内容不可见"，避免它凭空编造数值。
    const images = [...new Set((Array.isArray(question.images) ? question.images : [])
      .map((url) => String(url || "").trim())
      .filter((url) => /^https?:\/\//i.test(url)))].slice(0, 6);
    if (images.length) {
      lines.push(`【本题含 ${images.length} 张图片】`);
      if (imagesSent) {
        // 图片已经作为多模态内容发给模型了，让它真的去看图
        lines.push("图片已随本条消息一起提供，请直接查看图片内容（公式、常数、电路图、表格等），把图里的数据用上再作答。如果图片看不清，就按题意给出完整解法，不要编造具体数值。");
      } else {
        lines.push("说明：本次没有把图片发给模型，图片内容无法读取。若题目所需数值只存在于图片中，请明确说明缺少哪些数据，并给出通用的计算思路与公式，不要编造具体数值。");
      }
    }
    return lines.join("\n");
  };
  const isSingleChoiceHint = (type) => type === "0" || type === "单选题";
  const toAnswerArray = (content, question, provider) => {
    let text = String(content || "").trim();
    if (!text)
      return [];
    text = text.replace(/```[a-zA-Z]*/g, "").replace(/```/g, "").trim();
    text = text.replace(/^(答案|正确答案|答|Answer)\s*[:：]\s*/i, "").trim();
    text = text.replace(/^[*\-•]\s*/, "").replace(/^["'“”‘’]+|["'“”‘’]+$/g, "").trim();
    const type = String(question.type);
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (["0", "1", "3", "单选题", "多选题", "判断题"].includes(type)) {
      const optionCount = question.optionsText && question.optionsText.length ? question.optionsText.length : 26;
      const collectLetters = (raw) => {
        const single = raw.match(/^\(?\s*([A-Za-z])\s*\)?[.、,:：]?$/);
        if (single)
          return [single[1].toUpperCase()];
        if (/^[A-Za-z]{1,26}$/.test(raw))
          return raw.toUpperCase().split("");
        return [...new Set((raw.toUpperCase().match(/[A-Z]/g) || []))];
      };
      let letters = collectLetters(text).filter((letter) => {
        const index = letter.charCodeAt(0) - 65;
        return index >= 0 && index < optionCount;
      });
      if (type === "3" || type === "判断题") {
        if (/(正确|对|是|√|true|right)/i.test(text))
          letters = ["A"];
        else if (/(错误|错|否|×|false|wrong)/i.test(text))
          letters = ["B"];
      }
      letters = [...new Set(letters)];
      if (letters.length) {
        if (isSingleChoiceHint(type) && letters.length > 1)
          return [letters[0]];
        return letters.slice(0, Math.max(optionCount, 1));
      }
      const unsure = /不确定|无法确定|不好说|无法判断|不知道|^\s*[?？]\s*$/.test(text);
      console.warn("[AI答题] 答案无法识别", unsure ? "(模型表示不确定)" : "", getAiProviderLabel(provider), JSON.stringify(text.slice(0, 80)));
      return [];
    }
    if (type === "2" || type === "填空题") {
      const blanks = lines.length ? lines : [text];
      return blanks.map((line) => line.replace(/^\d+\s*[、.．)]\s*/, "").trim()).filter(Boolean);
    }
    // 简答 / 计算题：整段文本都要保留（保留换行），只有极端超长才截断，
    // 否则会把解题过程截掉，用户看到的就是残缺答案。
    if (lines.length > 1) {
      const joined = lines.join("\n");
      return joined.length > 4e3 ? joined.slice(0, 4e3) : joined;
    }
    return text.length > 4e3 ? text.slice(0, 4e3) : text;
  };
  const parseAiResponse = (responseText, question, provider) => {
    var _a, _b, _c, _d;
    let payload = null;
    try {
      payload = JSON.parse(responseText);
    } catch (e) {
      return handleError(`AI返回内容无法解析（${getAiProviderLabel(provider)}）`);
    }
    if (payload == null ? void 0 : payload.error) {
      return handleError(`AI接口报错（${getAiProviderLabel(provider)}）：${payload.error.message || payload.error.code || "未知错误"}`);
    }
    const content = (_b = (_a = payload == null ? void 0 : payload.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message;
    const text = content == null ? void 0 : content.content;
    if (typeof text === "string" && text.trim())
      safeLog("info", `AI 原始返回：${JSON.stringify(text.trim().slice(0, 80))}`);
    if (typeof text !== "string" || !text.trim()) {
      const finishReason = (_d = (_c = payload == null ? void 0 : payload.choices) == null ? void 0 : _c[0]) == null ? void 0 : _d.finish_reason;
      return handleError(`AI未返回答案（${getAiProviderLabel(provider)}）${finishReason ? `，finish_reason=${finishReason}` : ""}`);
    }
    const answer = toAnswerArray(text, question, provider);
    if (!answer || answer.length === 0) {
      safeLog("warning",
        `AI 答案解析失败：原文=${JSON.stringify(String(text).slice(0, 60))}、题型=${question.type}、选项数=${(question.optionsText || []).length}`);
      return handleError(`AI答案格式无法识别（${getAiProviderLabel(provider)}）：${text.slice(0, 60)}`);
    }
    return {
      code: 200,
      data: {
        answer,
        num: provider.model || "",
        usenum: getAiProviderLabel(provider)
      },
      msg: "AI答题"
    };
  };
  // 把题干与题目图片组装成一条 user 消息。
  // 有图片时用 OpenAI 的"内容块数组"格式（DeepSeek 等兼容此格式）；
  // 没有图片时保持纯字符串，避免影响不支持多模态的服务商。
  const buildAiUserContent = (question, images) => {
    const list = (Array.isArray(images) ? images : []).filter((url) => typeof url === "string" && /^https?:\/\//i.test(url));
    const text = buildAiQuestionPrompt(question, list.length > 0);
    if (!list.length)
      return text;
    const blocks = [{ type: "text", text }];
    list.slice(0, 6).forEach((url) => {
      blocks.push({ type: "image_url", image_url: { url } });
    });
    return blocks;
  };
  const requestAiAnswer = (question, provider) => {
    return new Promise((resolve) => {
      const configStore = useConfigStore();
      const aiConfig = configStore.aiConfig || {};
      const url2 = buildAiAnswerUrl(provider.url);
      if (!url2)
        return resolve(handleError(`AI接口地址为空（${getAiProviderLabel(provider)}）`));
      const systemPrompt = (aiConfig.systemPrompt || "").trim() || AI_DEFAULT_SYSTEM_PROMPT;
      const timeoutMs = (Number(aiConfig.timeout) || 60) * 1e3;
      const reasoning = buildReasoningParams(provider);
      if (reasoning.note)
        safeLog("primary", `深度思考：${reasoning.note}`);
      // 是否把题目图片一起发给模型（默认开；模型不支持时自动关闭）
      let retriedWithoutImages = false;
      const imagesOn = aiConfig.sendImages !== false;
      const questionImages = imagesOn && Array.isArray(question.images) ? question.images : [];
      const userContent = buildAiUserContent(question, questionImages);
      if (questionImages.length)
        safeLog("primary", `已附带 ${questionImages.length} 张题目图片（模型可直接看图）`);
      let settled = false;
      const finish = (result) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(guard);
        resolve(result);
      };
      const guard = setTimeout(() => {
        safeLog("warning", `AI接口${timeoutMs / 1e3}秒无响应，已放弃本次请求`);
        finish(handleError(`AI接口无响应（${getAiProviderLabel(provider)}，超过${timeoutMs / 1e3}秒）`));
      }, timeoutMs + 3e3);
      try {
        _GM_xmlhttpRequest({
          url: url2,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${String(provider.apiKey).trim()}`
          },
          data: JSON.stringify(Object.assign(
            {
              model: provider.model,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent }
              ],
              stream: false
            },
            reasoning.profile && reasoning.profile.dropTemperature
              ? {}
              : { temperature: typeof aiConfig.temperature === "number" ? aiConfig.temperature : 0.2 },
            reasoning.params.temperature !== void 0 ? { temperature: reasoning.params.temperature } : {},
            reasoning.params,
            reasoning.profile && reasoning.profile.enableSearch ? { enable_search: true } : {}
          )),
          timeout: timeoutMs,
          onload: (response) => {
            if (response.status < 200 || response.status >= 300) {
              const detail = String(response.responseText || "").slice(0, 160);
              // 带上图片时若报错（多为模型不支持视觉），自动关掉发图并重试一次纯文本
              if (questionImages.length && !retriedWithoutImages) {
                retriedWithoutImages = true;
                const list = useConfigStore().aiConfig;
                list.sendImages = false;
                safeLog("warning", `该模型不接受图片输入（HTTP ${response.status}），已自动关闭「题目发图」并改用纯文本重试`);
                return requestAiAnswer(question, provider).then(finish);
              }
              return finish(handleError(`AI接口HTTP ${response.status}（${getAiProviderLabel(provider)}）：${detail}`));
            }
            finish(parseAiResponse(response.responseText, question, provider));
          },
          onerror: () => finish(handleError(`AI接口请求失败（${getAiProviderLabel(provider)}）`)),
          ontimeout: () => finish(handleError(`AI接口请求超时（${getAiProviderLabel(provider)}），可在设置里加大超时时间`)),
          onabort: () => finish(handleError(`AI接口请求被中断（${getAiProviderLabel(provider)}）`))
        });
      } catch (e) {
        finish(handleError(`AI接口请求发出失败（${getAiProviderLabel(provider)}）：${e && e.message ? e.message : e}`));
      }
    });
  };
  const getAiAnswer = async (question) => {
    const configStore = useConfigStore();
    const logStore = useLogStore();
    const aiConfig = configStore.aiConfig || {};
    const providers = getActiveAiProviders();
    if (!providers.length) {
      return handleError("AI答题已开启，但没有可用模型：请在【设置】里填写密钥并勾选启用");
    }
    const retryTimes = Math.max(0, Number(aiConfig.maxRetries) || 0);
    let lastError = null;
    for (let attempt = 0; attempt <= retryTimes; attempt++) {
      for (const provider of providers) {
        const result = await requestAiAnswer(question, provider);
        if (result.code === 200) {
          safeLog("success", `AI答题成功：${getAiProviderLabel(provider)} / ${provider.model}`);
          return result;
        }
        lastError = result;
        safeLog("warning", result.msg);
      }
      if (attempt < retryTimes) {
        safeLog("warning", `AI请求失败，${configStore.otherParams.params[0].value}秒后重试（第${attempt + 1}次）`);
        await sleep(configStore.otherParams.params[0].value);
      }
    }
    return lastError || handleError("AI答题失败");
  };
  const ANSWER_MODE_AUTO = "auto";
  const ANSWER_MODE_BANK_FIRST = "bankFirst";
  // 历史值：bank=仅用题库、ai=仅用AI、旧 auto=AI优先
  const LEGACY_ANSWER_MODE_MAP = { bank: "bankFirst", ai: "auto" };
  const isValidAnswerMode = (value) => ["auto", "bankFirst", "bank", "ai"].includes(value);
  const normalizeAnswerMode = (value) => {
    if (value === ANSWER_MODE_BANK_FIRST)
      return ANSWER_MODE_BANK_FIRST;
    if (value === ANSWER_MODE_AUTO)
      return ANSWER_MODE_AUTO;
    if (LEGACY_ANSWER_MODE_MAP[value])
      return LEGACY_ANSWER_MODE_MAP[value];
    return ANSWER_MODE_AUTO;
  };
  const isAnswerModeParam = (param) => Boolean(
    param && (param.name === "答题方式" || param.name === "答案来源" ||
      String(param.name || "").includes("第三方题库") ||
      String(param.name || "").includes("答案来源"))
  );
  const getConfiguredAnswerMode = (configStore) => {
    const modeParam = (configStore.otherParams.params || []).find(isAnswerModeParam);
    return normalizeAnswerMode(modeParam ? modeParam.value : ANSWER_MODE_AUTO);
  };
  const isBankEnabled = (configStore) => {
    const bankConfig = configStore.bankConfig || {};
    return bankConfig.enabled !== false;
  };
  const runBankQueries = async (question) => {
    const configStore = useConfigStore();
    const bankConfig = configStore.bankConfig || {};
    if (String(bankConfig.customConfig || "").trim()) {
      const customResult = await getCustomBankAnswer(question);
      if (customResult.code === 200)
        return customResult;
      return { code: 10003, missed: true, msg: customResult.msg };
    }
    let lastMessage = "";
    for (const url2 of apis) {
      const result = await getAnswerFrom(question, url2);
      const answer = result && result.data && result.data.answer;
      if (isBankNoAnswer(answer))
        return { code: 10003, missed: true, msg: "题库没有这道题" };
      if (result.code === 200 && Array.isArray(answer) && answer.length) {
        return Object.assign({}, result, { usenum: "第三方题库" });
      }
      lastMessage = result.msg || "无答案";
      if (/超时|无响应|请求出错|请求被中断/.test(lastMessage)) {
        return { code: 10003, unreachable: true, msg: lastMessage };
      }
      return { code: 10003, missed: true, msg: lastMessage };
    }
    return { code: 10003, unreachable: true, msg: lastMessage || "题库请求失败" };
  };
  // 探测用的题目：内置题库是真去搜题的，所以给一道常见的真题
  const BANK_PROBE_QUESTION = {
    title: "中国的首都是哪座城市？",
    optionsText: ["北京", "上海", "广州", "深圳"],
    optionTextList: ["北京", "上海", "广州", "深圳"],
    type: "0",
    workType: "zj",
    element: { outerHTML: "<div>中国的首都是哪座城市？</div>" },
    refer: "https://mooc1.chaoxing.com/"
  };
  let bankProbeRan = false;
  const probeBankAvailability = async (options) => {
    const opts = options || {};
    const configStore = useConfigStore();
    const bankConfig = configStore.bankConfig || {};
    const customText = String(bankConfig.customConfig || "").trim();
    const token = String(bankConfig.token || "").trim();
    const isCustom = Boolean(customText);
    const sourceName = isCustom ? "自定义题库" : "内置题库（api.tikuhai.com）";
    const fail = (reason) => {
      if (opts.log) {
        safeLog("danger", `题库检测不通过（${sourceName}）：${reason}`);
      }
      return { ok: false, source: sourceName, reason };
    };
    if (isCustom) {
      const validation = validateCustomBankConfig(customText);
      if (!validation.ok) {
        return fail("配置有问题：" + validation.reason);
      }
      const count = parseCustomBankConfigList(customText).length;
      if (count > 1) {
        safeLog("primary", `检测到 ${count} 个自定义题库，将依次尝试`);
      }
    } else if (!token) {
      return fail("没有填写内置题库密钥");
    }
    // 自定义题库直接走自定义通道；内置题库才用 runBankQueries（它会按配置自动分流）
    let result;
    try {
      result = isCustom
        ? await getCustomBankAnswer(BANK_PROBE_QUESTION)
        : await runBankQueries(BANK_PROBE_QUESTION);
    } catch (error) {
      return fail("请求异常：" + (error && error.message ? error.message : error));
    }
    if (result && result.code === 200 && result.data && Array.isArray(result.data.answer) && result.data.answer.length) {
      const answerText = result.data.answer.map((item) => String(item)).join(" / ");
      if (opts.log) {
        safeLog("success", `题库可用（${sourceName}），示例题返回答案：${answerText}`);
      }
      return { ok: true, source: sourceName, answer: result.data.answer, answerText };
    }
    return fail((result && result.msg) || "题库没有返回可用答案");
  };
  const resetBankProbeFlag = () => {
    bankProbeRan = false;
  };
  const checkBankOnStartup = async () => {
    if (bankProbeRan)
      return;
    bankProbeRan = true;
    const configStore = useConfigStore();
    const startupBankConfig = configStore.bankConfig || {};
    if (startupBankConfig.probeOnStartup === false) {
      safeLog("primary", "已关闭题库自动检测（可在【设置 → 题库设置】里开启），需要时点「检测题库可用」");
      return;
    }
    if (!isBankEnabled(configStore)) {
      safeLog("primary", "题库未启用，跳过题库检测（可在【设置】里开启）");
      return;
    }
    safeLog("primary", "正在检测题库是否可用…");
    await probeBankAvailability({ log: true });
  };
  // ---- 模型准确率自测：内置一批有标准答案的题，按当前配置真实请求，统计准确率 ----
  const AI_EVAL_QUESTIONS = [
    { type: "0", title: "中国的首都是哪座城市？", optionsText: ["北京", "上海", "广州", "深圳"], answer: "A" },
    { type: "0", title: "1 + 1 等于多少？", optionsText: ["1", "2", "3", "4"], answer: "B" },
    { type: "0", title: "水的化学式是什么？", optionsText: ["CO2", "H2O", "O2", "NaCl"], answer: "B" },
    { type: "0", title: "一年有多少个月？", optionsText: ["10", "11", "12", "13"], answer: "C" },
    { type: "0", title: "太阳从哪个方向升起？", optionsText: ["东", "南", "西", "北"], answer: "A" },
    { type: "0", title: "光在真空中的传播速度约为多少？", optionsText: ["3×10^5 km/s", "3×10^3 km/s", "3×10^8 km/s", "3×10^2 km/s"], answer: "A" },
    { type: "0", title: "中华人民共和国的成立年份是？", optionsText: ["1945 年", "1949 年", "1951 年", "1978 年"], answer: "B" },
    { type: "0", title: "下列哪个不是编程语言？", optionsText: ["Python", "Java", "HTML", "C++"], answer: "C" },
    { type: "0", title: "人体最大的器官是？", optionsText: ["心脏", "肝脏", "皮肤", "肺"], answer: "C" },
    { type: "0", title: "地球绕太阳一周大约需要多久？", optionsText: ["24 小时", "30 天", "365 天", "10 年"], answer: "C" },
    { type: "1", title: "下列哪些是偶数？（多选）", optionsText: ["1", "2", "3", "4"], answer: "BD" },
    { type: "1", title: "下列哪些属于水果？（多选）", optionsText: ["苹果", "白菜", "香蕉", "土豆"], answer: "AC" },
    { type: "3", title: "地球是圆的。", optionsText: ["正确", "错误"], answer: "A" },
    { type: "3", title: "太阳围绕地球转。", optionsText: ["正确", "错误"], answer: "B" },
    { type: "2", title: "中国的首都是____。", optionsText: [], answer: "北京" }
  ];
  const runAiSelfTest = async (onProgress) => {
    const configStore = useConfigStore();
    const providers = getActiveAiProviders();
    const report = (message) => {
      if (typeof onProgress === "function") {
        try {
          onProgress(message);
        } catch (error) {
          /* 忽略回调异常 */
        }
      }
    };
    if (!providers.length) {
      safeLog("danger", "模型自测无法开始：没有可用的 AI 模型（请启用一个供应商并填好密钥）");
      return { total: 0, correct: 0, items: [], error: "没有可用的 AI 模型" };
    }
    const provider = providers[0];
    safeLog("primary", `开始模型自测：${getAiProviderLabel(provider)} / ${provider.model}，共 ${AI_EVAL_QUESTIONS.length} 题`);
    const items = [];
    let correct = 0;
    for (const [index, item] of AI_EVAL_QUESTIONS.entries()) {
      const question = {
        title: item.title,
        type: item.type,
        optionsText: item.optionsText,
        optionTextList: item.optionsText.slice(),
        element: { outerHTML: `<div>${item.title}</div>` },
        refer: "https://mooc1.chaoxing.com/",
        workType: "zj",
        answer: []
      };
      report(`第 ${index + 1}/${AI_EVAL_QUESTIONS.length} 题…`);
      let result;
      try {
        result = await requestAiAnswer(question, provider);
      } catch (error) {
        result = { code: 0, msg: "请求异常：" + (error && error.message ? error.message : error) };
      }
      const got = result && result.code === 200 && result.data && Array.isArray(result.data.answer)
        ? result.data.answer.map((x) => String(x).trim().toUpperCase()).join("")
        : "";
      const expect = String(item.answer).trim().toUpperCase();
      const isFill = item.type === "2";
      const pass = isFill
        ? got.replace(/\s+/g, "").includes(expect)
        : got !== "" && got.split("").sort().join("") === expect.split("").sort().join("");
      if (pass)
        correct += 1;
      items.push({ title: item.title, type: item.type, expect, got, pass, msg: result && result.msg });
      safeLog(pass ? "success" : "danger",
        `自测第${index + 1}题 ${pass ? "正确" : "错误"}：期望 ${expect}，实际 ${got || "（无）"}`);
      await sleep(0.4);
    }
    const rate = AI_EVAL_QUESTIONS.length ? Math.round(correct / AI_EVAL_QUESTIONS.length * 100) : 0;
    safeLog(rate >= 80 ? "success" : "warning",
      `模型自测结束：答对 ${correct}/${AI_EVAL_QUESTIONS.length}，准确率 ${rate}%（模型：${provider.model}）`);
    return { total: AI_EVAL_QUESTIONS.length, correct, rate, items, model: provider.model, label: getAiProviderLabel(provider) };
  };
  const getAnswer = async (question) => {
    // 总开关的双保险：即使某条流程漏了判断，也不会继续去查题库 / 问 AI
    if (isScriptDisabled())
      return handleError("「脚本总开关」已关闭，已停止答题（可在【设置】→「其他参数」里打开）");
    const configStore = useConfigStore();
    const answerMode = getConfiguredAnswerMode(configStore);
    const bankEnabled = isBankEnabled(configStore);
    const aiConfig = configStore.aiConfig || {};
    const aiEnabled = aiConfig.enabled === true;
    if (answerMode === ANSWER_MODE_AUTO && !aiEnabled) {
      return handleError("答案来源已设为“AI优先”，但 AI 总开关没打开：请在【设置】里开启");
    }
    if (answerMode === ANSWER_MODE_BANK_FIRST && !bankEnabled && !aiEnabled) {
      return handleError("答案来源为“题库优先”，但题库与 AI 都未开启：请至少开启一个");
    }
    const askAi = (reason) => {
      if (reason)
        safeLog("warning", reason);
      return getAiAnswer(question);
    };
    const askBank = async (reason) => {
      if (reason)
        safeLog("warning", reason);
      const bankResult = await runBankQueries(question);
      if (bankResult.code === 200) {
        safeLog("success", `题库命中答案（${bankResult.usenum || "题库"}）`);
        return bankResult;
      }
      return bankResult;
    };
    const maybeVerify = async (result2) => {
      if (!result2 || result2.code !== 200 || !result2.data || !result2.data.answer) {
        safeLog("primary", "校验跳过：本次没有可核对的答案");
        return result2;
      }
      const verifyMode = getVerificationMode();
      if (verifyMode === "off") {
        safeLog("primary", "校验跳过：设置在【设置 → AI 答题】里是「关闭」，想联网核对请改为「AI 与题库都校验」");
        return result2;
      }
      const provider = getActiveAiProviders()[0];
      if (!provider) {
        safeLog("warning", "校验已开启，但没有可用的 AI 模型（需要启用一个供应商）");
        return result2;
      }
      const source = result2.data.usenum || "题库";
      if (verifyMode === "ai" && source.indexOf("AI") === -1 && source.indexOf("DeepSeek") === -1) {
        safeLog("primary", `校验跳过：当前是「仅校验 AI 答案」，而这次答案来自「${source}」；想连题库答案一起核对请改成「AI 与题库都校验」`);
        return result2;
      }
      safeLog("primary", `正在校验答案（来源：${source}）…`);
      const corrected = await runVerification(question, result2.data.answer, provider, source);
      return corrected || result2;
    };
    if (answerMode === ANSWER_MODE_AUTO) {
      // AI优先：只用 AI，不查题库
      return maybeVerify(await askAi(""));
    }
    if (answerMode === ANSWER_MODE_BANK_FIRST) {
      // 题库优先：先查题库，命中就用（开启校验时交给 AI 核对）；没有再用 AI
      if (bankEnabled) {
        const firstBank = await askBank("");
        if (firstBank.code === 200) {
          safeLog("primary", "答案来源：题库优先，命中题库（校验开启时由 AI 核对）");
          return maybeVerify(firstBank);
        }
        safeLog("warning", "题库没有这道题" + (aiEnabled ? "，改用 AI 作答" : "，且 AI 未开启"));
        if (!aiEnabled)
          return handleError("题库里没有这道题，且 AI 未开启：请在【设置】里开启 AI 或改用「AI优先」");
      } else {
        safeLog("warning", "题库已关闭（答案来源为题库优先），直接使用 AI 作答");
      }
      return maybeVerify(await askAi(""));
    }
    return handleError("答案来源取值异常，请到【设置】里重新选择");
  };
  const AI_TEST_QUESTION = {
    title: "中国的首都是哪座城市？",
    optionsText: ["北京", "上海", "广州", "深圳"],
    type: "0",
    element: null
  };
  const getAiFeedbackMessage = (result) => {
    if (result.code === 200) {
      const suffix = result.data && result.data.num ? `（模型：${result.data.num}）` : "";
      return `连接成功${suffix}，返回答案：${(result.data.answer || []).join(" ")}`;
    }
    return `连接失败：${result.msg || "未知错误"}`;
  };
  const _hoisted_1$4 = { class: "setting" };
  const _hoisted_2$4 = { class: "setting-section-title" };
  const _hoisted_3$3 = { class: "setting-section-title" };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      globalConfig: {}
    },
    setup(__props) {
      const configStore = useConfigStore();
      const keyVisibleMap = vue.ref({});
      const testingName = vue.ref("");
      const testFeedbackMap = vue.ref({});
      const bankFeedback = vue.ref("");
      const bankProbeFeedback = vue.ref("");
      const aiTestFeedback = vue.ref("");
      const aiTestRate = vue.ref(null);
      const aiTestRunning = vue.ref(false);
      const handleAiSelfTest = async () => {
        if (aiTestRunning.value)
          return;
        aiTestRunning.value = true;
        aiTestRate.value = null;
        aiTestFeedback.value = `正在自测（${AI_EVAL_QUESTIONS.length} 题，约需 30-60 秒）…`;
        try {
          const report = await runAiSelfTest((msg) => {
            aiTestFeedback.value = "模型自测中：" + msg;
          });
          if (report.error) {
            aiTestFeedback.value = "自测无法开始：" + report.error;
            return;
          }
          aiTestRate.value = report.rate;
          const wrongCount = (report.items || []).filter((it) => !it.pass).length;
          // 错题明细只记进日志，面板上只显示一行结论，避免把面板撑得过长
          aiTestFeedback.value = `准确率 ${report.rate}%（${report.correct}/${report.total}）· 模型 ${report.model}` +
            (wrongCount ? ` · 答错 ${wrongCount} 题（明细见日志）` : "");
        } catch (error) {
          aiTestFeedback.value = "自测出错：" + (error && error.message ? error.message : error);
        } finally {
          aiTestRunning.value = false;
        }
      };
      const bankProbeOk = vue.ref(null);
      const handleProbeBank = async () => {
        bankProbeFeedback.value = "正在检测题库…";
        bankProbeOk.value = null;
        let report;
        try {
          report = await probeBankAvailability();
        } catch (error) {
          report = { ok: false, source: "题库", reason: "检测异常：" + (error && error.message ? error.message : error) };
        }
        bankProbeOk.value = report.ok;
        bankProbeFeedback.value = report.ok
          ? `题库可用 · ${report.source} · 示例题返回答案：${report.answerText}`
          : `题库不可用 · ${report.source} · ${report.reason}`;
        // 和「测试AI」一样直接弹结果，不用到日志/小字里找
        if (report.ok) {
          vue.ElMessage.success(`题库可用（${report.source}），示例题返回答案：${report.answerText}`);
        } else {
          vue.ElMessage.error(`题库不可用（${report.source}）：${report.reason}`);
        }
        safeLog(report.ok ? "success" : "danger", "题库检测：" + bankProbeFeedback.value);
      };
      const diagnosticCaptured = vue.ref("");
      const diagnosticFeedback = vue.ref("");
      // 一键抓取 + 自动复制，一步完成（设置页保持原样；日志页已改成手动点「复制」）
      const handleCaptureDiagnostic = async () => {
        try {
          const text = collectDiagnostic();
          diagnosticCaptured.value = text;
          const done = copyTextToClipboard(text);
          safeLog(done ? "success" : "warning",
            done ? "诊断报告已复制到剪贴板" : "诊断报告自动复制失败，请用下方文本框手动复制");
          diagnosticFeedback.value = done
            ? `已抓取并复制 ${text.length} 字符，直接粘贴给作者即可；下方文本框也可手动全选复制`
            : `已抓取 ${text.length} 字符（自动复制没成功，请用下方文本框手动全选复制）`;
        } catch (error) {
          diagnosticFeedback.value = "抓取失败：" + (error && error.message ? error.message : error);
        }
      };

      const bankConfig = configStore.bankConfig;
      const aiConfig = configStore.aiConfig;
      const aiProviders = configStore.aiProviders;
      const viewportWidth = vue.ref(window.innerWidth || 0);
      let resizeRaf = 0;
      const syncViewportWidth = () => {
        if (resizeRaf)
          return;
        resizeRaf = window.requestAnimationFrame(() => {
          resizeRaf = 0;
          viewportWidth.value = window.innerWidth || 0;
        });
      };
      vue.onMounted(() => {
        window.addEventListener("resize", syncViewportWidth);
      });
      vue.onUnmounted(() => {
        window.removeEventListener("resize", syncViewportWidth);
        if (resizeRaf)
          window.cancelAnimationFrame(resizeRaf);
      });
      const toggleKeyVisible = (provider) => {
        keyVisibleMap.value[provider.name] = !keyVisibleMap.value[provider.name];
      };
      const handleTestBank = async () => {
        const validation = validateCustomBankConfig(bankConfig.customConfig);
        if (!validation.ok) {
          bankFeedback.value = "配置有问题：" + validation.reason;
          vue.ElMessage.warning(validation.reason);
          return;
        }
        bankFeedback.value = "正在测试题库…";
        const result = await getCustomBankAnswer(AI_TEST_QUESTION);
        if (result.code === 200) {
          bankFeedback.value = `题库可用，返回答案：${(result.data.answer || []).join(" / ")}`;
          vue.ElMessage.success("题库连接成功");
        } else {
          bankFeedback.value = "题库测试失败：" + result.msg;
          vue.ElMessage.error(result.msg || "题库测试失败");
        }
      };
      const handleTestAi = async (provider) => {
        if (testingName.value)
          return;
        if (!String(provider.url || "").trim()) {
          vue.ElMessage.warning("请先填写接口地址");
          return;
        }
        if (!String(provider.apiKey || "").trim()) {
          vue.ElMessage.warning("请先填写 API 密钥");
          return;
        }
        if (!String(provider.model || "").trim()) {
          vue.ElMessage.warning("请先填写模型名称");
          return;
        }
        testingName.value = provider.name;
        testFeedbackMap.value[provider.name] = "请求中…";
        const result = await requestAiAnswer(AI_TEST_QUESTION, provider);
        testFeedbackMap.value[provider.name] = getAiFeedbackMessage(result);
        testingName.value = "";
        if (result.code === 200) {
          vue.ElMessage.success("AI 接口连接成功");
        } else {
          vue.ElMessage.error(result.msg || "AI 接口连接失败");
        }
      };
      // ===== 总开关（独立类目）=====
      // 数据仍保存在 otherParams.params 里（沿用现有持久化与老配置兼容逻辑），
      // 但在设置页里单独占一类，并从「其他参数」列表中剔除，避免出现两个开关。
      const masterParam = vue.computed(
        () => (configStore.otherParams.params || []).find(
          (param) => param && param.name === SCRIPT_MASTER_PARAM_NAME
        )
      );
      const otherParamsForSettings = vue.computed(
        () => (configStore.otherParams.params || []).filter(
          (param) => !param || param.name !== SCRIPT_MASTER_PARAM_NAME
        )
      );
      const masterSwitchEnabled = vue.computed(() => {
        // 参数缺失时脚本按“开启”工作（见 isScriptEnabled），界面也照实显示
        const param = masterParam.value;
        if (!param)
          return true;
        return param.value !== false;
      });
      const updateMasterSwitch = (value) => {
        const param = masterParam.value;
        if (param) {
          param.value = value === true;
          return;
        }
        try {
          configStore.otherParams.params.push({
            name: SCRIPT_MASTER_PARAM_NAME,
            value: value === true,
            type: "boolean"
          });
        } catch (error) {
          console.warn("[网课小助手] 写入总开关失败", error);
        }
      };
      return (_ctx, _cache) => {
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_checkbox = vue.resolveComponent("el-checkbox");
        const _component_el_input_number = vue.resolveComponent("el-input-number");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_select = vue.resolveComponent("el-select");
        const _component_el_option = vue.resolveComponent("el-option");
        const _component_el_radio_group = vue.resolveComponent("el-radio-group");
        const _component_el_radio = vue.resolveComponent("el-radio");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_text = vue.resolveComponent("el-text");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          // —— 总开关：独立类目，放在设置页最上面 ——
          vue.createElementVNode("div", { class: "master-switch" }, [
            vue.createVNode(_component_el_divider, { "border-style": "dashed" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("span", _hoisted_2$4, "总开关")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_form_item, { label: "脚本总开关", size: "small" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_switch, {
                  modelValue: masterSwitchEnabled.value,
                  "onUpdate:modelValue": updateMasterSwitch,
                  size: "small"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            vue.createElementVNode("div", { class: "ai-footnote" }, " 关闭后脚本立刻停工：不自动播放、不自动答题、不自动跳章节，只保留悬浮窗；设置与数据都还在，重新打开即可继续，开关状态自动保存。 "),
            vue.createVNode(_component_el_text, {
              class: "master-state",
              size: "small",
              type: masterSwitchEnabled.value ? "success" : "danger"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(masterSwitchEnabled.value ? "当前状态：运行中" : "当前状态：已关闭（脚本不会执行任何操作）"), 1)
              ]),
              _: 1
            })
          ]),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.globalConfig.platformParams[_ctx.globalConfig.platformName].parts, (part) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: part.name
            }, [
              vue.createVNode(_component_el_divider, { "border-style": "dashed" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("span", _hoisted_2$4, vue.toDisplayString(part.name), 1)
                ]),
                _: 2
              }, 1024),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(part.params, (param) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                  key: param.name
                }, [
                  param.type === "boolean" ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
                    key: 0,
                    class: "setting-checkbox",
                    modelValue: param.value,
                    "onUpdate:modelValue": ($event) => param.value = $event,
                    label: param.name,
                    size: "small"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                    key: 1,
                    label: param.name,
                    required: ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_input_number, {
                        modelValue: param.value,
                        "onUpdate:modelValue": ($event) => param.value = $event,
                        min: param.min ?? 3e3,
                        max: param.max,
                        step: param.step ?? 1e3,
                        "controls-position": "right",
                        size: "small"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "step"])
                    ]),
                    _: 2
                  }, 1032, ["label"]))
                ], 64);
              }), 128))
            ]);
          }), 128)),
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_el_divider, { "border-style": "dashed" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("span", _hoisted_3$3, vue.toDisplayString(_ctx.globalConfig.otherParams.name), 1)
              ]),
              _: 1
            }),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(otherParamsForSettings.value, (item) => {
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                key: item.name
              }, [
                item.type === "boolean" ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
                  key: 0,
                  class: "setting-checkbox",
                  modelValue: item.value,
                  "onUpdate:modelValue": ($event) => item.value = $event,
                  label: item.name,
                  size: "small"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : item.type === "select" ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                  key: 2,
                  class: "setting-number",
                  label: item.name,
                  size: "small"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_select, {
                      modelValue: item.value,
                      "onUpdate:modelValue": ($event) => item.value = $event,
                      size: "small",
                      class: "setting-select"
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.options || [], (option) => {
                          return vue.openBlock(), vue.createBlock(_component_el_option, {
                            key: option.value,
                            label: option.label,
                            value: option.value
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["label"])) : (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                  key: 1,
                  class: "setting-number",
                  label: item.name,
                  required: "",
                  size: "small"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_input_number, {
                      modelValue: item.value,
                      "onUpdate:modelValue": ($event) => item.value = $event,
                      min: item.min ?? 3,
                      max: item.max ?? 100,
                      step: item.step ?? 1,
                      size: "small"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "step"])
                  ]),
                  _: 2
                }, 1032, ["label"]))
              ], 64);
            }), 128))
          ]),
          vue.createElementVNode("div", { class: "ai-setting" }, [
            vue.createVNode(_component_el_divider, { "border-style": "dashed" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("span", _hoisted_3$3, "AI 答题（自备模型与密钥）")
              ]),
              _: 1
            }),
            vue.createElementVNode("div", { class: "ai-tip" }, " 1、先在下方“AI 供应商”里选择服务商，填写密钥并打开开关；2、再打开上面的「开启AI答题」开关（那是 AI 的开关，与设置页最上面的「脚本总开关」是两回事）；3、题库搜不到时自动改用 AI 作答。密钥只保存在本地脚本存储中，不会上传给第三方题库。 "),
            vue.createVNode(_component_el_form_item, { label: "开启AI答题", size: "small" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_switch, {
                  modelValue: aiConfig.enabled,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => aiConfig.enabled = $event),
                  size: "small"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_form_item, { label: "题目发图（需模型支持视觉）", size: "small" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_switch, {
                  modelValue: aiConfig.sendImages,
                  "onUpdate:modelValue": _cache[43] || (_cache[43] = ($event) => aiConfig.sendImages = $event),
                  size: "small"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            vue.createElementVNode("div", { class: "ai-footnote" }, "题干里的图片会一起发给模型（公式、常数、电路图这类题必须开）。模型不支持视觉会自动关闭并改用纯文本。"),
            vue.createVNode(_component_el_form_item, { label: "回答随机度", size: "small" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_input_number, {
                  modelValue: aiConfig.temperature,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => aiConfig.temperature = $event),
                  min: 0,
                  max: 2,
                  step: 0.1,
                  size: "small"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_form_item, { label: "超时（秒）", size: "small" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_input_number, {
                  modelValue: aiConfig.timeout,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => aiConfig.timeout = $event),
                  min: 10,
                  max: 300,
                  step: 5,
                  size: "small"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            vue.createElementVNode("div", { class: "ai-provider-row" }, [
              vue.createVNode(_component_el_button, {
                type: "primary",
                size: "small",
                loading: aiTestRunning.value,
                onClick: () => handleAiSelfTest()
              }, {
                default: vue.withCtx(() => [vue.createTextVNode("模型准确率自测")]),
                _: 1
              }, 1032, ["loading", "onClick"]),
              vue.createElementVNode("span", {
                class: vue.normalizeClass(["ai-test-status", aiTestRate.value === null ? "" : aiTestRate.value >= 80 ? "bank-ok" : "bank-bad"])
              }, vue.toDisplayString(aiTestFeedback.value || `用 ${AI_EVAL_QUESTIONS.length} 道有标准答案的题实测当前模型`), 1)
            ]),
            vue.createElementVNode("div", { class: "ai-adv-grid" }, [
              vue.createVNode(_component_el_form_item, { label: "失败重试", size: "small" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input_number, {
                    modelValue: aiConfig.maxRetries,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => aiConfig.maxRetries = $event),
                    min: 0,
                    max: 5,
                    step: 1,
                    size: "small"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_form_item, { label: "自定义系统提示词（留空用内置）", size: "small" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: aiConfig.systemPrompt,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => aiConfig.systemPrompt = $event),
                    type: "textarea",
                    rows: 2,
                    size: "small",
                    placeholder: "留空则使用内置提示词"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            vue.createElementVNode("div", { class: "ai-section-title" }, "AI 供应商"),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(["ai-provider-grid", { "is-two-col": viewportWidth.value >= 1000 }])
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(aiProviders, (provider, index) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: provider.name + index,
                class: "ai-provider"
              }, [
                vue.createElementVNode("div", { class: "ai-provider-head" }, [
                  vue.createVNode(_component_el_input, {
                    modelValue: provider.name,
                    "onUpdate:modelValue": ($event) => provider.name = $event,
                    size: "small",
                    class: "ai-provider-select",
                    placeholder: "名称，如 DeepSeek"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vue.createVNode(_component_el_switch, {
                    modelValue: provider.enabled,
                    "onUpdate:modelValue": ($event) => provider.enabled = $event,
                    size: "small"
                  }, null, 8, ["modelValue"])
                ]),
                vue.createVNode(_component_el_input, {
                  modelValue: provider.apiKey,
                  "onUpdate:modelValue": ($event) => provider.apiKey = $event,
                  type: keyVisibleMap.value[provider.name] ? "text" : "password",
                  size: "small",
                  placeholder: "API 密钥（sk-...）",
                  class: "ai-provider-input"
                }, {
                  append: vue.withCtx(() => [
                    vue.createVNode(_component_el_button, {
                      size: "small",
                      onClick: () => toggleKeyVisible(provider)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(keyVisibleMap.value[provider.name] ? "隐藏" : "显示"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue", "type"]),
                vue.createVNode(_component_el_input, {
                  modelValue: provider.url,
                  "onUpdate:modelValue": ($event) => provider.url = $event,
                  size: "small",
                  placeholder: "接口地址，如 https://api.openai.com/v1",
                  class: "ai-provider-input"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                vue.createElementVNode("div", { class: "ai-provider-row" }, [
                  vue.createVNode(_component_el_input, {
                    modelValue: provider.model,
                    "onUpdate:modelValue": ($event) => provider.model = $event,
                    size: "small",
                    class: "ai-provider-model",
                    placeholder: "模型名，如 deepseek-chat（思考用 deepseek-reasoner）"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vue.createVNode(_component_el_button, {
                    size: "small",
                    loading: testingName.value === provider.name,
                    onClick: () => handleTestAi(provider)
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("测试")
                    ]),
                    _: 2
                  }, 1032, ["loading", "onClick"])
                ]),
                testFeedbackMap.value[provider.name] ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: "ai-provider-feedback"
                }, vue.toDisplayString(testFeedbackMap.value[provider.name]), 1)) : vue.createCommentVNode("", true)
              ]);
            }), 128))
            ]),
            vue.createElementVNode("div", { class: "ai-option-grid" }, [
              vue.createElementVNode("div", { class: "ai-option-item" }, [
                vue.createElementVNode("div", { class: "ai-option-label" }, "联网校验答案"),
                vue.createVNode(_component_el_radio_group, {
                  modelValue: aiConfig.verify,
                  "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => aiConfig.verify = $event),
                  size: "small",
                  class: "ai-option-control ai-radio-inline"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList([
                      { label: "关闭", value: "off" },
                      { label: "仅校验 AI 答案", value: "ai" },
                      { label: "AI 与题库都校验", value: "all" }
                    ], (option) => {
                      return vue.openBlock(), vue.createBlock(_component_el_radio, {
                        key: option.value,
                        value: option.value,
                        label: option.label
                      }, {
                        default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(option.label))]),
                        _: 2
                      }, 1032, ["value", "label"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"]),
              ]),
              vue.createElementVNode("div", { class: "ai-option-item" }, [
                vue.createElementVNode("div", { class: "ai-option-label" }, aiConfig.verify === "off" ? "校验联网方式（校验关闭时不生效）" : "校验联网方式"),
                vue.createVNode(_component_el_radio_group, {
                  modelValue: aiConfig.webSearch,
                  "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => {
                    aiConfig.webSearch = $event;
                    if ($event !== "off" && aiConfig.verify === "off") {
                      aiConfig.verify = "all";
                      vue.ElMessage.info("已自动把「联网校验答案」设为「AI 与题库都校验」，否则联网方式不会生效");
                    }
                  }),
                  size: "small",
                  class: "ai-option-control ai-radio-inline"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList([
                      { label: "不联网（只靠模型）", value: "off" },
                      { label: "用模型自带联网", value: "provider" },
                      { label: "脚本联网检索", value: "script" }
                    ], (option) => {
                      return vue.openBlock(), vue.createBlock(_component_el_radio, {
                        key: option.value,
                        value: option.value,
                        label: option.label
                      }, {
                        default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(option.label))]),
                        _: 2
                      }, 1032, ["value", "label"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"]),
              ]),
              vue.createElementVNode("div", { class: "ai-option-item" }, [
                vue.createElementVNode("div", { class: "ai-option-label" }, "深度思考"),
                vue.createVNode(_component_el_radio_group, {
                  modelValue: aiConfig.reasoning,
                  "onUpdate:modelValue": _cache[33] || (_cache[33] = ($event) => aiConfig.reasoning = $event),
                  size: "small",
                  class: "ai-option-control ai-radio-inline"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList([
                      { label: "关闭", value: "off" },
                      { label: "自动（按模型适配）", value: "auto" },
                      { label: "强制高强度", value: "provider" },
                      { label: "自定义参数", value: "custom" }
                    ], (option) => {
                      return vue.openBlock(), vue.createBlock(_component_el_radio, {
                        key: option.value,
                        value: option.value,
                        label: option.label
                      }, {
                        default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(option.label))]),
                        _: 2
                      }, 1032, ["value", "label"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"]),
              ]),
              vue.createElementVNode("div", { class: "ai-option-item" }, [
                vue.createElementVNode("div", { class: "ai-option-label" }, "思考参数 JSON"),
                vue.createVNode(_component_el_input, {
                  modelValue: aiConfig.reasoningParams,
                  "onUpdate:modelValue": _cache[34] || (_cache[34] = ($event) => aiConfig.reasoningParams = $event),
                  size: "small",
                  class: "ai-option-control",
                  placeholder: '如 {"reasoning_effort":"high"}'
                }, null, 8, ["modelValue"])
              ])
            ]),
            vue.createElementVNode("div", { class: "ai-section-title" }, "题库设置"),
            vue.createElementVNode("div", { class: "ai-option-label" }, "内置题库密钥（api.tikuhai.com，不用可留空）"),
            vue.createVNode(_component_el_input, {
              modelValue: bankConfig.token,
              "onUpdate:modelValue": _cache[41] || (_cache[41] = ($event) => bankConfig.token = $event),
              type: "password",
              size: "small",
              class: "ai-provider-input",
              placeholder: "题库密钥"
            }, null, 8, ["modelValue"]),
            vue.createVNode(_component_el_form_item, { label: "启用题库（辅助来源）", size: "small" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_switch, {
                  modelValue: bankConfig.enabled,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => bankConfig.enabled = $event),
                  size: "small"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            vue.createElementVNode("div", { class: "ai-tip" }, " 题库配置（AnswererWrapper JSON）。支持 ${title} ${type} ${options} 占位符；handler 写法示例：return (res) => { const d = JSON.parse(res); if (d.code === 1 && d.data) return [d.data.question, d.data.answer]; return undefined; }。留空则使用内置题库（密钥在「答题」页填写）。注意：占位符不要加反斜杠转义。 "),
            vue.createVNode(_component_el_input, {
              modelValue: bankConfig.customConfig,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => bankConfig.customConfig = $event),
              type: "textarea",
              rows: 4,
              size: "small",
              class: "ai-provider-input",
              placeholder: BANK_CONFIG_HINT
            }, null, 8, ["modelValue"]),
            vue.createElementVNode("div", { class: "ai-provider-row" }, [
              vue.createVNode(_component_el_button, { size: "small", onClick: () => handleTestBank() }, {
                default: vue.withCtx(() => [vue.createTextVNode("测试题库")]),
                _: 1
              })
            ]),
            vue.createElementVNode("div", { class: "ai-provider-row" }, [
              vue.createVNode(_component_el_button, { type: "primary", size: "small", onClick: () => handleProbeBank() }, {
                default: vue.withCtx(() => [vue.createTextVNode("检测题库可用")]),
                _: 1
              }),
              vue.createVNode(_component_el_switch, {
                modelValue: bankConfig.probeOnStartup,
                "onUpdate:modelValue": _cache[42] || (_cache[42] = ($event) => bankConfig.probeOnStartup = $event),
                size: "small"
              }, null, 8, ["modelValue"]),
              vue.createElementVNode("span", { class: "ai-footnote" }, "打开页面时自动检测")
            ]),
            bankFeedback.value ? (vue.openBlock(), vue.createElementVNode("div", {
              key: 2,
              class: "ai-provider-feedback"
            }, vue.toDisplayString(bankFeedback.value), 1)) : vue.createCommentVNode("", true),
            bankProbeFeedback.value ? (vue.openBlock(), vue.createElementVNode("div", {
              key: 5,
              class: vue.normalizeClass(["ai-provider-feedback", bankProbeOk.value === true ? "bank-ok" : bankProbeOk.value === false ? "bank-bad" : ""])
            }, vue.toDisplayString(bankProbeFeedback.value), 1)) : vue.createCommentVNode("", true),
            vue.createElementVNode("div", { class: "ai-footnote" }, " 提示：AI 优先时题库只作兜底；想完全不用题库，把上面的开关关掉，或把「答题方式」设为「仅用AI」。 "),
            vue.createElementVNode("div", { class: "ai-footnote" }, " 提示：密钥与配置通过 GM_setValue / localStorage 保存在本机，换设备需要重新填写。默认保留 DeepSeek 官方一条，其余模型请在“自定义模型”里填名称/接口地址/密钥（需兼容 OpenAI 的 /chat/completions，火山方舟要填推理接入点 ID）。 "),
            vue.createElementVNode("div", { class: "ai-section-title" }, "诊断与日志"),
            vue.createVNode(_component_el_button, {
              type: "primary",
              size: "small",
              onClick: () => handleCaptureDiagnostic()
            }, {
              default: vue.withCtx(() => [vue.createTextVNode("一键抓取诊断报告")]),
              _: 1
            }, 8, ["onClick"]),
            diagnosticCaptured.value ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 3,
              class: "ai-provider-feedback"
            }, vue.toDisplayString(diagnosticFeedback.value), 1)) : vue.createCommentVNode("", true),
            diagnosticCaptured.value ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 4,
              class: "ai-option-item"
            }, [
              vue.createElementVNode("div", { class: "ai-option-label" }, "诊断报告内容（可手动全选复制）"),
              vue.createVNode(_component_el_input, {
                modelValue: diagnosticCaptured.value,
                type: "textarea",
                rows: 8,
                size: "small",
                readonly: "",
                class: "ai-option-control"
              }, null, 8, ["modelValue"])
            ])) : vue.createCommentVNode("", true),
            vue.createElementVNode("div", { class: "ai-footnote" }, " 抓取内容：脚本版本、页面地址、关键库是否加载、面板状态、答题方式、AI 与题库配置（密钥已打码）、页面 iframe/video/题目节点探测、以及最近 300 条运行日志。不包含任何密钥明文。 "),
          ])
        ]);
      };
    }
  });
  const _hoisted_1$3 = { class: "question_table" };
  const _hoisted_2$3 = ["innerHTML"];
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "QuestionTable",
    props: {
      questionList: {}
    },
    setup(__props) {
      const isTokenEditing = vue.ref(false);
      const configStore = useConfigStore();
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_table = vue.resolveComponent("el-table");
        const _component_el_empty = vue.resolveComponent("el-empty");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(_component_el_input, {
            class: "token-input",
            modelValue: vue.unref(configStore).bankConfig.token,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(configStore).bankConfig.token = $event),
            type: isTokenEditing.value ? "text" : "password",
            onFocus: _cache[1] || (_cache[1] = ($event) => isTokenEditing.value = true),
            onBlur: _cache[2] || (_cache[2] = ($event) => isTokenEditing.value = false),
            placeholder: "第三方题库（api.tikuhai.com）的密钥；不用题库可留空"
          }, {
            prepend: vue.withCtx(() => [
              vue.createVNode(_component_el_button, { class: "token-label" }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("题库密钥")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "type"]),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_1$3, [
            vue.createVNode(_component_el_table, {
              stripe: "",
              data: _ctx.questionList,
              "max-height": "400",
              class: "question-list"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_table_column, {
                  type: "index",
                  width: "40"
                }),
                vue.createVNode(_component_el_table_column, {
                  prop: "title",
                  label: "题目",
                  width: "370"
                }),
                vue.createVNode(_component_el_table_column, {
                  prop: "answer",
                  label: "答案",
                  width: "215"
                }, {
                  default: vue.withCtx((scope) => [
                    vue.createElementVNode("div", {
                      innerHTML: scope.row.answer.join()
                    }, null, 8, _hoisted_2$3)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])
          ], 512), [
            [vue.vShow, _ctx.questionList.length]
          ]),
          vue.withDirectives(vue.createElementVNode("div", null, [
            vue.createVNode(_component_el_empty, { description: "该页面无需答题" })
          ], 512), [
            [vue.vShow, !_ctx.questionList.length]
          ])
        ], 64);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$5 = {};
  const _hoisted_1$2 = { style: { "font-size": "12px" } };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("p", null, "1、脚本功能完全免费，不存在付费情况，进入相应页面即可使用。", -1);
  const _hoisted_3$2 = /* @__PURE__ */ vue.createElementVNode("p", null, '2、脚本没有开发自己到题库，而是接入了多个第三方题库，如需填写密钥，依次操作：[1] 点击标签页"答题" --> [2] 在文本框内填写 --> [3] 刷新', -1);
  const _hoisted_4$1 = /* @__PURE__ */ vue.createElementVNode("p", { style: { "font-weight": "500" } }, "务必注意：", -1);
  const _hoisted_5$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "-- 脚本出现相关问题，请在脚本反馈区反馈，或者私信作者修复。", -1);
  const _hoisted_6$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "-- 题库密钥请确认能够搜索到题目再获取，题库均为网络收集的第三方题库，出现任何问题与脚本无关。如果你是程序员，可以自行接入自己的题库，这里不提供任何教程，也不会回复任何询问，请自行查看源代码修改即可，不会改的绕道。", -1);
  const _hoisted_7$1 = [
    _hoisted_2$2,
    _hoisted_3$2,
    _hoisted_4$1,
    _hoisted_5$1,
    _hoisted_6$1
  ];
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, _hoisted_7$1);
  }
  const Tutorial = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1]]);
  const _sfc_main$4 = {};
  const _hoisted_1$1 = { style: { "font-size": "12px" } };
  const _hoisted_2$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "1、本脚本仅供学习和研究目的使用，并应在24小时内删除。脚本的使用不应违反任何法律法规及学术道德标准。", -1);
  const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "2、用户在使用脚本时，必须遵守所有适用的法律法规。任何由于使用脚本而引起的违法行为或不当行为，其产生的一切后果由用户自行承担。", -1);
  const _hoisted_4 = /* @__PURE__ */ vue.createElementVNode("p", null, "3、开发者不对用户使用脚本所产生的任何直接或间接后果负责。用户应自行评估使用脚本的风险，并对任何可能的负面影响承担全责。", -1);
  const _hoisted_5 = /* @__PURE__ */ vue.createElementVNode("p", null, "4、本声明的目的在于提醒用户注意相关法律法规与风险，确保用户在明智、合法的前提下使用脚本。", -1);
  const _hoisted_6 = /* @__PURE__ */ vue.createElementVNode("p", null, "5、如用户在使用脚本的过程中有任何疑问，建议立即停止使用，并删除所有相关文件。", -1);
  const _hoisted_7 = /* @__PURE__ */ vue.createElementVNode("p", null, "6、本免责声明的最终解释权归脚本开发者所有。", -1);
  const _hoisted_8 = [
    _hoisted_2$1,
    _hoisted_3$1,
    _hoisted_4,
    _hoisted_5,
    _hoisted_6,
    _hoisted_7
  ];
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, _hoisted_8);
  }
  const ScriptTip = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
  function isFunction(value) {
    return typeof value === "function";
  }
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from2.length, ar; i < l; i++) {
        if (ar || !(i in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i);
          ar[i] = from2[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f)
          i[n] = f(i[n]);
      }
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var isArrayLike = function(x) {
    return x && typeof x.length === "number" && typeof x !== "function";
  };
  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }
  var Subscription = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    }();
    return Subscription2;
  }();
  Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      return (clearTimeout)(handle);
    },
    delegate: void 0
  };
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      {
        throw err;
      }
    });
  }
  function noop() {
  }
  function errorContext(cb) {
    {
      cb();
    }
  }
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped)
        ;
      else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped)
        ;
      else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped)
        ;
      else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  function identity(x) {
    return x;
  }
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }
  var Observable = function() {
    function Observable2(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable2.prototype.lift = function(operator) {
      var observable2 = new Observable2();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable2.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable2.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable2.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable2.prototype[observable] = function() {
      return this;
    };
    Observable2.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable2.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable2.create = function(subscribe) {
      return new Observable2(subscribe);
    };
    return Observable2;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }
  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();
  function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
  }
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber);
  function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) {
      delay = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer.push(value);
    };
    var doInnerSub = function(value) {
      expand && subscriber.next(value);
      active++;
      var innerComplete = false;
      innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
        onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
        if (expand) {
          outerNext(innerValue);
        } else {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer.shift();
              if (innerSubScheduler) {
                executeSchedule(subscriber, innerSubScheduler, function() {
                  return doInnerSub(bufferedValue);
                });
              } else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
  }
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction(resultSelector)) {
      return mergeMap(function(a, i) {
        return map(function(b, ii) {
          return resultSelector(a, b, i, ii);
        })(innerFrom(project(a, i)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return operate(function(source, subscriber) {
      return mergeInternals(source, subscriber, project, concurrent);
    });
  }
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return mergeMap(identity, concurrent);
  }
  function concatAll() {
    return mergeAll(1);
  }
  function concatMap(project, resultSelector) {
    return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
  }
  class IframeUtils {
    static getIframes(element) {
      return Array.from(element.querySelectorAll("iframe"));
    }
    static getAllNestedIframes(element) {
      const iframes = IframeUtils.getIframes(element);
      if (iframes.length === 0) {
        return rxjs.of([]);
      } else {
        return rxjs.from(iframes).pipe(
          mergeMap(
            (iframe) => new rxjs.Observable((subscriber) => {
              if (iframe.contentDocument) {
                const iframeDocument = iframe.contentDocument;
                const nestedIframes = IframeUtils.getAllNestedIframes(iframeDocument.documentElement);
                nestedIframes.subscribe((nestedIframes2) => {
                  subscriber.next([iframe, ...nestedIframes2]);
                  subscriber.complete();
                });
              } else {
                subscriber.next([]);
                subscriber.complete();
              }
            })
          ),
          concatAll(),
          rxjs.toArray()
        );
      }
    }
  }
  var friendlyTags = { "aalt": "Access All Alternates", "abvf": "Above-base Forms", "abvm": "Above - base Mark Positioning", "abvs": "Above - base Substitutions", "afrc": "Alternative Fractions", "akhn": "Akhands", "blwf": "Below - base Forms", "blwm": "Below - base Mark Positioning", "blws": "Below - base Substitutions", "calt": "Contextual Alternates", "case": "Case - Sensitive Forms", "ccmp": "Glyph Composition / Decomposition", "cfar": "Conjunct Form After Ro", "cjct": "Conjunct Forms", "clig": "Contextual Ligatures", "cpct": "Centered CJK Punctuation", "cpsp": "Capital Spacing", "cswh": "Contextual Swash", "curs": "Cursive Positioning", "c2pc": "Petite Capitals From Capitals", "c2sc": "Small Capitals From Capitals", "dist": "Distances", "dlig": "Discretionary Ligatures", "dnom": "Denominators", "dtls": "Dotless Forms", "expt": "Expert Forms", "falt": "Final Glyph on Line Alternates", "fin2": "Terminal Forms #2", "fin3": "Terminal Forms #3", "fina": "Terminal Forms", "flac": "Flattened accent forms", "frac": "Fractions", "fwid": "Full Widths", "half": "Half Forms", "haln": "Halant Forms", "halt": "Alternate Half Widths", "hist": "Historical Forms", "hkna": "Horizontal Kana Alternates", "hlig": "Historical Ligatures", "hngl": "Hangul", "hojo": "Hojo Kanji Forms(JIS X 0212 - 1990 Kanji Forms)", "hwid": "Half Widths", "init": "Initial Forms", "isol": "Isolated Forms", "ital": "Italics", "jalt": "Justification Alternates", "jp78": "JIS78 Forms", "jp83": "JIS83 Forms", "jp90": "JIS90 Forms", "jp04": "JIS2004 Forms", "kern": "Kerning", "lfbd": "Left Bounds", "liga": "Standard Ligatures", "ljmo": "Leading Jamo Forms", "lnum": "Lining Figures", "locl": "Localized Forms", "ltra": "Left - to - right alternates", "ltrm": "Left - to - right mirrored forms", "mark": "Mark Positioning", "med2": "Medial Forms #2", "medi": "Medial Forms", "mgrk": "Mathematical Greek", "mkmk": "Mark to Mark Positioning", "mset": "Mark Positioning via Substitution", "nalt": "Alternate Annotation Forms", "nlck": "NLC Kanji Forms", "nukt": "Nukta Forms", "numr": "Numerators", "onum": "Oldstyle Figures", "opbd": "Optical Bounds", "ordn": "Ordinals", "ornm": "Ornaments", "palt": "Proportional Alternate Widths", "pcap": "Petite Capitals", "pkna": "Proportional Kana", "pnum": "Proportional Figures", "pref": "Pre - Base Forms", "pres": "Pre - base Substitutions", "pstf": "Post - base Forms", "psts": "Post - base Substitutions", "pwid": "Proportional Widths", "qwid": "Quarter Widths", "rand": "Randomize", "rclt": "Required Contextual Alternates", "rkrf": "Rakar Forms", "rlig": "Required Ligatures", "rphf": "Reph Forms", "rtbd": "Right Bounds", "rtla": "Right - to - left alternates", "rtlm": "Right - to - left mirrored forms", "ruby": "Ruby Notation Forms", "rvrn": "Required Variation Alternates", "salt": "Stylistic Alternates", "sinf": "Scientific Inferiors", "size": "Optical size", "smcp": "Small Capitals", "smpl": "Simplified Forms", "ssty": "Math script style alternates", "stch": "Stretching Glyph Decomposition", "subs": "Subscript", "sups": "Superscript", "swsh": "Swash", "titl": "Titling", "tjmo": "Trailing Jamo Forms", "tnam": "Traditional Name Forms", "tnum": "Tabular Figures", "trad": "Traditional Forms", "twid": "Third Widths", "unic": "Unicase", "valt": "Alternate Vertical Metrics", "vatu": "Vattu Variants", "vert": "Vertical Writing", "vhal": "Alternate Vertical Half Metrics", "vjmo": "Vowel Jamo Forms", "vkna": "Vertical Kana Alternates", "vkrn": "Vertical Kerning", "vpal": "Proportional Alternate Vertical Metrics", "vrt2": "Vertical Alternates and Rotation", "vrtr": "Vertical Alternates for Rotation", "zero": "Slashed Zero" };
  var Typr$1 = {};
  var Typr = {};
  Typr.parse = function(buff) {
    var bin = Typr._bin;
    var data = new Uint8Array(buff);
    var tag = bin.readASCII(data, 0, 4);
    if (tag == "ttcf") {
      var offset = 4;
      bin.readUshort(data, offset);
      offset += 2;
      bin.readUshort(data, offset);
      offset += 2;
      var numF = bin.readUint(data, offset);
      offset += 4;
      var fnts = [];
      for (var i = 0; i < numF; i++) {
        var foff = bin.readUint(data, offset);
        offset += 4;
        fnts.push(Typr._readFont(data, foff));
      }
      return fnts;
    } else
      return [Typr._readFont(data, 0)];
  };
  Typr._readFont = function(data, offset) {
    var bin = Typr._bin;
    var ooff = offset;
    bin.readFixed(data, offset);
    offset += 4;
    var numTables = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    var tags = [
      "cmap",
      "head",
      "hhea",
      "maxp",
      "hmtx",
      "name",
      "OS/2",
      "post",
      //"cvt",
      //"fpgm",
      "loca",
      "glyf",
      "kern",
      //"prep"
      //"gasp"
      "CFF ",
      "GPOS",
      "GSUB",
      "SVG "
      //"VORG",
    ];
    var obj = { _data: data, _offset: ooff };
    var tabs = {};
    for (var i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      bin.readUint(data, offset);
      offset += 4;
      var toffset = bin.readUint(data, offset);
      offset += 4;
      var length = bin.readUint(data, offset);
      offset += 4;
      tabs[tag] = { offset: toffset, length };
    }
    for (var i = 0; i < tags.length; i++) {
      var t = tags[i];
      if (tabs[t])
        obj[t.trim()] = Typr[t.trim()].parse(data, tabs[t].offset, tabs[t].length, obj);
    }
    return obj;
  };
  Typr._tabOffset = function(data, tab, foff) {
    var bin = Typr._bin;
    var numTables = bin.readUshort(data, foff + 4);
    var offset = foff + 12;
    for (var i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      bin.readUint(data, offset);
      offset += 4;
      var toffset = bin.readUint(data, offset);
      offset += 4;
      bin.readUint(data, offset);
      offset += 4;
      if (tag == tab)
        return toffset;
    }
    return 0;
  };
  Typr._bin = {
    readFixed: function(data, o) {
      return (data[o] << 8 | data[o + 1]) + (data[o + 2] << 8 | data[o + 3]) / (256 * 256 + 4);
    },
    readF2dot14: function(data, o) {
      var num = Typr._bin.readShort(data, o);
      return num / 16384;
    },
    readInt: function(buff, p) {
      return Typr._bin._view(buff).getInt32(p);
    },
    readInt8: function(buff, p) {
      return Typr._bin._view(buff).getInt8(p);
    },
    readShort: function(buff, p) {
      return Typr._bin._view(buff).getInt16(p);
    },
    readUshort: function(buff, p) {
      return Typr._bin._view(buff).getUint16(p);
    },
    readUshorts: function(buff, p, len) {
      var arr = [];
      for (var i = 0; i < len; i++)
        arr.push(Typr._bin.readUshort(buff, p + i * 2));
      return arr;
    },
    readUint: function(buff, p) {
      return Typr._bin._view(buff).getUint32(p);
    },
    readUint64: function(buff, p) {
      return Typr._bin.readUint(buff, p) * (4294967295 + 1) + Typr._bin.readUint(buff, p + 4);
    },
    readASCII: function(buff, p, l) {
      var s = "";
      for (var i = 0; i < l; i++)
        s += String.fromCharCode(buff[p + i]);
      return s;
    },
    readUnicode: function(buff, p, l) {
      var s = "";
      for (var i = 0; i < l; i++) {
        var c = buff[p++] << 8 | buff[p++];
        s += String.fromCharCode(c);
      }
      return s;
    },
    _tdec: typeof window !== "undefined" && window["TextDecoder"] ? new window["TextDecoder"]() : null,
    readUTF8: function(buff, p, l) {
      var tdec = Typr._bin._tdec;
      if (tdec && p == 0 && l == buff.length)
        return tdec["decode"](buff);
      return Typr._bin.readASCII(buff, p, l);
    },
    readBytes: function(buff, p, l) {
      var arr = [];
      for (var i = 0; i < l; i++)
        arr.push(buff[p + i]);
      return arr;
    },
    readASCIIArray: function(buff, p, l) {
      var s = [];
      for (var i = 0; i < l; i++)
        s.push(String.fromCharCode(buff[p + i]));
      return s;
    },
    _view: function(buff) {
      return buff._dataView || (buff._dataView = buff.buffer ? new DataView(buff.buffer, buff.byteOffset, buff.byteLength) : new DataView(new Uint8Array(buff).buffer));
    }
  };
  Typr._lctf = {};
  Typr._lctf.parse = function(data, offset, length, font, subt) {
    var bin = Typr._bin;
    var obj = {};
    var offset0 = offset;
    bin.readFixed(data, offset);
    offset += 4;
    var offScriptList = bin.readUshort(data, offset);
    offset += 2;
    var offFeatureList = bin.readUshort(data, offset);
    offset += 2;
    var offLookupList = bin.readUshort(data, offset);
    offset += 2;
    obj.scriptList = Typr._lctf.readScriptList(data, offset0 + offScriptList);
    obj.featureList = Typr._lctf.readFeatureList(data, offset0 + offFeatureList);
    obj.lookupList = Typr._lctf.readLookupList(data, offset0 + offLookupList, subt);
    return obj;
  };
  Typr._lctf.readLookupList = function(data, offset, subt) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = [];
    var count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var lut = Typr._lctf.readLookupTable(data, offset0 + noff, subt);
      obj.push(lut);
    }
    return obj;
  };
  Typr._lctf.readLookupTable = function(data, offset, subt) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = { tabs: [] };
    obj.ltype = bin.readUshort(data, offset);
    offset += 2;
    obj.flag = bin.readUshort(data, offset);
    offset += 2;
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    var ltype = obj.ltype;
    for (var i = 0; i < cnt; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var tab = subt(data, ltype, offset0 + noff, obj);
      obj.tabs.push(tab);
    }
    return obj;
  };
  Typr._lctf.numOfOnes = function(n) {
    var num = 0;
    for (var i = 0; i < 32; i++)
      if ((n >>> i & 1) != 0)
        num++;
    return num;
  };
  Typr._lctf.readClassDef = function(data, offset) {
    var bin = Typr._bin;
    var obj = [];
    var format = bin.readUshort(data, offset);
    offset += 2;
    if (format == 1) {
      var startGlyph = bin.readUshort(data, offset);
      offset += 2;
      var glyphCount = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < glyphCount; i++) {
        obj.push(startGlyph + i);
        obj.push(startGlyph + i);
        obj.push(bin.readUshort(data, offset));
        offset += 2;
      }
    }
    if (format == 2) {
      var count = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < count; i++) {
        obj.push(bin.readUshort(data, offset));
        offset += 2;
        obj.push(bin.readUshort(data, offset));
        offset += 2;
        obj.push(bin.readUshort(data, offset));
        offset += 2;
      }
    }
    return obj;
  };
  Typr._lctf.getInterval = function(tab, val) {
    for (var i = 0; i < tab.length; i += 3) {
      var start = tab[i], end = tab[i + 1];
      tab[i + 2];
      if (start <= val && val <= end)
        return i;
    }
    return -1;
  };
  Typr._lctf.readCoverage = function(data, offset) {
    var bin = Typr._bin;
    var cvg = {};
    cvg.fmt = bin.readUshort(data, offset);
    offset += 2;
    var count = bin.readUshort(data, offset);
    offset += 2;
    if (cvg.fmt == 1)
      cvg.tab = bin.readUshorts(data, offset, count);
    if (cvg.fmt == 2)
      cvg.tab = bin.readUshorts(data, offset, count * 3);
    return cvg;
  };
  Typr._lctf.coverageIndex = function(cvg, val) {
    var tab = cvg.tab;
    if (cvg.fmt == 1)
      return tab.indexOf(val);
    if (cvg.fmt == 2) {
      var ind = Typr._lctf.getInterval(tab, val);
      if (ind != -1)
        return tab[ind + 2] + (val - tab[ind]);
    }
    return -1;
  };
  Typr._lctf.readFeatureList = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = [];
    var count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var feat = Typr._lctf.readFeatureTable(data, offset0 + noff);
      feat.tag = tag.trim();
      obj.push(feat);
    }
    return obj;
  };
  Typr._lctf.readFeatureTable = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var feat = {};
    var featureParams = bin.readUshort(data, offset);
    offset += 2;
    if (featureParams > 0) {
      feat.featureParams = offset0 + featureParams;
    }
    var lookupCount = bin.readUshort(data, offset);
    offset += 2;
    feat.tab = [];
    for (var i = 0; i < lookupCount; i++)
      feat.tab.push(bin.readUshort(data, offset + 2 * i));
    return feat;
  };
  Typr._lctf.readScriptList = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = {};
    var count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2;
      obj[tag.trim()] = Typr._lctf.readScriptTable(data, offset0 + noff);
    }
    return obj;
  };
  Typr._lctf.readScriptTable = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = {};
    var defLangSysOff = bin.readUshort(data, offset);
    offset += 2;
    if (defLangSysOff > 0) {
      obj["default"] = Typr._lctf.readLangSysTable(data, offset0 + defLangSysOff);
    }
    var langSysCount = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < langSysCount; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var langSysOff = bin.readUshort(data, offset);
      offset += 2;
      obj[tag.trim()] = Typr._lctf.readLangSysTable(data, offset0 + langSysOff);
    }
    return obj;
  };
  Typr._lctf.readLangSysTable = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    bin.readUshort(data, offset);
    offset += 2;
    obj.reqFeature = bin.readUshort(data, offset);
    offset += 2;
    var featureCount = bin.readUshort(data, offset);
    offset += 2;
    obj.features = bin.readUshorts(data, offset, featureCount);
    return obj;
  };
  Typr.CFF = {};
  Typr.CFF.parse = function(data, offset, length) {
    var bin = Typr._bin;
    data = new Uint8Array(data.buffer, offset, length);
    offset = 0;
    data[offset];
    offset++;
    data[offset];
    offset++;
    data[offset];
    offset++;
    data[offset];
    offset++;
    var ninds = [];
    offset = Typr.CFF.readIndex(data, offset, ninds);
    var names = [];
    for (var i = 0; i < ninds.length - 1; i++)
      names.push(bin.readASCII(data, offset + ninds[i], ninds[i + 1] - ninds[i]));
    offset += ninds[ninds.length - 1];
    var tdinds = [];
    offset = Typr.CFF.readIndex(data, offset, tdinds);
    var topDicts = [];
    for (var i = 0; i < tdinds.length - 1; i++)
      topDicts.push(Typr.CFF.readDict(data, offset + tdinds[i], offset + tdinds[i + 1]));
    offset += tdinds[tdinds.length - 1];
    var topdict = topDicts[0];
    var sinds = [];
    offset = Typr.CFF.readIndex(data, offset, sinds);
    var strings = [];
    for (var i = 0; i < sinds.length - 1; i++)
      strings.push(bin.readASCII(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
    offset += sinds[sinds.length - 1];
    Typr.CFF.readSubrs(data, offset, topdict);
    if (topdict.CharStrings) {
      offset = topdict.CharStrings;
      var sinds = [];
      offset = Typr.CFF.readIndex(data, offset, sinds);
      var cstr = [];
      for (var i = 0; i < sinds.length - 1; i++)
        cstr.push(bin.readBytes(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
      topdict.CharStrings = cstr;
    }
    if (topdict.ROS) {
      offset = topdict.FDArray;
      var fdind = [];
      offset = Typr.CFF.readIndex(data, offset, fdind);
      topdict.FDArray = [];
      for (var i = 0; i < fdind.length - 1; i++) {
        var dict = Typr.CFF.readDict(data, offset + fdind[i], offset + fdind[i + 1]);
        Typr.CFF._readFDict(data, dict, strings);
        topdict.FDArray.push(dict);
      }
      offset += fdind[fdind.length - 1];
      offset = topdict.FDSelect;
      topdict.FDSelect = [];
      var fmt = data[offset];
      offset++;
      if (fmt == 3) {
        var rns = bin.readUshort(data, offset);
        offset += 2;
        for (var i = 0; i < rns + 1; i++) {
          topdict.FDSelect.push(bin.readUshort(data, offset), data[offset + 2]);
          offset += 3;
        }
      } else
        throw fmt;
    }
    if (topdict.Encoding)
      topdict.Encoding = Typr.CFF.readEncoding(data, topdict.Encoding, topdict.CharStrings.length);
    if (topdict.charset)
      topdict.charset = Typr.CFF.readCharset(data, topdict.charset, topdict.CharStrings.length);
    Typr.CFF._readFDict(data, topdict, strings);
    return topdict;
  };
  Typr.CFF._readFDict = function(data, dict, ss) {
    var offset;
    if (dict.Private) {
      offset = dict.Private[1];
      dict.Private = Typr.CFF.readDict(data, offset, offset + dict.Private[0]);
      if (dict.Private.Subrs)
        Typr.CFF.readSubrs(data, offset + dict.Private.Subrs, dict.Private);
    }
    for (var p in dict)
      if (["FamilyName", "FontName", "FullName", "Notice", "version", "Copyright"].indexOf(p) != -1)
        dict[p] = ss[dict[p] - 426 + 35];
  };
  Typr.CFF.readSubrs = function(data, offset, obj) {
    var bin = Typr._bin;
    var gsubinds = [];
    offset = Typr.CFF.readIndex(data, offset, gsubinds);
    var bias, nSubrs = gsubinds.length;
    if (nSubrs < 1240)
      bias = 107;
    else if (nSubrs < 33900)
      bias = 1131;
    else
      bias = 32768;
    obj.Bias = bias;
    obj.Subrs = [];
    for (var i = 0; i < gsubinds.length - 1; i++)
      obj.Subrs.push(bin.readBytes(data, offset + gsubinds[i], gsubinds[i + 1] - gsubinds[i]));
  };
  Typr.CFF.tableSE = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    0,
    111,
    112,
    113,
    114,
    0,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    0,
    123,
    0,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    0,
    132,
    133,
    0,
    134,
    135,
    136,
    137,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    138,
    0,
    139,
    0,
    0,
    0,
    0,
    140,
    141,
    142,
    143,
    0,
    0,
    0,
    0,
    0,
    144,
    0,
    0,
    0,
    145,
    0,
    0,
    146,
    147,
    148,
    149,
    0,
    0,
    0,
    0
  ];
  Typr.CFF.glyphByUnicode = function(cff, code) {
    for (var i = 0; i < cff.charset.length; i++)
      if (cff.charset[i] == code)
        return i;
    return -1;
  };
  Typr.CFF.glyphBySE = function(cff, charcode) {
    if (charcode < 0 || charcode > 255)
      return -1;
    return Typr.CFF.glyphByUnicode(cff, Typr.CFF.tableSE[charcode]);
  };
  Typr.CFF.readEncoding = function(data, offset, num) {
    Typr._bin;
    var array = [".notdef"];
    var format = data[offset];
    offset++;
    if (format == 0) {
      var nCodes = data[offset];
      offset++;
      for (var i = 0; i < nCodes; i++)
        array.push(data[offset + i]);
    } else
      throw "error: unknown encoding format: " + format;
    return array;
  };
  Typr.CFF.readCharset = function(data, offset, num) {
    var bin = Typr._bin;
    var charset = [".notdef"];
    var format = data[offset];
    offset++;
    if (format == 0) {
      for (var i = 0; i < num; i++) {
        var first = bin.readUshort(data, offset);
        offset += 2;
        charset.push(first);
      }
    } else if (format == 1 || format == 2) {
      while (charset.length < num) {
        var first = bin.readUshort(data, offset);
        offset += 2;
        var nLeft = 0;
        if (format == 1) {
          nLeft = data[offset];
          offset++;
        } else {
          nLeft = bin.readUshort(data, offset);
          offset += 2;
        }
        for (var i = 0; i <= nLeft; i++) {
          charset.push(first);
          first++;
        }
      }
    } else
      throw "error: format: " + format;
    return charset;
  };
  Typr.CFF.readIndex = function(data, offset, inds) {
    var bin = Typr._bin;
    var count = bin.readUshort(data, offset) + 1;
    offset += 2;
    var offsize = data[offset];
    offset++;
    if (offsize == 1)
      for (var i = 0; i < count; i++)
        inds.push(data[offset + i]);
    else if (offsize == 2)
      for (var i = 0; i < count; i++)
        inds.push(bin.readUshort(data, offset + i * 2));
    else if (offsize == 3)
      for (var i = 0; i < count; i++)
        inds.push(bin.readUint(data, offset + i * 3 - 1) & 16777215);
    else if (count != 1)
      throw "unsupported offset size: " + offsize + ", count: " + count;
    offset += count * offsize;
    return offset - 1;
  };
  Typr.CFF.getCharString = function(data, offset, o) {
    var bin = Typr._bin;
    var b0 = data[offset], b1 = data[offset + 1];
    data[offset + 2];
    data[offset + 3];
    data[offset + 4];
    var vs = 1;
    var op = null, val = null;
    if (b0 <= 20) {
      op = b0;
      vs = 1;
    }
    if (b0 == 12) {
      op = b0 * 100 + b1;
      vs = 2;
    }
    if (21 <= b0 && b0 <= 27) {
      op = b0;
      vs = 1;
    }
    if (b0 == 28) {
      val = bin.readShort(data, offset + 1);
      vs = 3;
    }
    if (29 <= b0 && b0 <= 31) {
      op = b0;
      vs = 1;
    }
    if (32 <= b0 && b0 <= 246) {
      val = b0 - 139;
      vs = 1;
    }
    if (247 <= b0 && b0 <= 250) {
      val = (b0 - 247) * 256 + b1 + 108;
      vs = 2;
    }
    if (251 <= b0 && b0 <= 254) {
      val = -(b0 - 251) * 256 - b1 - 108;
      vs = 2;
    }
    if (b0 == 255) {
      val = bin.readInt(data, offset + 1) / 65535;
      vs = 5;
    }
    o.val = val != null ? val : "o" + op;
    o.size = vs;
  };
  Typr.CFF.readCharString = function(data, offset, length) {
    var end = offset + length;
    var bin = Typr._bin;
    var arr = [];
    while (offset < end) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2];
      data[offset + 3];
      data[offset + 4];
      var vs = 1;
      var op = null, val = null;
      if (b0 <= 20) {
        op = b0;
        vs = 1;
      }
      if (b0 == 12) {
        op = b0 * 100 + b1;
        vs = 2;
      }
      if (b0 == 19 || b0 == 20) {
        op = b0;
        vs = 2;
      }
      if (21 <= b0 && b0 <= 27) {
        op = b0;
        vs = 1;
      }
      if (b0 == 28) {
        val = bin.readShort(data, offset + 1);
        vs = 3;
      }
      if (29 <= b0 && b0 <= 31) {
        op = b0;
        vs = 1;
      }
      if (32 <= b0 && b0 <= 246) {
        val = b0 - 139;
        vs = 1;
      }
      if (247 <= b0 && b0 <= 250) {
        val = (b0 - 247) * 256 + b1 + 108;
        vs = 2;
      }
      if (251 <= b0 && b0 <= 254) {
        val = -(b0 - 251) * 256 - b1 - 108;
        vs = 2;
      }
      if (b0 == 255) {
        val = bin.readInt(data, offset + 1) / 65535;
        vs = 5;
      }
      arr.push(val != null ? val : "o" + op);
      offset += vs;
    }
    return arr;
  };
  Typr.CFF.readDict = function(data, offset, end) {
    var bin = Typr._bin;
    var dict = {};
    var carr = [];
    while (offset < end) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2];
      data[offset + 3];
      data[offset + 4];
      var vs = 1;
      var key = null, val = null;
      if (b0 == 28) {
        val = bin.readShort(data, offset + 1);
        vs = 3;
      }
      if (b0 == 29) {
        val = bin.readInt(data, offset + 1);
        vs = 5;
      }
      if (32 <= b0 && b0 <= 246) {
        val = b0 - 139;
        vs = 1;
      }
      if (247 <= b0 && b0 <= 250) {
        val = (b0 - 247) * 256 + b1 + 108;
        vs = 2;
      }
      if (251 <= b0 && b0 <= 254) {
        val = -(b0 - 251) * 256 - b1 - 108;
        vs = 2;
      }
      if (b0 == 255) {
        val = bin.readInt(data, offset + 1) / 65535;
        vs = 5;
        throw "unknown number";
      }
      if (b0 == 30) {
        var nibs = [];
        vs = 1;
        while (true) {
          var b = data[offset + vs];
          vs++;
          var nib0 = b >> 4, nib1 = b & 15;
          if (nib0 != 15)
            nibs.push(nib0);
          if (nib1 != 15)
            nibs.push(nib1);
          if (nib1 == 15)
            break;
        }
        var s = "";
        var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"];
        for (var i = 0; i < nibs.length; i++)
          s += chars[nibs[i]];
        val = parseFloat(s);
      }
      if (b0 <= 21) {
        var keys = [
          "version",
          "Notice",
          "FullName",
          "FamilyName",
          "Weight",
          "FontBBox",
          "BlueValues",
          "OtherBlues",
          "FamilyBlues",
          "FamilyOtherBlues",
          "StdHW",
          "StdVW",
          "escape",
          "UniqueID",
          "XUID",
          "charset",
          "Encoding",
          "CharStrings",
          "Private",
          "Subrs",
          "defaultWidthX",
          "nominalWidthX"
        ];
        key = keys[b0];
        vs = 1;
        if (b0 == 12) {
          var keys = [
            "Copyright",
            "isFixedPitch",
            "ItalicAngle",
            "UnderlinePosition",
            "UnderlineThickness",
            "PaintType",
            "CharstringType",
            "FontMatrix",
            "StrokeWidth",
            "BlueScale",
            "BlueShift",
            "BlueFuzz",
            "StemSnapH",
            "StemSnapV",
            "ForceBold",
            0,
            0,
            "LanguageGroup",
            "ExpansionFactor",
            "initialRandomSeed",
            "SyntheticBase",
            "PostScript",
            "BaseFontName",
            "BaseFontBlend",
            0,
            0,
            0,
            0,
            0,
            0,
            "ROS",
            "CIDFontVersion",
            "CIDFontRevision",
            "CIDFontType",
            "CIDCount",
            "UIDBase",
            "FDArray",
            "FDSelect",
            "FontName"
          ];
          key = keys[b1];
          vs = 2;
        }
      }
      if (key != null) {
        dict[key] = carr.length == 1 ? carr[0] : carr;
        carr = [];
      } else
        carr.push(val);
      offset += vs;
    }
    return dict;
  };
  Typr.cmap = {};
  Typr.cmap.parse = function(data, offset, length) {
    data = new Uint8Array(data.buffer, offset, length);
    offset = 0;
    var bin = Typr._bin;
    var obj = {};
    bin.readUshort(data, offset);
    offset += 2;
    var numTables = bin.readUshort(data, offset);
    offset += 2;
    var offs = [];
    obj.tables = [];
    for (var i = 0; i < numTables; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUint(data, offset);
      offset += 4;
      var id = "p" + platformID + "e" + encodingID;
      var tind = offs.indexOf(noffset);
      if (tind == -1) {
        tind = obj.tables.length;
        var subt;
        offs.push(noffset);
        var format = bin.readUshort(data, noffset);
        if (format == 0)
          subt = Typr.cmap.parse0(data, noffset);
        else if (format == 4)
          subt = Typr.cmap.parse4(data, noffset);
        else if (format == 6)
          subt = Typr.cmap.parse6(data, noffset);
        else if (format == 12)
          subt = Typr.cmap.parse12(data, noffset);
        else
          console.warn("unknown format: " + format, platformID, encodingID, noffset);
        obj.tables.push(subt);
      }
      if (obj[id] != null)
        throw "multiple tables for one platform+encoding";
      obj[id] = tind;
    }
    return obj;
  };
  Typr.cmap.parse0 = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    var len = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    obj.map = [];
    for (var i = 0; i < len - 6; i++)
      obj.map.push(data[offset + i]);
    return obj;
  };
  Typr.cmap.parse4 = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    var length = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    var segCountX2 = bin.readUshort(data, offset);
    offset += 2;
    var segCount = segCountX2 / 2;
    obj.searchRange = bin.readUshort(data, offset);
    offset += 2;
    obj.entrySelector = bin.readUshort(data, offset);
    offset += 2;
    obj.rangeShift = bin.readUshort(data, offset);
    offset += 2;
    obj.endCount = bin.readUshorts(data, offset, segCount);
    offset += segCount * 2;
    offset += 2;
    obj.startCount = bin.readUshorts(data, offset, segCount);
    offset += segCount * 2;
    obj.idDelta = [];
    for (var i = 0; i < segCount; i++) {
      obj.idDelta.push(bin.readShort(data, offset));
      offset += 2;
    }
    obj.idRangeOffset = bin.readUshorts(data, offset, segCount);
    offset += segCount * 2;
    obj.glyphIdArray = [];
    while (offset < offset0 + length) {
      obj.glyphIdArray.push(bin.readUshort(data, offset));
      offset += 2;
    }
    return obj;
  };
  Typr.cmap.parse6 = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    obj.firstCode = bin.readUshort(data, offset);
    offset += 2;
    var entryCount = bin.readUshort(data, offset);
    offset += 2;
    obj.glyphIdArray = [];
    for (var i = 0; i < entryCount; i++) {
      obj.glyphIdArray.push(bin.readUshort(data, offset));
      offset += 2;
    }
    return obj;
  };
  Typr.cmap.parse12 = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    offset += 2;
    bin.readUint(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    var nGroups = bin.readUint(data, offset);
    offset += 4;
    obj.groups = [];
    for (var i = 0; i < nGroups; i++) {
      var off = offset + i * 12;
      var startCharCode = bin.readUint(data, off + 0);
      var endCharCode = bin.readUint(data, off + 4);
      var startGlyphID = bin.readUint(data, off + 8);
      obj.groups.push([startCharCode, endCharCode, startGlyphID]);
    }
    return obj;
  };
  Typr.glyf = {};
  Typr.glyf.parse = function(data, offset, length, font) {
    var obj = [];
    for (var g = 0; g < font.maxp.numGlyphs; g++)
      obj.push(null);
    return obj;
  };
  Typr.glyf._parseGlyf = function(font, g) {
    var bin = Typr._bin;
    var data = font._data;
    var offset = Typr._tabOffset(data, "glyf", font._offset) + font.loca[g];
    if (font.loca[g] == font.loca[g + 1])
      return null;
    var gl = {};
    gl.noc = bin.readShort(data, offset);
    offset += 2;
    gl.xMin = bin.readShort(data, offset);
    offset += 2;
    gl.yMin = bin.readShort(data, offset);
    offset += 2;
    gl.xMax = bin.readShort(data, offset);
    offset += 2;
    gl.yMax = bin.readShort(data, offset);
    offset += 2;
    if (gl.xMin >= gl.xMax || gl.yMin >= gl.yMax)
      return null;
    if (gl.noc > 0) {
      gl.endPts = [];
      for (var i = 0; i < gl.noc; i++) {
        gl.endPts.push(bin.readUshort(data, offset));
        offset += 2;
      }
      var instructionLength = bin.readUshort(data, offset);
      offset += 2;
      if (data.length - offset < instructionLength)
        return null;
      gl.instructions = bin.readBytes(data, offset, instructionLength);
      offset += instructionLength;
      var crdnum = gl.endPts[gl.noc - 1] + 1;
      gl.flags = [];
      for (var i = 0; i < crdnum; i++) {
        var flag = data[offset];
        offset++;
        gl.flags.push(flag);
        if ((flag & 8) != 0) {
          var rep = data[offset];
          offset++;
          for (var j = 0; j < rep; j++) {
            gl.flags.push(flag);
            i++;
          }
        }
      }
      gl.xs = [];
      for (var i = 0; i < crdnum; i++) {
        var i8 = (gl.flags[i] & 2) != 0, same = (gl.flags[i] & 16) != 0;
        if (i8) {
          gl.xs.push(same ? data[offset] : -data[offset]);
          offset++;
        } else {
          if (same)
            gl.xs.push(0);
          else {
            gl.xs.push(bin.readShort(data, offset));
            offset += 2;
          }
        }
      }
      gl.ys = [];
      for (var i = 0; i < crdnum; i++) {
        var i8 = (gl.flags[i] & 4) != 0, same = (gl.flags[i] & 32) != 0;
        if (i8) {
          gl.ys.push(same ? data[offset] : -data[offset]);
          offset++;
        } else {
          if (same)
            gl.ys.push(0);
          else {
            gl.ys.push(bin.readShort(data, offset));
            offset += 2;
          }
        }
      }
      var x = 0, y = 0;
      for (var i = 0; i < crdnum; i++) {
        x += gl.xs[i];
        y += gl.ys[i];
        gl.xs[i] = x;
        gl.ys[i] = y;
      }
    } else {
      var ARG_1_AND_2_ARE_WORDS = 1 << 0;
      var ARGS_ARE_XY_VALUES = 1 << 1;
      var WE_HAVE_A_SCALE = 1 << 3;
      var MORE_COMPONENTS = 1 << 5;
      var WE_HAVE_AN_X_AND_Y_SCALE = 1 << 6;
      var WE_HAVE_A_TWO_BY_TWO = 1 << 7;
      var WE_HAVE_INSTRUCTIONS = 1 << 8;
      gl.parts = [];
      var flags;
      do {
        flags = bin.readUshort(data, offset);
        offset += 2;
        var part = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
        gl.parts.push(part);
        part.glyphIndex = bin.readUshort(data, offset);
        offset += 2;
        if (flags & ARG_1_AND_2_ARE_WORDS) {
          var arg1 = bin.readShort(data, offset);
          offset += 2;
          var arg2 = bin.readShort(data, offset);
          offset += 2;
        } else {
          var arg1 = bin.readInt8(data, offset);
          offset++;
          var arg2 = bin.readInt8(data, offset);
          offset++;
        }
        if (flags & ARGS_ARE_XY_VALUES) {
          part.m.tx = arg1;
          part.m.ty = arg2;
        } else {
          part.p1 = arg1;
          part.p2 = arg2;
        }
        if (flags & WE_HAVE_A_SCALE) {
          part.m.a = part.m.d = bin.readF2dot14(data, offset);
          offset += 2;
        } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
          part.m.a = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.d = bin.readF2dot14(data, offset);
          offset += 2;
        } else if (flags & WE_HAVE_A_TWO_BY_TWO) {
          part.m.a = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.b = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.c = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.d = bin.readF2dot14(data, offset);
          offset += 2;
        }
      } while (flags & MORE_COMPONENTS);
      if (flags & WE_HAVE_INSTRUCTIONS) {
        var numInstr = bin.readUshort(data, offset);
        offset += 2;
        gl.instr = [];
        for (var i = 0; i < numInstr; i++) {
          gl.instr.push(data[offset]);
          offset++;
        }
      }
    }
    return gl;
  };
  Typr.GPOS = {};
  Typr.GPOS.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GPOS.subt);
  };
  Typr.GPOS.subt = function(data, ltype, offset, ltable) {
    var bin = Typr._bin, offset0 = offset, tab = {};
    tab.fmt = bin.readUshort(data, offset);
    offset += 2;
    if (ltype == 1 || ltype == 2 || ltype == 3 || ltype == 7 || ltype == 8 && tab.fmt <= 2) {
      var covOff = bin.readUshort(data, offset);
      offset += 2;
      tab.coverage = Typr._lctf.readCoverage(data, covOff + offset0);
    }
    if (ltype == 1 && tab.fmt == 1) {
      var valFmt1 = bin.readUshort(data, offset);
      offset += 2;
      var ones1 = Typr._lctf.numOfOnes(valFmt1);
      if (valFmt1 != 0)
        tab.pos = Typr.GPOS.readValueRecord(data, offset, valFmt1);
    } else if (ltype == 2 && tab.fmt >= 1 && tab.fmt <= 2) {
      var valFmt1 = bin.readUshort(data, offset);
      offset += 2;
      var valFmt2 = bin.readUshort(data, offset);
      offset += 2;
      var ones1 = Typr._lctf.numOfOnes(valFmt1);
      var ones2 = Typr._lctf.numOfOnes(valFmt2);
      if (tab.fmt == 1) {
        tab.pairsets = [];
        var psc = bin.readUshort(data, offset);
        offset += 2;
        for (var i = 0; i < psc; i++) {
          var psoff = offset0 + bin.readUshort(data, offset);
          offset += 2;
          var pvc = bin.readUshort(data, psoff);
          psoff += 2;
          var arr = [];
          for (var j = 0; j < pvc; j++) {
            var gid2 = bin.readUshort(data, psoff);
            psoff += 2;
            var value1, value2;
            if (valFmt1 != 0) {
              value1 = Typr.GPOS.readValueRecord(data, psoff, valFmt1);
              psoff += ones1 * 2;
            }
            if (valFmt2 != 0) {
              value2 = Typr.GPOS.readValueRecord(data, psoff, valFmt2);
              psoff += ones2 * 2;
            }
            arr.push({ gid2, val1: value1, val2: value2 });
          }
          tab.pairsets.push(arr);
        }
      }
      if (tab.fmt == 2) {
        var classDef1 = bin.readUshort(data, offset);
        offset += 2;
        var classDef2 = bin.readUshort(data, offset);
        offset += 2;
        var class1Count = bin.readUshort(data, offset);
        offset += 2;
        var class2Count = bin.readUshort(data, offset);
        offset += 2;
        tab.classDef1 = Typr._lctf.readClassDef(data, offset0 + classDef1);
        tab.classDef2 = Typr._lctf.readClassDef(data, offset0 + classDef2);
        tab.matrix = [];
        for (var i = 0; i < class1Count; i++) {
          var row = [];
          for (var j = 0; j < class2Count; j++) {
            var value1 = null, value2 = null;
            if (valFmt1 != 0) {
              value1 = Typr.GPOS.readValueRecord(data, offset, valFmt1);
              offset += ones1 * 2;
            }
            if (valFmt2 != 0) {
              value2 = Typr.GPOS.readValueRecord(data, offset, valFmt2);
              offset += ones2 * 2;
            }
            row.push({ val1: value1, val2: value2 });
          }
          tab.matrix.push(row);
        }
      }
    } else if (ltype == 9 && tab.fmt == 1) {
      var extType = bin.readUshort(data, offset);
      offset += 2;
      var extOffset = bin.readUint(data, offset);
      offset += 4;
      if (ltable.ltype == 9) {
        ltable.ltype = extType;
      } else if (ltable.ltype != extType) {
        throw "invalid extension substitution";
      }
      return Typr.GPOS.subt(data, ltable.ltype, offset0 + extOffset);
    } else
      console.warn("unsupported GPOS table LookupType", ltype, "format", tab.fmt);
    return tab;
  };
  Typr.GPOS.readValueRecord = function(data, offset, valFmt) {
    var bin = Typr._bin;
    var arr = [];
    arr.push(valFmt & 1 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 1 ? 2 : 0;
    arr.push(valFmt & 2 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 2 ? 2 : 0;
    arr.push(valFmt & 4 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 4 ? 2 : 0;
    arr.push(valFmt & 8 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 8 ? 2 : 0;
    return arr;
  };
  Typr.GSUB = {};
  Typr.GSUB.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GSUB.subt);
  };
  Typr.GSUB.subt = function(data, ltype, offset, ltable) {
    var bin = Typr._bin, offset0 = offset, tab = {};
    tab.fmt = bin.readUshort(data, offset);
    offset += 2;
    if (ltype != 1 && ltype != 4 && ltype != 5 && ltype != 6)
      return null;
    if (ltype == 1 || ltype == 4 || ltype == 5 && tab.fmt <= 2 || ltype == 6 && tab.fmt <= 2) {
      var covOff = bin.readUshort(data, offset);
      offset += 2;
      tab.coverage = Typr._lctf.readCoverage(data, offset0 + covOff);
    }
    if (ltype == 1 && tab.fmt >= 1 && tab.fmt <= 2) {
      if (tab.fmt == 1) {
        tab.delta = bin.readShort(data, offset);
        offset += 2;
      } else if (tab.fmt == 2) {
        var cnt = bin.readUshort(data, offset);
        offset += 2;
        tab.newg = bin.readUshorts(data, offset, cnt);
        offset += tab.newg.length * 2;
      }
    } else if (ltype == 4) {
      tab.vals = [];
      var cnt = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < cnt; i++) {
        var loff = bin.readUshort(data, offset);
        offset += 2;
        tab.vals.push(Typr.GSUB.readLigatureSet(data, offset0 + loff));
      }
    } else if (ltype == 5 && tab.fmt == 2) {
      if (tab.fmt == 2) {
        var cDefOffset = bin.readUshort(data, offset);
        offset += 2;
        tab.cDef = Typr._lctf.readClassDef(data, offset0 + cDefOffset);
        tab.scset = [];
        var subClassSetCount = bin.readUshort(data, offset);
        offset += 2;
        for (var i = 0; i < subClassSetCount; i++) {
          var scsOff = bin.readUshort(data, offset);
          offset += 2;
          tab.scset.push(scsOff == 0 ? null : Typr.GSUB.readSubClassSet(data, offset0 + scsOff));
        }
      }
    } else if (ltype == 6 && tab.fmt == 3) {
      if (tab.fmt == 3) {
        for (var i = 0; i < 3; i++) {
          var cnt = bin.readUshort(data, offset);
          offset += 2;
          var cvgs = [];
          for (var j = 0; j < cnt; j++)
            cvgs.push(Typr._lctf.readCoverage(data, offset0 + bin.readUshort(data, offset + j * 2)));
          offset += cnt * 2;
          if (i == 0)
            tab.backCvg = cvgs;
          if (i == 1)
            tab.inptCvg = cvgs;
          if (i == 2)
            tab.ahedCvg = cvgs;
        }
        var cnt = bin.readUshort(data, offset);
        offset += 2;
        tab.lookupRec = Typr.GSUB.readSubstLookupRecords(data, offset, cnt);
      }
    } else if (ltype == 7 && tab.fmt == 1) {
      var extType = bin.readUshort(data, offset);
      offset += 2;
      var extOffset = bin.readUint(data, offset);
      offset += 4;
      if (ltable.ltype == 9) {
        ltable.ltype = extType;
      } else if (ltable.ltype != extType) {
        throw "invalid extension substitution";
      }
      return Typr.GSUB.subt(data, ltable.ltype, offset0 + extOffset);
    } else
      console.warn("unsupported GSUB table LookupType", ltype, "format", tab.fmt);
    return tab;
  };
  Typr.GSUB.readSubClassSet = function(data, offset) {
    var rUs = Typr._bin.readUshort, offset0 = offset, lset = [];
    var cnt = rUs(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = rUs(data, offset);
      offset += 2;
      lset.push(Typr.GSUB.readSubClassRule(data, offset0 + loff));
    }
    return lset;
  };
  Typr.GSUB.readSubClassRule = function(data, offset) {
    var rUs = Typr._bin.readUshort, rule = {};
    var gcount = rUs(data, offset);
    offset += 2;
    var scount = rUs(data, offset);
    offset += 2;
    rule.input = [];
    for (var i = 0; i < gcount - 1; i++) {
      rule.input.push(rUs(data, offset));
      offset += 2;
    }
    rule.substLookupRecords = Typr.GSUB.readSubstLookupRecords(data, offset, scount);
    return rule;
  };
  Typr.GSUB.readSubstLookupRecords = function(data, offset, cnt) {
    var rUs = Typr._bin.readUshort;
    var out = [];
    for (var i = 0; i < cnt; i++) {
      out.push(rUs(data, offset), rUs(data, offset + 2));
      offset += 4;
    }
    return out;
  };
  Typr.GSUB.readChainSubClassSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [];
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = bin.readUshort(data, offset);
      offset += 2;
      lset.push(Typr.GSUB.readChainSubClassRule(data, offset0 + loff));
    }
    return lset;
  };
  Typr.GSUB.readChainSubClassRule = function(data, offset) {
    var bin = Typr._bin, rule = {};
    var pps = ["backtrack", "input", "lookahead"];
    for (var pi = 0; pi < pps.length; pi++) {
      var cnt = bin.readUshort(data, offset);
      offset += 2;
      if (pi == 1)
        cnt--;
      rule[pps[pi]] = bin.readUshorts(data, offset, cnt);
      offset += rule[pps[pi]].length * 2;
    }
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    rule.subst = bin.readUshorts(data, offset, cnt * 2);
    offset += rule.subst.length * 2;
    return rule;
  };
  Typr.GSUB.readLigatureSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [];
    var lcnt = bin.readUshort(data, offset);
    offset += 2;
    for (var j = 0; j < lcnt; j++) {
      var loff = bin.readUshort(data, offset);
      offset += 2;
      lset.push(Typr.GSUB.readLigature(data, offset0 + loff));
    }
    return lset;
  };
  Typr.GSUB.readLigature = function(data, offset) {
    var bin = Typr._bin, lig = { chain: [] };
    lig.nglyph = bin.readUshort(data, offset);
    offset += 2;
    var ccnt = bin.readUshort(data, offset);
    offset += 2;
    for (var k = 0; k < ccnt - 1; k++) {
      lig.chain.push(bin.readUshort(data, offset));
      offset += 2;
    }
    return lig;
  };
  Typr.head = {};
  Typr.head.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    bin.readFixed(data, offset);
    offset += 4;
    obj.fontRevision = bin.readFixed(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    obj.flags = bin.readUshort(data, offset);
    offset += 2;
    obj.unitsPerEm = bin.readUshort(data, offset);
    offset += 2;
    obj.created = bin.readUint64(data, offset);
    offset += 8;
    obj.modified = bin.readUint64(data, offset);
    offset += 8;
    obj.xMin = bin.readShort(data, offset);
    offset += 2;
    obj.yMin = bin.readShort(data, offset);
    offset += 2;
    obj.xMax = bin.readShort(data, offset);
    offset += 2;
    obj.yMax = bin.readShort(data, offset);
    offset += 2;
    obj.macStyle = bin.readUshort(data, offset);
    offset += 2;
    obj.lowestRecPPEM = bin.readUshort(data, offset);
    offset += 2;
    obj.fontDirectionHint = bin.readShort(data, offset);
    offset += 2;
    obj.indexToLocFormat = bin.readShort(data, offset);
    offset += 2;
    obj.glyphDataFormat = bin.readShort(data, offset);
    offset += 2;
    return obj;
  };
  Typr.hhea = {};
  Typr.hhea.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    bin.readFixed(data, offset);
    offset += 4;
    obj.ascender = bin.readShort(data, offset);
    offset += 2;
    obj.descender = bin.readShort(data, offset);
    offset += 2;
    obj.lineGap = bin.readShort(data, offset);
    offset += 2;
    obj.advanceWidthMax = bin.readUshort(data, offset);
    offset += 2;
    obj.minLeftSideBearing = bin.readShort(data, offset);
    offset += 2;
    obj.minRightSideBearing = bin.readShort(data, offset);
    offset += 2;
    obj.xMaxExtent = bin.readShort(data, offset);
    offset += 2;
    obj.caretSlopeRise = bin.readShort(data, offset);
    offset += 2;
    obj.caretSlopeRun = bin.readShort(data, offset);
    offset += 2;
    obj.caretOffset = bin.readShort(data, offset);
    offset += 2;
    offset += 4 * 2;
    obj.metricDataFormat = bin.readShort(data, offset);
    offset += 2;
    obj.numberOfHMetrics = bin.readUshort(data, offset);
    offset += 2;
    return obj;
  };
  Typr.hmtx = {};
  Typr.hmtx.parse = function(data, offset, length, font) {
    var bin = Typr._bin;
    var obj = {};
    obj.aWidth = [];
    obj.lsBearing = [];
    var aw = 0, lsb = 0;
    for (var i = 0; i < font.maxp.numGlyphs; i++) {
      if (i < font.hhea.numberOfHMetrics) {
        aw = bin.readUshort(data, offset);
        offset += 2;
        lsb = bin.readShort(data, offset);
        offset += 2;
      }
      obj.aWidth.push(aw);
      obj.lsBearing.push(lsb);
    }
    return obj;
  };
  Typr.kern = {};
  Typr.kern.parse = function(data, offset, length, font) {
    var bin = Typr._bin;
    var version = bin.readUshort(data, offset);
    offset += 2;
    if (version == 1)
      return Typr.kern.parseV1(data, offset - 2, length, font);
    var nTables = bin.readUshort(data, offset);
    offset += 2;
    var map2 = { glyph1: [], rval: [] };
    for (var i = 0; i < nTables; i++) {
      offset += 2;
      var length = bin.readUshort(data, offset);
      offset += 2;
      var coverage = bin.readUshort(data, offset);
      offset += 2;
      var format = coverage >>> 8;
      format &= 15;
      if (format == 0)
        offset = Typr.kern.readFormat0(data, offset, map2);
      else
        throw "unknown kern table format: " + format;
    }
    return map2;
  };
  Typr.kern.parseV1 = function(data, offset, length, font) {
    var bin = Typr._bin;
    bin.readFixed(data, offset);
    offset += 4;
    var nTables = bin.readUint(data, offset);
    offset += 4;
    var map2 = { glyph1: [], rval: [] };
    for (var i = 0; i < nTables; i++) {
      bin.readUint(data, offset);
      offset += 4;
      var coverage = bin.readUshort(data, offset);
      offset += 2;
      bin.readUshort(data, offset);
      offset += 2;
      var format = coverage >>> 8;
      format &= 15;
      if (format == 0)
        offset = Typr.kern.readFormat0(data, offset, map2);
      else
        throw "unknown kern table format: " + format;
    }
    return map2;
  };
  Typr.kern.readFormat0 = function(data, offset, map2) {
    var bin = Typr._bin;
    var pleft = -1;
    var nPairs = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    for (var j = 0; j < nPairs; j++) {
      var left = bin.readUshort(data, offset);
      offset += 2;
      var right = bin.readUshort(data, offset);
      offset += 2;
      var value = bin.readShort(data, offset);
      offset += 2;
      if (left != pleft) {
        map2.glyph1.push(left);
        map2.rval.push({ glyph2: [], vals: [] });
      }
      var rval = map2.rval[map2.rval.length - 1];
      rval.glyph2.push(right);
      rval.vals.push(value);
      pleft = left;
    }
    return offset;
  };
  Typr.loca = {};
  Typr.loca.parse = function(data, offset, length, font) {
    var bin = Typr._bin;
    var obj = [];
    var ver = font.head.indexToLocFormat;
    var len = font.maxp.numGlyphs + 1;
    if (ver == 0)
      for (var i = 0; i < len; i++)
        obj.push(bin.readUshort(data, offset + (i << 1)) << 1);
    if (ver == 1)
      for (var i = 0; i < len; i++)
        obj.push(bin.readUint(data, offset + (i << 2)));
    return obj;
  };
  Typr.maxp = {};
  Typr.maxp.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    var ver = bin.readUint(data, offset);
    offset += 4;
    obj.numGlyphs = bin.readUshort(data, offset);
    offset += 2;
    if (ver == 65536) {
      obj.maxPoints = bin.readUshort(data, offset);
      offset += 2;
      obj.maxContours = bin.readUshort(data, offset);
      offset += 2;
      obj.maxCompositePoints = bin.readUshort(data, offset);
      offset += 2;
      obj.maxCompositeContours = bin.readUshort(data, offset);
      offset += 2;
      obj.maxZones = bin.readUshort(data, offset);
      offset += 2;
      obj.maxTwilightPoints = bin.readUshort(data, offset);
      offset += 2;
      obj.maxStorage = bin.readUshort(data, offset);
      offset += 2;
      obj.maxFunctionDefs = bin.readUshort(data, offset);
      offset += 2;
      obj.maxInstructionDefs = bin.readUshort(data, offset);
      offset += 2;
      obj.maxStackElements = bin.readUshort(data, offset);
      offset += 2;
      obj.maxSizeOfInstructions = bin.readUshort(data, offset);
      offset += 2;
      obj.maxComponentElements = bin.readUshort(data, offset);
      offset += 2;
      obj.maxComponentDepth = bin.readUshort(data, offset);
      offset += 2;
    }
    return obj;
  };
  Typr.name = {};
  Typr.name.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    bin.readUshort(data, offset);
    offset += 2;
    var count = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    var names = [
      "copyright",
      "fontFamily",
      "fontSubfamily",
      "ID",
      "fullName",
      "version",
      "postScriptName",
      "trademark",
      "manufacturer",
      "designer",
      "description",
      "urlVendor",
      "urlDesigner",
      "licence",
      "licenceURL",
      "---",
      "typoFamilyName",
      "typoSubfamilyName",
      "compatibleFull",
      "sampleText",
      "postScriptCID",
      "wwsFamilyName",
      "wwsSubfamilyName",
      "lightPalette",
      "darkPalette"
    ];
    var offset0 = offset;
    for (var i = 0; i < count; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var languageID = bin.readUshort(data, offset);
      offset += 2;
      var nameID = bin.readUshort(data, offset);
      offset += 2;
      var slen = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUshort(data, offset);
      offset += 2;
      var cname = names[nameID];
      var soff = offset0 + count * 12 + noffset;
      var str;
      if (platformID == 0)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (platformID == 3 && encodingID == 0)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (encodingID == 0)
        str = bin.readASCII(data, soff, slen);
      else if (encodingID == 1)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (encodingID == 3)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (platformID == 1) {
        str = bin.readASCII(data, soff, slen);
        console.warn("reading unknown MAC encoding " + encodingID + " as ASCII");
      } else
        throw "unknown encoding " + encodingID + ", platformID: " + platformID;
      var tid = "p" + platformID + "," + languageID.toString(16);
      if (obj[tid] == null)
        obj[tid] = {};
      obj[tid][cname !== void 0 ? cname : nameID] = str;
      obj[tid]._lang = languageID;
    }
    for (var p in obj)
      if (obj[p].postScriptName != null && obj[p]._lang == 1033)
        return obj[p];
    for (var p in obj)
      if (obj[p].postScriptName != null && obj[p]._lang == 0)
        return obj[p];
    for (var p in obj)
      if (obj[p].postScriptName != null && obj[p]._lang == 3084)
        return obj[p];
    for (var p in obj)
      if (obj[p].postScriptName != null)
        return obj[p];
    var tname;
    for (var p in obj) {
      tname = p;
      break;
    }
    console.warn("returning name table with languageID " + obj[tname]._lang);
    return obj[tname];
  };
  Typr["OS/2"] = {};
  Typr["OS/2"].parse = function(data, offset, length) {
    var bin = Typr._bin;
    var ver = bin.readUshort(data, offset);
    offset += 2;
    var obj = {};
    if (ver == 0)
      Typr["OS/2"].version0(data, offset, obj);
    else if (ver == 1)
      Typr["OS/2"].version1(data, offset, obj);
    else if (ver == 2 || ver == 3 || ver == 4)
      Typr["OS/2"].version2(data, offset, obj);
    else if (ver == 5)
      Typr["OS/2"].version5(data, offset, obj);
    else
      throw "unknown OS/2 table version: " + ver;
    return obj;
  };
  Typr["OS/2"].version0 = function(data, offset, obj) {
    var bin = Typr._bin;
    obj.xAvgCharWidth = bin.readShort(data, offset);
    offset += 2;
    obj.usWeightClass = bin.readUshort(data, offset);
    offset += 2;
    obj.usWidthClass = bin.readUshort(data, offset);
    offset += 2;
    obj.fsType = bin.readUshort(data, offset);
    offset += 2;
    obj.ySubscriptXSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySubscriptYSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySubscriptXOffset = bin.readShort(data, offset);
    offset += 2;
    obj.ySubscriptYOffset = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptXSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptYSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptXOffset = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptYOffset = bin.readShort(data, offset);
    offset += 2;
    obj.yStrikeoutSize = bin.readShort(data, offset);
    offset += 2;
    obj.yStrikeoutPosition = bin.readShort(data, offset);
    offset += 2;
    obj.sFamilyClass = bin.readShort(data, offset);
    offset += 2;
    obj.panose = bin.readBytes(data, offset, 10);
    offset += 10;
    obj.ulUnicodeRange1 = bin.readUint(data, offset);
    offset += 4;
    obj.ulUnicodeRange2 = bin.readUint(data, offset);
    offset += 4;
    obj.ulUnicodeRange3 = bin.readUint(data, offset);
    offset += 4;
    obj.ulUnicodeRange4 = bin.readUint(data, offset);
    offset += 4;
    obj.achVendID = [bin.readInt8(data, offset), bin.readInt8(data, offset + 1), bin.readInt8(data, offset + 2), bin.readInt8(data, offset + 3)];
    offset += 4;
    obj.fsSelection = bin.readUshort(data, offset);
    offset += 2;
    obj.usFirstCharIndex = bin.readUshort(data, offset);
    offset += 2;
    obj.usLastCharIndex = bin.readUshort(data, offset);
    offset += 2;
    obj.sTypoAscender = bin.readShort(data, offset);
    offset += 2;
    obj.sTypoDescender = bin.readShort(data, offset);
    offset += 2;
    obj.sTypoLineGap = bin.readShort(data, offset);
    offset += 2;
    obj.usWinAscent = bin.readUshort(data, offset);
    offset += 2;
    obj.usWinDescent = bin.readUshort(data, offset);
    offset += 2;
    return offset;
  };
  Typr["OS/2"].version1 = function(data, offset, obj) {
    var bin = Typr._bin;
    offset = Typr["OS/2"].version0(data, offset, obj);
    obj.ulCodePageRange1 = bin.readUint(data, offset);
    offset += 4;
    obj.ulCodePageRange2 = bin.readUint(data, offset);
    offset += 4;
    return offset;
  };
  Typr["OS/2"].version2 = function(data, offset, obj) {
    var bin = Typr._bin;
    offset = Typr["OS/2"].version1(data, offset, obj);
    obj.sxHeight = bin.readShort(data, offset);
    offset += 2;
    obj.sCapHeight = bin.readShort(data, offset);
    offset += 2;
    obj.usDefault = bin.readUshort(data, offset);
    offset += 2;
    obj.usBreak = bin.readUshort(data, offset);
    offset += 2;
    obj.usMaxContext = bin.readUshort(data, offset);
    offset += 2;
    return offset;
  };
  Typr["OS/2"].version5 = function(data, offset, obj) {
    var bin = Typr._bin;
    offset = Typr["OS/2"].version2(data, offset, obj);
    obj.usLowerOpticalPointSize = bin.readUshort(data, offset);
    offset += 2;
    obj.usUpperOpticalPointSize = bin.readUshort(data, offset);
    offset += 2;
    return offset;
  };
  Typr.post = {};
  Typr.post.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    obj.version = bin.readFixed(data, offset);
    offset += 4;
    obj.italicAngle = bin.readFixed(data, offset);
    offset += 4;
    obj.underlinePosition = bin.readShort(data, offset);
    offset += 2;
    obj.underlineThickness = bin.readShort(data, offset);
    offset += 2;
    return obj;
  };
  Typr.SVG = {};
  Typr.SVG.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = { entries: [] };
    var offset0 = offset;
    bin.readUshort(data, offset);
    offset += 2;
    var svgDocIndexOffset = bin.readUint(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    offset = svgDocIndexOffset + offset0;
    var numEntries = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < numEntries; i++) {
      var startGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var endGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var svgDocOffset = bin.readUint(data, offset);
      offset += 4;
      var svgDocLength = bin.readUint(data, offset);
      offset += 4;
      var sbuf = new Uint8Array(data.buffer, offset0 + svgDocOffset + svgDocIndexOffset, svgDocLength);
      var svg = bin.readUTF8(sbuf, 0, sbuf.length);
      for (var f = startGlyphID; f <= endGlyphID; f++) {
        obj.entries[f] = svg;
      }
    }
    return obj;
  };
  Typr.SVG.toPath = function(str) {
    var pth = { cmds: [], crds: [] };
    if (str == null)
      return pth;
    var prsr = new DOMParser();
    var doc = prsr["parseFromString"](str, "image/svg+xml");
    var svg = doc.firstChild;
    while (svg.tagName != "svg")
      svg = svg.nextSibling;
    var vb = svg.getAttribute("viewBox");
    if (vb)
      vb = vb.trim().split(" ").map(parseFloat);
    else
      vb = [0, 0, 1e3, 1e3];
    Typr.SVG._toPath(svg.children, pth);
    for (var i = 0; i < pth.crds.length; i += 2) {
      var x = pth.crds[i], y = pth.crds[i + 1];
      x -= vb[0];
      y -= vb[1];
      y = -y;
      pth.crds[i] = x;
      pth.crds[i + 1] = y;
    }
    return pth;
  };
  Typr.SVG._toPath = function(nds, pth, fill) {
    for (var ni = 0; ni < nds.length; ni++) {
      var nd = nds[ni], tn = nd.tagName;
      var cfl = nd.getAttribute("fill");
      if (cfl == null)
        cfl = fill;
      if (tn == "g")
        Typr.SVG._toPath(nd.children, pth, cfl);
      else if (tn == "path") {
        pth.cmds.push(cfl ? cfl : "#000000");
        var d = nd.getAttribute("d");
        var toks = Typr.SVG._tokens(d);
        Typr.SVG._toksToPath(toks, pth);
        pth.cmds.push("X");
      } else if (tn == "defs")
        ;
      else
        console.warn(tn, nd);
    }
  };
  Typr.SVG._tokens = function(d) {
    var ts = [], off = 0, rn = false, cn = "";
    while (off < d.length) {
      var cc = d.charCodeAt(off), ch = d.charAt(off);
      off++;
      var isNum = 48 <= cc && cc <= 57 || ch == "." || ch == "-";
      if (rn) {
        if (ch == "-") {
          ts.push(parseFloat(cn));
          cn = ch;
        } else if (isNum)
          cn += ch;
        else {
          ts.push(parseFloat(cn));
          if (ch != "," && ch != " ")
            ts.push(ch);
          rn = false;
        }
      } else {
        if (isNum) {
          cn = ch;
          rn = true;
        } else if (ch != "," && ch != " ")
          ts.push(ch);
      }
    }
    if (rn)
      ts.push(parseFloat(cn));
    return ts;
  };
  Typr.SVG._toksToPath = function(ts, pth) {
    var i = 0, x = 0, y = 0, ox = 0, oy = 0;
    var pc = { "M": 2, "L": 2, "H": 1, "V": 1, "S": 4, "C": 6 };
    var cmds = pth.cmds, crds = pth.crds;
    while (i < ts.length) {
      var cmd = ts[i];
      i++;
      if (cmd == "z") {
        cmds.push("Z");
        x = ox;
        y = oy;
      } else {
        var cmu = cmd.toUpperCase();
        var ps = pc[cmu], reps = Typr.SVG._reps(ts, i, ps);
        for (var j = 0; j < reps; j++) {
          var xi = 0, yi = 0;
          if (cmd != cmu) {
            xi = x;
            yi = y;
          }
          if (cmu == "M") {
            x = xi + ts[i++];
            y = yi + ts[i++];
            cmds.push("M");
            crds.push(x, y);
            ox = x;
            oy = y;
          } else if (cmu == "L") {
            x = xi + ts[i++];
            y = yi + ts[i++];
            cmds.push("L");
            crds.push(x, y);
          } else if (cmu == "H") {
            x = xi + ts[i++];
            cmds.push("L");
            crds.push(x, y);
          } else if (cmu == "V") {
            y = yi + ts[i++];
            cmds.push("L");
            crds.push(x, y);
          } else if (cmu == "C") {
            var x1 = xi + ts[i++], y1 = yi + ts[i++], x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C");
            crds.push(x1, y1, x2, y2, x3, y3);
            x = x3;
            y = y3;
          } else if (cmu == "S") {
            var co = Math.max(crds.length - 4, 0);
            var x1 = x + x - crds[co], y1 = y + y - crds[co + 1];
            var x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C");
            crds.push(x1, y1, x2, y2, x3, y3);
            x = x3;
            y = y3;
          } else
            console.warn("Unknown SVG command " + cmd);
        }
      }
    }
  };
  Typr.SVG._reps = function(ts, off, ps) {
    var i = off;
    while (i < ts.length) {
      if (typeof ts[i] == "string")
        break;
      i += ps;
    }
    return (i - off) / ps;
  };
  if (Typr == null)
    Typr = {};
  if (Typr.U == null)
    Typr.U = {};
  Typr.U.codeToGlyph = function(font, code) {
    var cmap = font.cmap;
    for (var _i = 0, _a = [cmap.p0e4, cmap.p3e1, cmap.p3e10, cmap.p0e3, cmap.p1e0]; _i < _a.length; _i++) {
      var tind = _a[_i];
      if (tind == null)
        continue;
      var tab = cmap.tables[tind];
      if (tab.format == 0) {
        if (code >= tab.map.length)
          continue;
        return tab.map[code];
      } else if (tab.format == 4) {
        var sind = -1;
        for (var i = 0; i < tab.endCount.length; i++) {
          if (code <= tab.endCount[i]) {
            sind = i;
            break;
          }
        }
        if (sind == -1)
          continue;
        if (tab.startCount[sind] > code)
          continue;
        var gli = 0;
        if (tab.idRangeOffset[sind] != 0) {
          gli = tab.glyphIdArray[code - tab.startCount[sind] + (tab.idRangeOffset[sind] >> 1) - (tab.idRangeOffset.length - sind)];
        } else {
          gli = code + tab.idDelta[sind];
        }
        return gli & 65535;
      } else if (tab.format == 12) {
        if (code > tab.groups[tab.groups.length - 1][1])
          continue;
        for (var i = 0; i < tab.groups.length; i++) {
          var grp = tab.groups[i];
          if (grp[0] <= code && code <= grp[1])
            return grp[2] + (code - grp[0]);
        }
        continue;
      } else {
        throw "unknown cmap table format " + tab.format;
      }
    }
    return 0;
  };
  Typr.U.glyphToPath = function(font, gid) {
    var path = { cmds: [], crds: [] };
    if (font.SVG && font.SVG.entries[gid]) {
      var p = font.SVG.entries[gid];
      if (p == null)
        return path;
      if (typeof p == "string") {
        p = Typr.SVG.toPath(p);
        font.SVG.entries[gid] = p;
      }
      return p;
    } else if (font.CFF) {
      var state = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: false, width: font.CFF.Private ? font.CFF.Private.defaultWidthX : 0, open: false };
      var cff = font.CFF, pdct = font.CFF.Private;
      if (cff.ROS) {
        var gi = 0;
        while (cff.FDSelect[gi + 2] <= gid)
          gi += 2;
        pdct = cff.FDArray[cff.FDSelect[gi + 1]].Private;
      }
      Typr.U._drawCFF(font.CFF.CharStrings[gid], state, cff, pdct, path);
    } else if (font.glyf) {
      Typr.U._drawGlyf(gid, font, path);
    }
    return path;
  };
  Typr.U._drawGlyf = function(gid, font, path) {
    var gl = font.glyf[gid];
    if (gl == null)
      gl = font.glyf[gid] = Typr.glyf._parseGlyf(font, gid);
    if (gl != null) {
      if (gl.noc > -1) {
        Typr.U._simpleGlyph(gl, path);
      } else {
        Typr.U._compoGlyph(gl, font, path);
      }
    }
  };
  Typr.U._simpleGlyph = function(gl, p) {
    for (var c = 0; c < gl.noc; c++) {
      var i0 = c == 0 ? 0 : gl.endPts[c - 1] + 1;
      var il = gl.endPts[c];
      for (var i = i0; i <= il; i++) {
        var pr = i == i0 ? il : i - 1;
        var nx = i == il ? i0 : i + 1;
        var onCurve = gl.flags[i] & 1;
        var prOnCurve = gl.flags[pr] & 1;
        var nxOnCurve = gl.flags[nx] & 1;
        var x = gl.xs[i], y = gl.ys[i];
        if (i == i0) {
          if (onCurve) {
            if (prOnCurve) {
              Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);
            } else {
              Typr.U.P.moveTo(p, x, y);
              continue;
            }
          } else {
            if (prOnCurve) {
              Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);
            } else {
              Typr.U.P.moveTo(p, (gl.xs[pr] + x) / 2, (gl.ys[pr] + y) / 2);
            }
          }
        }
        if (onCurve) {
          if (prOnCurve)
            Typr.U.P.lineTo(p, x, y);
        } else {
          if (nxOnCurve) {
            Typr.U.P.qcurveTo(p, x, y, gl.xs[nx], gl.ys[nx]);
          } else {
            Typr.U.P.qcurveTo(p, x, y, (x + gl.xs[nx]) / 2, (y + gl.ys[nx]) / 2);
          }
        }
      }
      Typr.U.P.closePath(p);
    }
  };
  Typr.U._compoGlyph = function(gl, font, p) {
    for (var j = 0; j < gl.parts.length; j++) {
      var path = { cmds: [], crds: [] };
      var prt = gl.parts[j];
      Typr.U._drawGlyf(prt.glyphIndex, font, path);
      var m = prt.m;
      for (var i = 0; i < path.crds.length; i += 2) {
        var x = path.crds[i], y = path.crds[i + 1];
        p.crds.push(x * m.a + y * m.b + m.tx);
        p.crds.push(x * m.c + y * m.d + m.ty);
      }
      for (var i = 0; i < path.cmds.length; i++) {
        p.cmds.push(path.cmds[i]);
      }
    }
  };
  Typr.U._getGlyphClass = function(g, cd) {
    var intr = Typr._lctf.getInterval(cd, g);
    return intr == -1 ? 0 : cd[intr + 2];
  };
  Typr.U.getPairAdjustment = function(font, g1, g2) {
    var hasGPOSkern = false;
    if (font.GPOS) {
      var gpos = font["GPOS"];
      var llist = gpos.lookupList, flist = gpos.featureList;
      var tused = [];
      for (var i = 0; i < flist.length; i++) {
        var fl = flist[i];
        if (fl.tag != "kern")
          continue;
        hasGPOSkern = true;
        for (var ti = 0; ti < fl.tab.length; ti++) {
          if (tused[fl.tab[ti]])
            continue;
          tused[fl.tab[ti]] = true;
          var tab = llist[fl.tab[ti]];
          for (var j = 0; j < tab.tabs.length; j++) {
            if (tab.tabs[j] == null)
              continue;
            var ltab = tab.tabs[j], ind;
            if (ltab.coverage) {
              ind = Typr._lctf.coverageIndex(ltab.coverage, g1);
              if (ind == -1)
                continue;
            }
            if (tab.ltype == 1)
              ;
            else if (tab.ltype == 2) {
              var adj = null;
              if (ltab.fmt == 1) {
                var right = ltab.pairsets[ind];
                for (var i = 0; i < right.length; i++) {
                  if (right[i].gid2 == g2)
                    adj = right[i];
                }
              } else if (ltab.fmt == 2) {
                var c1 = Typr.U._getGlyphClass(g1, ltab.classDef1);
                var c2 = Typr.U._getGlyphClass(g2, ltab.classDef2);
                adj = ltab.matrix[c1][c2];
              }
              if (adj) {
                var offset = 0;
                if (adj.val1 && adj.val1[2])
                  offset += adj.val1[2];
                if (adj.val2 && adj.val2[0])
                  offset += adj.val2[0];
                return offset;
              }
            }
          }
        }
      }
    }
    if (font.kern && !hasGPOSkern) {
      var ind1 = font.kern.glyph1.indexOf(g1);
      if (ind1 != -1) {
        var ind2 = font.kern.rval[ind1].glyph2.indexOf(g2);
        if (ind2 != -1)
          return font.kern.rval[ind1].vals[ind2];
      }
    }
    return 0;
  };
  Typr.U.stringToGlyphs = function(font, str) {
    var gls = [];
    for (var i = 0; i < str.length; i++) {
      var cc = str.codePointAt(i);
      if (cc > 65535)
        i++;
      gls.push(Typr.U.codeToGlyph(font, cc));
    }
    for (var i = 0; i < str.length; i++) {
      var cc = str.codePointAt(i);
      if (cc == 2367) {
        var t = gls[i - 1];
        gls[i - 1] = gls[i];
        gls[i] = t;
      }
      if (cc > 65535)
        i++;
    }
    var gsub = font["GSUB"];
    if (gsub == null)
      return gls;
    var llist = gsub.lookupList, flist = gsub.featureList;
    var cligs = [
      "rlig",
      "liga",
      "mset",
      "isol",
      "init",
      "fina",
      "medi",
      "half",
      "pres",
      "blws"
      /* Tibetan fonts like Himalaya.ttf */
    ];
    var tused = [];
    for (var fi = 0; fi < flist.length; fi++) {
      var fl = flist[fi];
      if (cligs.indexOf(fl.tag) == -1)
        continue;
      for (var ti = 0; ti < fl.tab.length; ti++) {
        if (tused[fl.tab[ti]])
          continue;
        tused[fl.tab[ti]] = true;
        var tab = llist[fl.tab[ti]];
        for (var ci = 0; ci < gls.length; ci++) {
          var feat = Typr.U._getWPfeature(str, ci);
          if ("isol,init,fina,medi".indexOf(fl.tag) != -1 && fl.tag != feat)
            continue;
          Typr.U._applySubs(gls, ci, tab, llist);
        }
      }
    }
    return gls;
  };
  Typr.U._getWPfeature = function(str, ci) {
    var wsep = '\n	" ,.:;!?()  ،';
    var R = "آأؤإاةدذرزوٱٲٳٵٶٷڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙۀۃۄۅۆۇۈۉۊۋۍۏےۓەۮۯܐܕܖܗܘܙܞܨܪܬܯݍݙݚݛݫݬݱݳݴݸݹࡀࡆࡇࡉࡔࡧࡩࡪࢪࢫࢬࢮࢱࢲࢹૅેૉ૊૎૏ૐ૑૒૝ૡ૤૯஁ஃ஄அஉ஌எஏ஑னப஫஬";
    var L = "ꡲ્૗";
    var slft = ci == 0 || wsep.indexOf(str[ci - 1]) != -1;
    var srgt = ci == str.length - 1 || wsep.indexOf(str[ci + 1]) != -1;
    if (!slft && R.indexOf(str[ci - 1]) != -1)
      slft = true;
    if (!srgt && R.indexOf(str[ci]) != -1)
      srgt = true;
    if (!srgt && L.indexOf(str[ci + 1]) != -1)
      srgt = true;
    if (!slft && L.indexOf(str[ci]) != -1)
      slft = true;
    var feat = null;
    if (slft) {
      feat = srgt ? "isol" : "init";
    } else {
      feat = srgt ? "fina" : "medi";
    }
    return feat;
  };
  Typr.U._applySubs = function(gls, ci, tab, llist) {
    var rlim = gls.length - ci - 1;
    for (var j = 0; j < tab.tabs.length; j++) {
      if (tab.tabs[j] == null)
        continue;
      var ltab = tab.tabs[j], ind;
      if (ltab.coverage) {
        ind = Typr._lctf.coverageIndex(ltab.coverage, gls[ci]);
        if (ind == -1)
          continue;
      }
      if (tab.ltype == 1) {
        gls[ci];
        if (ltab.fmt == 1)
          gls[ci] = gls[ci] + ltab.delta;
        else
          gls[ci] = ltab.newg[ind];
      } else if (tab.ltype == 4) {
        var vals = ltab.vals[ind];
        for (var k = 0; k < vals.length; k++) {
          var lig = vals[k], rl = lig.chain.length;
          if (rl > rlim)
            continue;
          var good = true, em1 = 0;
          for (var l = 0; l < rl; l++) {
            while (gls[ci + em1 + (1 + l)] == -1)
              em1++;
            if (lig.chain[l] != gls[ci + em1 + (1 + l)])
              good = false;
          }
          if (!good)
            continue;
          gls[ci] = lig.nglyph;
          for (var l = 0; l < rl + em1; l++)
            gls[ci + l + 1] = -1;
          break;
        }
      } else if (tab.ltype == 5 && ltab.fmt == 2) {
        var cind = Typr._lctf.getInterval(ltab.cDef, gls[ci]);
        var cls = ltab.cDef[cind + 2], scs = ltab.scset[cls];
        for (var i = 0; i < scs.length; i++) {
          var sc = scs[i], inp = sc.input;
          if (inp.length > rlim)
            continue;
          var good = true;
          for (var l = 0; l < inp.length; l++) {
            var cind2 = Typr._lctf.getInterval(ltab.cDef, gls[ci + 1 + l]);
            if (cind == -1 && ltab.cDef[cind2 + 2] != inp[l]) {
              good = false;
              break;
            }
          }
          if (!good)
            continue;
          var lrs = sc.substLookupRecords;
          for (var k = 0; k < lrs.length; k += 2) {
            lrs[k];
            lrs[k + 1];
          }
        }
      } else if (tab.ltype == 6 && ltab.fmt == 3) {
        if (!Typr.U._glsCovered(gls, ltab.backCvg, ci - ltab.backCvg.length))
          continue;
        if (!Typr.U._glsCovered(gls, ltab.inptCvg, ci))
          continue;
        if (!Typr.U._glsCovered(gls, ltab.ahedCvg, ci + ltab.inptCvg.length))
          continue;
        var lr = ltab.lookupRec;
        for (var i = 0; i < lr.length; i += 2) {
          var cind = lr[i], tab2 = llist[lr[i + 1]];
          Typr.U._applySubs(gls, ci + cind, tab2, llist);
        }
      }
    }
  };
  Typr.U._glsCovered = function(gls, cvgs, ci) {
    for (var i = 0; i < cvgs.length; i++) {
      var ind = Typr._lctf.coverageIndex(cvgs[i], gls[ci + i]);
      if (ind == -1)
        return false;
    }
    return true;
  };
  Typr.U.glyphsToPath = function(font, gls, clr) {
    var tpath = { cmds: [], crds: [] };
    var x = 0;
    for (var i = 0; i < gls.length; i++) {
      var gid = gls[i];
      if (gid == -1)
        continue;
      var gid2 = i < gls.length - 1 && gls[i + 1] != -1 ? gls[i + 1] : 0;
      var path = Typr.U.glyphToPath(font, gid);
      for (var j = 0; j < path.crds.length; j += 2) {
        tpath.crds.push(path.crds[j] + x);
        tpath.crds.push(path.crds[j + 1]);
      }
      if (clr)
        tpath.cmds.push(clr);
      for (var j = 0; j < path.cmds.length; j++)
        tpath.cmds.push(path.cmds[j]);
      if (clr)
        tpath.cmds.push("X");
      x += font.hmtx.aWidth[gid];
      if (i < gls.length - 1)
        x += Typr.U.getPairAdjustment(font, gid, gid2);
    }
    return tpath;
  };
  Typr.U.pathToSVG = function(path, prec) {
    if (prec == null)
      prec = 5;
    var out = [], co = 0, lmap = { "M": 2, "L": 2, "Q": 4, "C": 6 };
    for (var i = 0; i < path.cmds.length; i++) {
      var cmd = path.cmds[i], cn = co + (lmap[cmd] ? lmap[cmd] : 0);
      out.push(cmd);
      while (co < cn) {
        var c = path.crds[co++];
        out.push(parseFloat(c.toFixed(prec)) + (co == cn ? "" : " "));
      }
    }
    return out.join("");
  };
  Typr.U.pathToContext = function(path, ctx) {
    var c = 0, crds = path.crds;
    for (var j = 0; j < path.cmds.length; j++) {
      var cmd = path.cmds[j];
      if (cmd == "M") {
        ctx.moveTo(crds[c], crds[c + 1]);
        c += 2;
      } else if (cmd == "L") {
        ctx.lineTo(crds[c], crds[c + 1]);
        c += 2;
      } else if (cmd == "C") {
        ctx.bezierCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3], crds[c + 4], crds[c + 5]);
        c += 6;
      } else if (cmd == "Q") {
        ctx.quadraticCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3]);
        c += 4;
      } else if (cmd.charAt(0) == "#") {
        ctx.beginPath();
        ctx.fillStyle = cmd;
      } else if (cmd == "Z") {
        ctx.closePath();
      } else if (cmd == "X") {
        ctx.fill();
      }
    }
  };
  Typr.U.P = {};
  Typr.U.P.moveTo = function(p, x, y) {
    p.cmds.push("M");
    p.crds.push(x, y);
  };
  Typr.U.P.lineTo = function(p, x, y) {
    p.cmds.push("L");
    p.crds.push(x, y);
  };
  Typr.U.P.curveTo = function(p, a, b, c, d, e, f) {
    p.cmds.push("C");
    p.crds.push(a, b, c, d, e, f);
  };
  Typr.U.P.qcurveTo = function(p, a, b, c, d) {
    p.cmds.push("Q");
    p.crds.push(a, b, c, d);
  };
  Typr.U.P.closePath = function(p) {
    p.cmds.push("Z");
  };
  Typr.U._drawCFF = function(cmds, state, font, pdct, p) {
    var stack = state.stack;
    var nStems = state.nStems, haveWidth = state.haveWidth, width = state.width, open = state.open;
    var i = 0;
    var x = state.x, y = state.y, c1x = 0, c1y = 0, c2x = 0, c2y = 0, c3x = 0, c3y = 0, c4x = 0, c4y = 0, jpx = 0, jpy = 0;
    var o = { val: 0, size: 0 };
    while (i < cmds.length) {
      Typr.CFF.getCharString(cmds, i, o);
      var v = o.val;
      i += o.size;
      if (v == "o1" || v == "o18") {
        var hasWidthArg;
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
        }
        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
      } else if (v == "o3" || v == "o23") {
        var hasWidthArg;
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
        }
        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
      } else if (v == "o4") {
        if (stack.length > 1 && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
          haveWidth = true;
        }
        if (open)
          Typr.U.P.closePath(p);
        y += stack.pop();
        Typr.U.P.moveTo(p, x, y);
        open = true;
      } else if (v == "o5") {
        while (stack.length > 0) {
          x += stack.shift();
          y += stack.shift();
          Typr.U.P.lineTo(p, x, y);
        }
      } else if (v == "o6" || v == "o7") {
        var count = stack.length;
        var isX = v == "o6";
        for (var j = 0; j < count; j++) {
          var sval = stack.shift();
          if (isX) {
            x += sval;
          } else {
            y += sval;
          }
          isX = !isX;
          Typr.U.P.lineTo(p, x, y);
        }
      } else if (v == "o8" || v == "o24") {
        var count = stack.length;
        var index = 0;
        while (index + 6 <= count) {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x + stack.shift();
          y = c2y + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
          index += 6;
        }
        if (v == "o24") {
          x += stack.shift();
          y += stack.shift();
          Typr.U.P.lineTo(p, x, y);
        }
      } else if (v == "o11") {
        break;
      } else if (v == "o1234" || v == "o1235" || v == "o1236" || v == "o1237") {
        if (v == "o1234") {
          c1x = x + stack.shift();
          c1y = y;
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y;
          c3x = jpx + stack.shift();
          c3y = c2y;
          c4x = c3x + stack.shift();
          c4y = y;
          x = c4x + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
        if (v == "o1235") {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y + stack.shift();
          c3x = jpx + stack.shift();
          c3y = jpy + stack.shift();
          c4x = c3x + stack.shift();
          c4y = c3y + stack.shift();
          x = c4x + stack.shift();
          y = c4y + stack.shift();
          stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
        if (v == "o1236") {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y;
          c3x = jpx + stack.shift();
          c3y = c2y;
          c4x = c3x + stack.shift();
          c4y = c3y + stack.shift();
          x = c4x + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
        if (v == "o1237") {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y + stack.shift();
          c3x = jpx + stack.shift();
          c3y = jpy + stack.shift();
          c4x = c3x + stack.shift();
          c4y = c3y + stack.shift();
          if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
            x = c4x + stack.shift();
          } else {
            y = c4y + stack.shift();
          }
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
      } else if (v == "o14") {
        if (stack.length > 0 && !haveWidth) {
          width = stack.shift() + font.nominalWidthX;
          haveWidth = true;
        }
        if (stack.length == 4) {
          var adx = stack.shift();
          var ady = stack.shift();
          var bchar = stack.shift();
          var achar = stack.shift();
          var bind2 = Typr.CFF.glyphBySE(font, bchar);
          var aind = Typr.CFF.glyphBySE(font, achar);
          Typr.U._drawCFF(font.CharStrings[bind2], state, font, pdct, p);
          state.x = adx;
          state.y = ady;
          Typr.U._drawCFF(font.CharStrings[aind], state, font, pdct, p);
        }
        if (open) {
          Typr.U.P.closePath(p);
          open = false;
        }
      } else if (v == "o19" || v == "o20") {
        var hasWidthArg;
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
        }
        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
        i += nStems + 7 >> 3;
      } else if (v == "o21") {
        if (stack.length > 2 && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
          haveWidth = true;
        }
        y += stack.pop();
        x += stack.pop();
        if (open)
          Typr.U.P.closePath(p);
        Typr.U.P.moveTo(p, x, y);
        open = true;
      } else if (v == "o22") {
        if (stack.length > 1 && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
          haveWidth = true;
        }
        x += stack.pop();
        if (open)
          Typr.U.P.closePath(p);
        Typr.U.P.moveTo(p, x, y);
        open = true;
      } else if (v == "o25") {
        while (stack.length > 6) {
          x += stack.shift();
          y += stack.shift();
          Typr.U.P.lineTo(p, x, y);
        }
        c1x = x + stack.shift();
        c1y = y + stack.shift();
        c2x = c1x + stack.shift();
        c2y = c1y + stack.shift();
        x = c2x + stack.shift();
        y = c2y + stack.shift();
        Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
      } else if (v == "o26") {
        if (stack.length % 2) {
          x += stack.shift();
        }
        while (stack.length > 0) {
          c1x = x;
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x;
          y = c2y + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        }
      } else if (v == "o27") {
        if (stack.length % 2) {
          y += stack.shift();
        }
        while (stack.length > 0) {
          c1x = x + stack.shift();
          c1y = y;
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x + stack.shift();
          y = c2y;
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        }
      } else if (v == "o10" || v == "o29") {
        var obj = v == "o10" ? pdct : font;
        if (stack.length == 0) {
          console.warn("error: empty stack");
        } else {
          var ind = stack.pop();
          var subr = obj.Subrs[ind + obj.Bias];
          state.x = x;
          state.y = y;
          state.nStems = nStems;
          state.haveWidth = haveWidth;
          state.width = width;
          state.open = open;
          Typr.U._drawCFF(subr, state, font, pdct, p);
          x = state.x;
          y = state.y;
          nStems = state.nStems;
          haveWidth = state.haveWidth;
          width = state.width;
          open = state.open;
        }
      } else if (v == "o30" || v == "o31") {
        var count, count1 = stack.length;
        var index = 0;
        var alternate = v == "o31";
        count = count1 & ~2;
        index += count1 - count;
        while (index < count) {
          if (alternate) {
            c1x = x + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            y = c2y + stack.shift();
            if (count - index == 5) {
              x = c2x + stack.shift();
              index++;
            } else {
              x = c2x;
            }
            alternate = false;
          } else {
            c1x = x;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            if (count - index == 5) {
              y = c2y + stack.shift();
              index++;
            } else {
              y = c2y;
            }
            alternate = true;
          }
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
          index += 4;
        }
      } else if ((v + "").charAt(0) == "o") {
        console.warn("Unknown operation: " + v, cmds);
        throw v;
      } else
        stack.push(v);
    }
    state.x = x;
    state.y = y;
    state.nStems = nStems;
    state.haveWidth = haveWidth;
    state.width = width;
    state.open = open;
  };
  Typr$1.Typr = Typr;
  var Typr_js_1 = Typr$1;
  var friendlyTags = { "aalt": "Access All Alternates", "abvf": "Above-base Forms", "abvm": "Above - base Mark Positioning", "abvs": "Above - base Substitutions", "afrc": "Alternative Fractions", "akhn": "Akhands", "blwf": "Below - base Forms", "blwm": "Below - base Mark Positioning", "blws": "Below - base Substitutions", "calt": "Contextual Alternates", "case": "Case - Sensitive Forms", "ccmp": "Glyph Composition / Decomposition", "cfar": "Conjunct Form After Ro", "cjct": "Conjunct Forms", "clig": "Contextual Ligatures", "cpct": "Centered CJK Punctuation", "cpsp": "Capital Spacing", "cswh": "Contextual Swash", "curs": "Cursive Positioning", "c2pc": "Petite Capitals From Capitals", "c2sc": "Small Capitals From Capitals", "dist": "Distances", "dlig": "Discretionary Ligatures", "dnom": "Denominators", "dtls": "Dotless Forms", "expt": "Expert Forms", "falt": "Final Glyph on Line Alternates", "fin2": "Terminal Forms #2", "fin3": "Terminal Forms #3", "fina": "Terminal Forms", "flac": "Flattened accent forms", "frac": "Fractions", "fwid": "Full Widths", "half": "Half Forms", "haln": "Halant Forms", "halt": "Alternate Half Widths", "hist": "Historical Forms", "hkna": "Horizontal Kana Alternates", "hlig": "Historical Ligatures", "hngl": "Hangul", "hojo": "Hojo Kanji Forms(JIS X 0212 - 1990 Kanji Forms)", "hwid": "Half Widths", "init": "Initial Forms", "isol": "Isolated Forms", "ital": "Italics", "jalt": "Justification Alternates", "jp78": "JIS78 Forms", "jp83": "JIS83 Forms", "jp90": "JIS90 Forms", "jp04": "JIS2004 Forms", "kern": "Kerning", "lfbd": "Left Bounds", "liga": "Standard Ligatures", "ljmo": "Leading Jamo Forms", "lnum": "Lining Figures", "locl": "Localized Forms", "ltra": "Left - to - right alternates", "ltrm": "Left - to - right mirrored forms", "mark": "Mark Positioning", "med2": "Medial Forms #2", "medi": "Medial Forms", "mgrk": "Mathematical Greek", "mkmk": "Mark to Mark Positioning", "mset": "Mark Positioning via Substitution", "nalt": "Alternate Annotation Forms", "nlck": "NLC Kanji Forms", "nukt": "Nukta Forms", "numr": "Numerators", "onum": "Oldstyle Figures", "opbd": "Optical Bounds", "ordn": "Ordinals", "ornm": "Ornaments", "palt": "Proportional Alternate Widths", "pcap": "Petite Capitals", "pkna": "Proportional Kana", "pnum": "Proportional Figures", "pref": "Pre - Base Forms", "pres": "Pre - base Substitutions", "pstf": "Post - base Forms", "psts": "Post - base Substitutions", "pwid": "Proportional Widths", "qwid": "Quarter Widths", "rand": "Randomize", "rclt": "Required Contextual Alternates", "rkrf": "Rakar Forms", "rlig": "Required Ligatures", "rphf": "Reph Forms", "rtbd": "Right Bounds", "rtla": "Right - to - left alternates", "rtlm": "Right - to - left mirrored forms", "ruby": "Ruby Notation Forms", "rvrn": "Required Variation Alternates", "salt": "Stylistic Alternates", "sinf": "Scientific Inferiors", "size": "Optical size", "smcp": "Small Capitals", "smpl": "Simplified Forms", "ssty": "Math script style alternates", "stch": "Stretching Glyph Decomposition", "subs": "Subscript", "sups": "Superscript", "swsh": "Swash", "titl": "Titling", "tjmo": "Trailing Jamo Forms", "tnam": "Traditional Name Forms", "tnum": "Tabular Figures", "trad": "Traditional Forms", "twid": "Third Widths", "unic": "Unicase", "valt": "Alternate Vertical Metrics", "vatu": "Vattu Variants", "vert": "Vertical Writing", "vhal": "Alternate Vertical Half Metrics", "vjmo": "Vowel Jamo Forms", "vkna": "Vertical Kana Alternates", "vkrn": "Vertical Kerning", "vpal": "Proportional Alternate Vertical Metrics", "vrt2": "Vertical Alternates and Rotation", "vrtr": "Vertical Alternates for Rotation", "zero": "Slashed Zero" };
  var Font = (
    /** @class */
    function() {
      function Font2(data) {
        var obj = Typr_js_1.Typr.parse(data);
        if (!obj.length || typeof obj[0] !== "object" || typeof obj[0].hasOwnProperty !== "function") {
          throw "unable to parse font";
        }
        for (var n in obj[0]) {
          this[n] = obj[0][n];
        }
        this.enabledGSUB = {};
      }
      Font2.prototype.getFamilyName = function() {
        return this.name && (this.name.typoFamilyName || this.name.fontFamily) || "";
      };
      Font2.prototype.getSubFamilyName = function() {
        return this.name && (this.name.typoSubfamilyName || this.name.fontSubfamily) || "";
      };
      Font2.prototype.glyphToPath = function(gid) {
        return Typr_js_1.Typr.U.glyphToPath(this, gid);
      };
      Font2.prototype.getPairAdjustment = function(gid1, gid2) {
        return Typr_js_1.Typr.U.getPairAdjustment(this, gid1, gid2);
      };
      Font2.prototype.stringToGlyphs = function(str) {
        return Typr_js_1.Typr.U.stringToGlyphs(this, str);
      };
      Font2.prototype.glyphsToPath = function(gls) {
        return Typr_js_1.Typr.U.glyphsToPath(this, gls);
      };
      Font2.prototype.pathToSVG = function(path, prec) {
        return Typr_js_1.Typr.U.pathToSVG(path, prec);
      };
      Font2.prototype.pathToContext = function(path, ctx) {
        return Typr_js_1.Typr.U.pathToContext(path, ctx);
      };
      Font2.prototype.lookupFriendlyName = function(table, feature) {
        if (this[table] !== void 0) {
          var tbl = this[table];
          var feat = tbl.featureList[feature];
          return this.featureFriendlyName(feat);
        }
        return "";
      };
      Font2.prototype.featureFriendlyName = function(feature) {
        if (friendlyTags[feature.tag]) {
          return friendlyTags[feature.tag];
        }
        if (feature.tag.match(/ss[0-2][0-9]/)) {
          var name_1 = "Stylistic Set " + Number(feature.tag.substr(2, 2)).toString();
          if (feature.featureParams) {
            var version = Typr_js_1.Typr._bin.readUshort(this._data, feature.featureParams);
            if (version === 0) {
              var nameID = Typr_js_1.Typr._bin.readUshort(this._data, feature.featureParams + 2);
              if (this.name && this.name[nameID] !== void 0) {
                return name_1 + " - " + this.name[nameID];
              }
            }
          }
          return name_1;
        }
        if (feature.tag.match(/cv[0-9][0-9]/)) {
          return "Character Variant " + Number(feature.tag.substr(2, 2)).toString();
        }
        return "";
      };
      Font2.prototype.enableGSUB = function(featureNumber) {
        if (this.GSUB) {
          var feature = this.GSUB.featureList[featureNumber];
          if (feature) {
            for (var i = 0; i < feature.tab.length; ++i) {
              this.enabledGSUB[feature.tab[i]] = (this.enabledGSUB[feature.tab[i]] || 0) + 1;
            }
          }
        }
      };
      Font2.prototype.disableGSUB = function(featureNumber) {
        if (this.GSUB) {
          var feature = this.GSUB.featureList[featureNumber];
          if (feature) {
            for (var i = 0; i < feature.tab.length; ++i) {
              if (this.enabledGSUB[feature.tab[i]] > 1) {
                --this.enabledGSUB[feature.tab[i]];
              } else {
                delete this.enabledGSUB[feature.tab[i]];
              }
            }
          }
        }
      };
      Font2.prototype.codeToGlyph = function(code) {
        var g = Typr_js_1.Typr.U.codeToGlyph(this, code);
        if (this.GSUB) {
          var gls = [g];
          for (var n in this.enabledGSUB) {
            var l = this.GSUB.lookupList[n];
            Typr_js_1.Typr.U._applySubs(gls, 0, l, this.GSUB.lookupList);
          }
          if (gls.length === 1)
            return gls[0];
        }
        return g;
      };
      return Font2;
    }()
  );
  var Font_1 = Font;

  const decrypt = (iframeDocument, onProgress) => {
    var _a, _b, _c;
    const report = typeof onProgress === "function" ? onProgress : () => {
    };
    // Typr 字体解析库若未随脚本加载，直接跳过解密（原先会抛 Typr_js_1 is not defined）
    if (typeof Typr === "undefined" || !Typr || typeof Typr.parse !== "function") {
      report("字体解析库未加载（Typr 缺失），已跳过字体解密");
      return;
    }
    const styles = iframeDocument.querySelectorAll("style");
    let tip;
    for (let i = 0; i < styles.length; i++) {
      if ((_a = styles[i].textContent) == null ? void 0 : _a.includes("font-cxsecret")) {
        tip = styles[i];
        break;
      }
    }
    if (!tip) {
      report("本页没有加密字体，无需解密");
      return;
    }
    const fontData = (_c = (_b = tip.textContent) == null ? void 0 : _b.match(/base64,([\w\W]+?)'/)) == null ? void 0 : _c[1];
    if (!fontData) {
      report("未取到加密字体数据，跳过解密");
      return;
    }
    const fontBuffer = base64ToArrayBuffer(fontData);
    const font = new Font_1(fontBuffer);
    const table = JSON.parse(_GM_getResourceText("ttf"));
    const match = {};
    let scanned = 0;
    let matched = 0;
    for (let i = 19968; i < 40870; i++) {
      let glyph = 0;
      let hash = "";
      try {
        glyph = font.codeToGlyph(i);
        if (!glyph)
          continue;
        const path = font.glyphToPath(glyph);
        hash = md5(JSON.stringify(path)).slice(24);
      } catch (e) {
        continue;
      }
      scanned++;
      if (table[hash] !== void 0) {
        match[i] = table[hash];
        matched++;
      }
      if (scanned % 4e3 === 0)
        report(`字体解密进行中，已比对${scanned}个字形…`);
    }
    report(`字体比对完成：比对${scanned}个字形，命中${matched}个对照`);
    const elements = iframeDocument.querySelectorAll(".font-cxsecret");
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      el.innerHTML = el.innerHTML.replace(
        /[\u4e00-\u9fa5]/g,
        (ch) => {
          const mapped = match[ch.charCodeAt(0)];
          return mapped === void 0 ? ch : String.fromCharCode(mapped);
        }
      );
      el.classList.remove("font-cxsecret");
    }
    report(`已还原${elements.length}处加密题目文本`);
    function base64ToArrayBuffer(base64) {
      const data = window.atob(base64);
      const buffer = new ArrayBuffer(data.length);
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < data.length; ++i) {
        bytes[i] = data.charCodeAt(i);
      }
      return buffer;
    }
  };
  // 答题区（选项/答题框所在节点）与选项容器的选择器，题型识别、题干提取共用
  const ANSWER_REGION_SELECTORS = ".Py_answer, .TiMuAnswer, .mark_answer, .answerBox, .questionCon";
  const OPTION_REGION_SELECTORS = '[class*="before-after"], .answerBg, .label, .node_detail, .answer_p, .fl.after';
  // 富文本编辑器及其工具栏、上传控件：这些是答题 UI，不是题干，
  // 它们的文字（“填写答案 / 段落格式 / 字体 / 字号 / 点击上传”）一旦混进题干会污染 AI 的输入
  const EDITOR_REGION_SELECTORS = '[contenteditable], textarea, .edui-editor, .edui-box, .edui-toolbar, .Zy_Editor, .ueditor, .answerEditor, .upload-wrapper';
  class BaseQuestionHandler {
    constructor() {
      __publicField(this, "_document", document);
      __publicField(this, "_window", _unsafeWindow);
      __publicField(this, "addLog");
      __publicField(this, "addQuestion");
      __publicField(this, "questions", []);
      __publicField(this, "correctNum", 0);
      __publicField(this, "parseHtml", () => {
        throw new Error("请使用继承类的重写方法");
      });
      __publicField(this, "fillQuestion", (question) => {
        throw new Error("请使用继承类的重写方法");
      });
      __publicField(this, "removeHtml", (html) => {
        if (html == null) {
          return "";
        }
        return html.replace(/<((?!img|sub|sup|br)[^>]+)>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").replace(/<br\s*\/?>/g, "\n").replace(/<img.*?src="(.*?)".*?>/g, '<img src="$1"/>').trim();
      });
      __publicField(this, "clean", (str) => {
        return str.replace(/^【.*?】\s*/, "").replace(/\s*（\d+\.\d+分）$/, "");
      });
      // 把一段题干 HTML 变成能看懂的纯文本：保留换行（<br>），图片换成 [图片] 占位，
      // 并剔除 textarea / script 等节点及其内容，不让输入框里的占位文字混进题干。
      __publicField(this, "extractStemText", (html) => {
        let text = String(html == null ? "" : html);
        text = text.replace(/<(script|style|textarea|input|iframe)\b[\s\S]*?<\/\1>/gi, " ")
          .replace(/<(script|style|textarea|input|iframe|br|hr)\b[^>]*\/?>/gi, (match) => (/^<br/i.test(match) ? "\n" : " "));
        text = text.replace(/<img\b[^>]*>/gi, " [图片] ");
        text = text.replace(/<[^>]+>/g, " ");
        text = text.replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<")
          .replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'");
        return text.replace(/[ \t\u00a0]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
      });
      __publicField(this, "findMatchedOption", (options, answer, optionTextList, optionElements) => {
        const texts = Array.isArray(optionTextList) ? optionTextList : Object.keys(options || {});
        const elements = Array.isArray(optionElements) && optionElements.length === texts.length
          ? optionElements
          : texts.map((text) => options[text]);
        if (!texts.length)
          return null;
        const rawAnswer = String(answer == null ? "" : answer);
        const letterCount = texts.length;
        const normalizedAnswer = this.normalizeOptionMatchText(rawAnswer);
        if (!normalizedAnswer)
          return null;
        if (letterCount <= 26) {
          const letterMatched = rawAnswer.toUpperCase().match(/(?:^|[^A-Z])([A-Z])(?![A-Z])/);
          if (letterMatched) {
            const index = letterMatched[1].charCodeAt(0) - 65;
            if (index >= 0 && index < letterCount && elements[index])
              return elements[index];
          }
        }
        for (let i = 0; i < texts.length; i++) {
          if (this.normalizeOptionMatchText(texts[i]) === normalizedAnswer && elements[i])
            return elements[i];
        }
        const threshold = this.getAnswerSimilarityThreshold();
        let bestIndex = -1;
        let bestScore = -1;
        for (let i = 0; i < texts.length; i++) {
          const optionText = this.normalizeOptionMatchText(texts[i]);
          if (!optionText)
            continue;
          let score = this.calculateTextSimilarity(optionText, normalizedAnswer);
          if (optionText.includes(normalizedAnswer) || normalizedAnswer.includes(optionText))
            score = Math.max(score, 90);
          if (score > bestScore) {
            bestScore = score;
            bestIndex = i;
          }
        }
        if (bestIndex === -1)
          return null;
        return bestScore >= threshold ? elements[bestIndex] : null;
      });
      __publicField(this, "getRawOptionText", (question, index) => {
        var _a, _b;
        const list = (_a = question.optionTextList) != null ? _a : question.optionsText;
        const element = (_b = question.optionElements) == null ? void 0 : _b[index];
        const raw = String((list == null ? void 0 : list[index]) || "").trim();
        if (raw)
          return raw;
        return String((element == null ? void 0 : element.innerText) || (element == null ? void 0 : element.textContent) || "").trim();
      });
      __publicField(this, "matchAnswerToOption", (question, answer) => {
        var _a, _b;
        const byText = this.findMatchedOption(question.options, answer, question.optionTextList, question.optionElements);
        if (byText)
          return byText;
        const optionCount = ((_a = question.optionTextList) != null ? _a : question.optionsText || []).length;
        const raw = String(answer == null ? "" : answer);
        if (optionCount > 0 && optionCount <= 26) {
          const letter = raw.match(/(?:^|[^A-Za-z])([A-Za-z])(?![A-Za-z])/);
          if (letter) {
            const index = letter[1].toUpperCase().charCodeAt(0) - 65;
            const element = (_b = question.optionElements) == null ? void 0 : _b[index];
            if (index >= 0 && index < optionCount && element)
              return element;
          }
        }
        const normalized = this.normalizeOptionMatchText(raw);
        if (!normalized)
          return null;
        const texts = question.optionTextList || question.optionsText || [];
        for (let i = 0; i < texts.length; i++) {
          const optionText = this.normalizeOptionMatchText(texts[i]);
          if (!optionText)
            continue;
          if (optionText.includes(normalized) || normalized.includes(optionText)) {
            const element = question.optionElements && question.optionElements[i];
            if (element)
              return element;
          }
        }
        return null;
      });
      __publicField(this, "inferQuestionTypeByStructure", (questionElement, optionElements, optionTexts) => {
        if (this.hasFillBlankControl(questionElement))
          return "2";
        if (this.hasLongTextControl(questionElement) && optionElements.length === 0)
          return "4";
        if (this.hasCheckboxControl(questionElement, optionElements))
          return "1";
        if (this.isJudgementQuestion(questionElement, optionElements, optionTexts))
          return "3";
        if (this.hasRadioControl(questionElement, optionElements))
          return "0";
        if (optionElements.length > 0)
          return "0";
        return "999";
      });
      __publicField(this, "hasFillBlankControl", (questionElement) => {
        const textInputs = Array.from(questionElement.querySelectorAll("input")).filter((input) => {
          const type = (input.getAttribute("type") || "text").toLowerCase();
          return ["", "text", "search", "number", "tel", "url", "email"].includes(type) && !input.disabled && !input.hidden;
        });
        const textareas = questionElement.querySelectorAll("textarea");
        const editableElements = questionElement.querySelectorAll('[contenteditable="true"]');
        const hasBlankCue = Array.from(questionElement.querySelectorAll("[class], [name], [placeholder]")).some((element) => [
          element.getAttribute("class"),
          element.getAttribute("name"),
          element.getAttribute("placeholder")
        ].filter(Boolean).join(" ").toLowerCase().includes("blank") || (element.getAttribute("placeholder") || "").includes("填"));
        return textInputs.length > 0 || editableElements.length > 0 || textareas.length > 1 || hasBlankCue;
      });
      __publicField(this, "hasLongTextControl", (questionElement) => {
        return questionElement.querySelectorAll("textarea").length > 0;
      });
      // ---------------- 题干 / 题型识别（不只看 DOM 结构，也读页面自己写的题型） ----------------
      // 答题区（选项、答题框所在的那块）——判断题型时需要看它，但组题干时要把它去掉
      __publicField(this, "getQuestionRegion", (questionElement) => {
        if (!questionElement || typeof questionElement.querySelector !== "function")
          return questionElement;
        try {
          return questionElement.querySelector(ANSWER_REGION_SELECTORS) || questionElement;
        } catch (error) {
          return questionElement;
        }
      });
      // 找出需要从题干里整块剔除的节点（答题区/选项容器），返回它们的 outerHTML
      __publicField(this, "dropRegions", (questionElement, selectors) => {
        try {
          return Array.from(questionElement.querySelectorAll(selectors))
            .filter((region) => region && region !== questionElement)
            .map((region) => String(region.outerHTML || ""));
        } catch (error) {
          return [];
        }
      });
      // 一道题的完整题干 HTML：整题 outerHTML 去掉答题区和选项，
      // 这样“根据 [图片] 求：…”分散在多个节点里的题干就不会只抓到第一行。
      __publicField(this, "getStemHtml", (questionElement) => {
        if (!questionElement)
          return "";
        let html = String(questionElement.outerHTML || "");
        if (!html) {
          try {
            return String(questionElement.innerHTML || "");
          } catch (error) {
            return "";
          }
        }
        // 答题区/选项/编辑器整块从字符串里去掉（片段足够长才算匹配，避免误伤）
        const removeFragment = (fragment) => {
          const text = String(fragment || "").trim();
          if (text.length > 20)
            html = html.split(text).join(" ");
        };
        this.dropRegions(questionElement, ANSWER_REGION_SELECTORS).forEach(removeFragment);
        this.dropRegions(questionElement, OPTION_REGION_SELECTORS).forEach(removeFragment);
        this.dropRegions(questionElement, EDITOR_REGION_SELECTORS).forEach(removeFragment);
        return html;
      });
      // 题干候选节点：整题里所有「看起来是题干」的容器。
      // 超星的题目容器有时同时装着上一题的残留题干和当前题的题干，
      // 这里把它们都找出来，由上层去重并挑选。
      __publicField(this, "getStemNodes", (questionElement) => {
        try {
          const candidates = Array.from(questionElement.querySelectorAll(".fontLabel, .Zy_TItle, .mark_name, .subject_describe, .smallStem_describe"))
            .filter((node) => {
              try {
                return !(node.closest && node.closest(EDITOR_REGION_SELECTORS));
              } catch (error) {
                return true;
              }
            })
            .filter((node) => this.isFieldVisible(node));
          return candidates;
        } catch (error) {
          return [];
        }
      });
      // 从题干候选节点里选出真正的题干：
      // 1) 各候选先转纯文本；
      // 2) 文字被另一候选完整包含的（外层容器 vs 内层子节点）保留长的那条；
      // 3) 还剩多条时（上一题残留 + 当前题）取最后一个（超星把当前题排在最后），
      //    并写警告日志，方便用户在诊断报告里核对。
      __publicField(this, "getStemCandidatesText", (questionElement) => {
        const nodes = this.getStemNodes(questionElement);
        const texts = nodes.map((node) => this.cleanStemNoise(this.extractStemText(node.innerHTML || node.outerHTML || ""))).filter(Boolean);
        if (!texts.length)
          return "";
        const unique = texts.filter((text, index) => !texts.some((other, otherIndex) => otherIndex !== index && other.includes(text) && other.length > text.length));
        if (unique.length > 1) {
          this.addLog(
            `题干容器里有 ${unique.length} 个题干文本，已取最后一个（当前题）：` +
            unique.map((text) => `「${text.slice(0, 30)}${text.length > 30 ? "…" : ""}」`).join("、"),
            "warning"
          );
          return unique[unique.length - 1];
        }
        return unique[0] || "";
      });
      // 清掉答题 UI 残留的提示文字：上传按钮、工具栏文字、“填写答案”占位等
      __publicField(this, "cleanStemNoise", (text) => {
        return String(text == null ? "" : text)
          .replace(/点击上传\s*[x×]?\s*/g, " ")
          .replace(/填写答案\s*/g, " ")
          .replace(/段落格式[\s,，]*字体[\s,，]*字号\s*/g, " ")
          .replace(/([ \t])\1+/g, "$1")
          .replace(/ *\n */g, "\n")
          .replace(/\n{3,}/g, "\n\n")
          .trim();
      });
      // 题干里的图片（公式、常数表、电路图）单独收集，随消息一起发给多模态模型；
      // 排除选项区域里的小图标，也排除 gif/svg 这类装饰图。
      __publicField(this, "collectQuestionImages", (questionElement) => {
        try {
          if (!questionElement || typeof questionElement.querySelectorAll !== "function")
            return [];
          const list = Array.from(questionElement.querySelectorAll("img"))
            .filter((img) => {
              try {
                return !(img.closest && img.closest(OPTION_REGION_SELECTORS));
              } catch (error) {
                return true;
              }
            })
            .map((img) => String((img && (img.getAttribute("src") || img.src)) || "").trim())
            .filter((src) => /^https?:\/\//i.test(src) && !/\.(gif|svg)(\?|$)/i.test(src));
          return [...new Set(list)].slice(0, 6);
        } catch (error) {
          return [];
        }
      });
      // 页面自己标注的题型（data-type 等），取不到返回 ""
      __publicField(this, "getPageQuestionType", (questionElement) => {
        if (!questionElement || typeof questionElement.getAttribute !== "function")
          return "";
        const attributeNames = ["data-type", "data-qtype", "data-question-type", "data-questiontype", "questiontype"];
        const values = [];
        const push = (element) => {
          if (!element || typeof element.getAttribute !== "function")
            return;
          attributeNames.forEach((attribute) => {
            const value = element.getAttribute(attribute);
            if (value)
              values.push(String(value));
          });
        };
        push(questionElement);
        try {
          Array.from(questionElement.querySelectorAll("[data-type],[data-qtype],[data-question-type],[data-questiontype],[questiontype]"))
            .slice(0, 10)
            .forEach(push);
        } catch (error) {
          /* 取不到就算了 */
        }
        const text = values.join(" ");
        if (!text)
          return "";
        if (/填空|fill\s*blank|fillblank|blank/i.test(text))
          return "2";
        if (/简答|问答|论述|计算|short\s*answer|essay|calc/i.test(text))
          return "4";
        const numeric = text.match(/(?:^|\D)([0-6])(?:\D|$)/);
        return numeric ? numeric[1] : "";
      });
      // 收集题干及页面标注文字，用于识别“填空 / 简答”这类线上线索
      __publicField(this, "getQuestionCueText", (questionElement) => {
        const text = [];
        const pushNode = (node) => {
          if (!node)
            return;
          const value = String(node.textContent || "").replace(/\s+/g, " ").trim();
          if (value)
            text.push(value);
        };
        try {
          const region = this.getQuestionRegion(questionElement);
          [
            ".Zy_TItle",
            ".fontLabel",
            ".mark_name",
            ".subject_describe",
            ".smallStem_describe",
            ".questionTitle",
            ".timu_tips",
            ".TiMu .clearfix"
          ].forEach((selector) => {
            try {
              pushNode(questionElement.querySelector(selector));
            } catch (error) {
              /* 选择器无效就跳过 */
            }
          });
          if (region !== questionElement)
            pushNode(region);
          pushNode(questionElement);
        } catch (error) {
          /* 忽略 */
        }
        return text.join(" ").replace(/\s+/g, " ").slice(0, 1500);
      });
      __publicField(this, "looksLikeFillBlankHint", (questionElement) => {
        const cue = this.getQuestionCueText(questionElement);
        if (/填空|填入|填写|每空|空格|各空|依次填|将答案填|请填/.test(cue))
          return true;
        const title = String((questionElement && questionElement.getAttribute && questionElement.getAttribute("data-title")) || "");
        return /填空|每空/.test(title);
      });
      __publicField(this, "countBlankMarkers", (text) => {
        const source = String(text || "");
        if (!source)
          return 0;
        let count = 0;
        [/_{2,}/g, /[（(]\s*[)）]/g, /【\s*】/g, /\[\s*\]/g, /﹍+/g, /…{2,}/g].forEach((pattern) => {
          const matched = source.match(pattern);
          if (matched)
            count += matched.length;
        });
        return count;
      });
      __publicField(this, "countFillFields", (region) => {
        if (!region || typeof region.querySelectorAll !== "function")
          return 0;
        let count = 0;
        try {
          count += Array.from(region.querySelectorAll("input")).filter((input) => {
            const type = String(input.getAttribute("type") || "text").toLowerCase();
            return ["", "text", "search", "number", "tel", "url", "email"].includes(type) && !input.disabled;
          }).length;
          count += region.querySelectorAll("textarea").length + region.querySelectorAll("[contenteditable]").length;
        } catch (error) {
          /* 忽略 */
        }
        return count;
      });
      // 填空题与简答题的区分靠题干线索：有「填空/每空/空格」或横线、空括号等空位
      // 标记 → 填空(2)；出现「简答/论述/计算/说明」→ 简答(4)。都不是就交给上层兜底。
      __publicField(this, "resolveTextQuestionType", (questionElement) => {
        const cueText = this.getQuestionCueText(questionElement);
        let titleText = "";
        try {
          const label = questionElement && questionElement.querySelector && (questionElement.querySelector(".fontLabel") || questionElement.querySelector(".subject_describe"));
          titleText = String((label && label.textContent) || "");
        } catch (error) {
          /* 忽略 */
        }
        const text = `${cueText} ${titleText}`;
        const isShortCue = /简答|问答|论述|计算|说明|阐述|简述|计算题|分析题|推导/.test(text);
        if (isShortCue)
          return "4";
        if (this.looksLikeFillBlankHint(questionElement))
          return "2";
        if (this.countBlankMarkers(titleText || cueText) >= 1)
          return "2";
        if (/[①②③④⑤⑥⑦⑧⑨⑩]|第\s*[一二三四五六七八九十\d]+\s*空/.test(text))
          return "2";
        return "";
      });
      // 识别顺序：页面自己写的题型 → 题干线索（填空/简答） → DOM 结构 → 兜底
      // 有选项时只信任 0/1/3（题型标注），没有选项时任何页面标注都可用
      __publicField(this, "resolveQuestionType", (questionElement, optionElements, optionTexts) => {
        const pageType = this.getPageQuestionType(questionElement);
        const trusted = (optionTexts || []).length ? ["0", "1", "3"] : ["0", "1", "2", "3", "4", "5", "6"];
        if (trusted.includes(pageType))
          return pageType;
        const textType = this.resolveTextQuestionType(questionElement);
        if (textType)
          return textType;
        const structural = this.inferQuestionTypeByStructure(questionElement, optionElements, optionTexts);
        if (structural === "999") {
          const fieldCount = this.countFillFields(this.getQuestionRegion(questionElement));
          return fieldCount > 1 ? "2" : "4";
        }
        return structural;
      });
      // ---------------- 文本题（填空 / 简答 / 计算）的通用填写 ----------------
      // 把"字符串或数组"的答案统一成字符串数组：
      // - 数组 → 每项转字符串（多空填空题按空位对应）；
      // - 字符串带换行 → 按行拆成多个空位；
      // - 纯中文单行 → 压成一整段（保证不会被拆成单字）；
      // - 其它（公式/英文计算题）→ 原样一段保留。
      __publicField(this, "normalizeAnswerArray", (answer) => {
        if (Array.isArray(answer))
          return answer.map((item) => String(item == null ? "" : item));
        if (answer === null || answer === void 0)
          return [];
        const text = String(answer).replace(/```[a-zA-Z]*/g, "").replace(/```/g, "").trim();
        if (!text)
          return [];
        const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        if (lines.length > 1)
          return lines;
        const single = lines[0];
        if (/[\u3400-\u9fff\uf900-\ufaff]/.test(single) && !/\\[a-zA-Z]|\\\(|\\\)|[_^]\{/.test(single))
          return [single.replace(/\s+/g, "")];
        return [single];
      });
      __publicField(this, "getAnswerFragments", (question) => {
        const fragments = this.normalizeAnswerArray(question ? question.answer : "");
        // 填空题答案常被题库编成“1、xx2、yy”（无换行）或多行带“N、”前缀：
        // 按编号拆成多个空位，并把序号剥掉，空位里只写答案本身。
        // 顿号/逗号不可能是小数点，序号直接剥；点号必须后面跟中文才剥
        // （“1.5倍”“3.14”这类小数不能误伤）。
        if (String(question && question.type) !== "2" || !fragments.length)
          return fragments;
        const CJK = "[\\u3400-\\u9fff\\uf900-\\ufaff]";
        const stripMarker = (text) => String(text)
          .replace(/^\s*[1-9１-９][、，]/, "")
          .replace(new RegExp(`^\\s*[1-9１-９][.．]\\s*(?=${CJK})`), "")
          .trim();
        if (fragments.length > 1)
          return fragments.map(stripMarker).filter(Boolean);
        const single = String(fragments[0] || "");
        const parts = single.split(new RegExp(`(?=[1-9１-９][、，])|(?=[1-9１-９][.．]\\s*${CJK})`)).map(stripMarker).filter(Boolean);
        return parts.length > 1 ? parts : [stripMarker(single) || single];
      });
      // 多段答案拼成整段，用换行连接（这与填空题“多个空用换行分隔”的格式一致，
      // 富文本写入时会转成 <br/>，普通输入框保留换行）。
      __publicField(this, "joinTextFragments", (fragments) => {
        const source = Array.isArray(fragments) ? fragments : [fragments];
        const list = source.map((item) => String(item == null ? "" : item).trim()).filter(Boolean);
        if (list.length <= 1)
          return list[0] || "";
        return list.join("\n");
      });
      // 读回字段当前内容：INPUT 看 value；TEXTAREA/富文本优先问 UE 实例拿纯文本
      // （超星提交读的是编辑器内容，textarea.value 只是个镜像）；
      // 都没有再看 textContent
      __publicField(this, "readFieldValue", (field) => {
        try {
          if (!field)
            return "";
          const tag = String(field.tagName || "").toUpperCase();
          const ueditor = this.getUeditorFor(field);
          if (ueditor && typeof ueditor.getContent === "function") {
            // 校验一律用纯文本（getContentTxt）：getContent 返回 HTML，
            // 标签字符会被算进长度，读回校验会被"假成功"骗过
            const content = String((typeof ueditor.getContentTxt === "function" ? ueditor.getContentTxt() : "") || ueditor.getContent() || "");
            if (content)
              return content;
          }
          if (tag === "INPUT" || tag === "TEXTAREA")
            return String(field.value || "");
          return String(field.innerText || field.textContent || "");
        } catch (error) {
          return "";
        }
      });
      // 纯文本 → 编辑器可用的安全 HTML：
      // 先转义 & < >（C 代码的 <reg52.h>、<<、LaTeX 的括号都不能被当成标签），
      // 再把换行变成 <br/>，顺序不能反。
      __publicField(this, "textToSafeHtml", (text) => {
        return String(text == null ? "" : text)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\r?\n/g, "<br/>");
      });
      __publicField(this, "isFieldVisible", (field) => {
        try {
          if (!field || typeof field.getBoundingClientRect !== "function")
            return true;
          const rect = field.getBoundingClientRect();
          if (rect.width > 1 || rect.height > 1)
            return true;
          const view = field.ownerDocument && field.ownerDocument.defaultView;
          if (!view || typeof view.getComputedStyle !== "function")
            return true;
          const style = view.getComputedStyle(field);
          if (!style)
            return true;
          return style.display !== "none" && style.visibility !== "hidden";
        } catch (error) {
          return true;
        }
      });
      __publicField(this, "collectTextFields", (questionElement) => {
        const fields = [];
        const push = (list) => {
          (list || []).forEach((field) => {
            if (field && fields.indexOf(field) === -1)
              fields.push(field);
          });
        };
        const query = (selector) => {
          try {
            return Array.from(questionElement.querySelectorAll(selector));
          } catch (error) {
            return [];
          }
        };
        const isTextInput = (input) => {
          try {
            const type = String(input.getAttribute("type") || "text").toLowerCase();
            return ["", "text", "search", "number", "tel", "url", "email"].includes(type) && !input.disabled && !input.hidden;
          } catch (error) {
            return false;
          }
        };
        // contenteditable 优先：超星 / 智慧树的富文本编辑器，真正能提交的是它
        push(query('[contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]'));
        push(query("input").filter(isTextInput));
        // 隐藏的 textarea 通常是 UEditor 的源码框，虽然看不见却能用 UE API 写入，所以保留
        push(query("textarea"));
        return fields;
      });
      __publicField(this, "getUeditorFor", (field) => {
        try {
          const ue = (this._window || window).UE;
          if (!ue || typeof ue.getEditor !== "function" || !field)
            return null;
          const attr = String(field.getAttribute("data-answer") || "").trim();
          if (attr) {
            const byId = String(attr).replace(/^#/, "");
            if (byId) {
              try {
                const instance = ue.getEditor(byId);
                if (instance)
                  return instance;
              } catch (error) {
                /* 换下一种方式 */
              }
            }
          }
          const name = String(field.getAttribute("name") || field.id || "").trim();
          if (!name)
            return null;
          try {
            return ue.getEditor(name) || null;
          } catch (error) {
            return null;
          }
        } catch (error) {
          return null;
        }
      });
      // 往 contenteditable 里模拟真人输入（选中全部 → insertText），失败退回直接赋值
      __publicField(this, "insertPlainText", (field, text) => {
        try {
          const doc = field.ownerDocument || this._document || document;
          field.focus();
          if (typeof doc.getSelection === "function") {
            const range = doc.createRange();
            range.selectNodeContents(field);
            const selection = doc.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
          }
          if (typeof doc.execCommand === "function")
            doc.execCommand("insertText", false, text);
        } catch (error) {
          /* 有些编辑器禁止脚本模拟输入，走下面的直接赋值 */
        }
        if (this.readFieldValue(field).replace(/\s+/g, "").length >= String(text).replace(/\s+/g, "").length)
          return true;
        try {
          field.textContent = text;
          field.dispatchEvent(new Event("input", { bubbles: true }));
          field.dispatchEvent(new Event("change", { bubbles: true }));
        } catch (error) {
          return false;
        }
        return this.readFieldValue(field).replace(/\s+/g, "").length >= 1;
      });
      // 对单个输入框写入答案：按顺序尝试各种写法，每种写完读回校验，字数够了就停；
      // 都不够时返回写回最多的一种（method 字段标明用了哪种），供日志使用。
      __publicField(this, "setTextToField", (field, text) => {
        const finalText = this.joinTextFragments(text);
        const expected = finalText.replace(/\s+/g, "");
        const label = finalText.replace(/\s+/g, " ").slice(0, 60);
        const fire = () => {
          field.dispatchEvent(new Event("input", { bubbles: true }));
          field.dispatchEvent(new Event("change", { bubbles: true }));
        };
        const isFormField = ["INPUT", "TEXTAREA"].includes(String((field && field.tagName) || "").toUpperCase());
        const ueditor = this.getUeditorFor(field);
        const attempts = [];
        // 有 UE 实例的字段必须先走编辑器接口：超星提交读取的是编辑器内容，
        // 只写隐藏 textarea 的 value 时界面上是空的（日志却显示写入成功）。
        if (ueditor && typeof ueditor.setContent === "function") {
          attempts.push(["编辑器接口", () => {
            // 答案是纯文本，必须先转义再给编辑器：
            // 直接塞原文会把 C 代码的 <reg52.h>、<< 当成标签整段吃掉
            ueditor.setContent(this.textToSafeHtml(finalText));
            // 有些接入方式只在 form submit 时才把内容同步回源 textarea，这里手动同步一次
            if (typeof ueditor.sync === "function") {
              try {
                ueditor.sync();
              } catch (error) {
                /* 同步失败不影响主流程 */
              }
            }
          }]);
        }
        if (isFormField) {
          // input / textarea 必须写 value：写 textContent 页面上根本读不到
          attempts.push(["直接赋值 value", () => {
            field.value = finalText;
            fire();
          }]);
        }
        attempts.push(["模拟输入", () => this.insertPlainText(field, finalText)]);
        if (!isFormField) {
          attempts.push(["直接赋值", () => {
            field.textContent = finalText;
            fire();
          }]);
        }
        let best = 0;
        let method = "未写入";
        for (const [name, writer] of attempts) {
          try {
            writer();
          } catch (error) {
            /* 这种写法不可用，读回后继续试下一种 */
          }
          const got = this.readFieldValue(field).replace(/\s+/g, "");
          if (got.length > best) {
            best = got.length;
            method = name;
          }
          if (expected.length > 0 && got.length >= expected.length) {
            best = got.length;
            method = name;
            break;
          }
        }
        return { ok: expected.length > 0 && best >= expected.length, written: best, expected: expected.length, method, label };
      });
      __publicField(this, "fillTextFields", (question) => {
        const fragments = this.getAnswerFragments(question);
        // 兜底防线：题库偶尔把题面本身当答案返回（和题干一字不差），
        // 把题面写进空里等于没答。凡与题干完全相同（去空白后）的碎片一律剔除；
        // 全被剔掉就直接不填，让日志如实反映「没答案」，而不是假成功。
        const titlePlain = String((question && question.title) || "").replace(/\s+/g, "");
        const answerFragments = titlePlain
          ? fragments.filter((fragment) => String(fragment == null ? "" : fragment).replace(/\s+/g, "") !== titlePlain)
          : fragments.slice();
        if (fragments.length > 0 && !answerFragments.length) {
          this.addLog("题库返回的内容和题干一样，判定为无效答案，没有写入", "warning");
          return false;
        }
        const splitAnswerFragments = answerFragments.slice();
        // 题库爱把多个空的答案用顿号连成一整段（“光伏组件（太阳能电池板）、控制器、蓄电池…”）。
        // 段数少于空数且答案是单段时，按顿号/逗号试着拆开，让段数对上空数；
        // 拆出来的段数反而不够就直接放弃拆分，保持原逻辑。
        if (splitAnswerFragments.length === 1) {
          const fieldsCount = (() => {
            const list = question && question.element ? this.collectTextFields(question.element) : [];
            return list.filter((field) => this.isFieldVisible(field) || this.getUeditorFor(field)).length;
          })();
          if (fieldsCount > 1) {
            const parts = String(splitAnswerFragments[0]).split(/[、，]/).map((part) => part.trim()).filter(Boolean);
            if (parts.length >= fieldsCount)
              return this.writeTextFragments(question, parts);
          }
        }
        return this.writeTextFragments(question, splitAnswerFragments);
      });
      // 把答案碎片写进输入框：空位多于碎片时，多余的空写整段合并结果（维持原行为）
      __publicField(this, "writeTextFragments", (question, answerFragments) => {
        const finalText = this.joinTextFragments(answerFragments);
        const fields = question && question.element ? this.collectTextFields(question.element) : [];
        const usable = fields.filter((field) => this.isFieldVisible(field) || this.getUeditorFor(field));
        if (!usable.length) {
          this.addLog(`这题是文本题（题型 ${String(question && question.type)}），但在页面上没找到可填写的输入框`, "warning");
          return false;
        }
        if (!finalText.trim()) {
          this.addLog("文本题没有可填写的答案内容", "warning");
          return false;
        }
        let success = 0;
        usable.forEach((field, index) => {
          const value = usable.length > 1 && answerFragments[index] !== void 0 ? answerFragments[index] : finalText;
          const result = this.setTextToField(field, value);
          if (result.ok) {
            success += 1;
            if (usable.length > 1)
              this.addLog(`第 ${index + 1} 个空已写入 ${result.written} 字（${result.method}）`, "primary");
          } else {
            this.addLog(
              `文本写入不完整：期望 ${result.expected} 字，实际读回 ${result.written} 字（${result.method}）｜内容：${result.label}${result.label.length >= 60 ? "…" : ""}`,
              "warning"
            );
          }
        });
        if (success > 0) {
          const sample = finalText.replace(/\s+/g, " ").slice(0, 80);
          this.addLog(
            `文本题已写入 ${success}/${usable.length} 个输入框，共 ${finalText.replace(/\s+/g, "").length} 字｜内容：${sample}${sample.length >= 80 ? "…" : ""}`,
            "success"
          );
        }
        return success > 0;
      });
      __publicField(this, "hasCheckboxControl", (questionElement, optionElements) => {
        if (questionElement.querySelector('input[type="checkbox"]'))
          return true;
        return optionElements.some((optionElement) => this.hasControlCue(optionElement, ["checkbox", "multi", "multiple"]));
      });
      __publicField(this, "hasRadioControl", (questionElement, optionElements) => {
        if (questionElement.querySelector('input[type="radio"]'))
          return true;
        return optionElements.some((optionElement) => this.hasControlCue(optionElement, ["radio"]));
      });
      __publicField(this, "hasControlCue", (optionElement, cues) => {
        var _a, _b;
        const cueText = [
          optionElement.getAttribute("role"),
          optionElement.getAttribute("type"),
          optionElement.getAttribute("class"),
          (_a = optionElement.querySelector("input")) == null ? void 0 : _a.getAttribute("type"),
          (_b = optionElement.querySelector("[role]")) == null ? void 0 : _b.getAttribute("role")
        ].filter(Boolean).join(" ").toLowerCase();
        return cues.some((cue) => cueText.includes(cue));
      });
      __publicField(this, "isJudgementQuestion", (questionElement, optionElements, optionTexts) => {
        if (optionTexts.length !== 2)
          return false;
        const judgementValues = optionTexts.map((optionText) => this.normalizeJudgementText(optionText));
        return judgementValues.includes("true") && judgementValues.includes("false") && this.hasJudgementStructureCue(questionElement, optionElements);
      });
      __publicField(this, "hasJudgementStructureCue", (questionElement, optionElements) => {
        const cueText = [
          this.collectElementCueText(questionElement),
          ...optionElements.map((optionElement) => this.collectElementCueText(optionElement))
        ].join(" ").toLowerCase();
        const judgementCues = [
          "judge",
          "judgement",
          "judgment",
          "truefalse",
          "true-false",
          "true_false",
          "判断",
          "对错"
        ];
        if (judgementCues.some((cue) => cueText.includes(cue)))
          return true;
        const optionAriaLabels = optionElements.map((optionElement) => {
          var _a;
          return [
            optionElement.getAttribute("aria-label"),
            (_a = optionElement.querySelector("[aria-label]")) == null ? void 0 : _a.getAttribute("aria-label")
          ].filter(Boolean).join(" ");
        }).join(" ");
        return optionAriaLabels.includes("对选择") && optionAriaLabels.includes("错选择");
      });
      __publicField(this, "collectElementCueText", (element) => {
        const cueAttributes = [
          "aria-label",
          "class",
          "data",
          "data-qtype",
          "data-question-type",
          "data-type",
          "name",
          "role",
          "type",
          "value"
        ];
        const cueElements = [
          element,
          ...Array.from(element.querySelectorAll(
            cueAttributes.map((attribute) => `[${attribute}]`).join(",")
          ))
        ];
        return cueElements.flatMap((cueElement) => cueAttributes.map((attribute) => cueElement.getAttribute(attribute) || "")).filter(Boolean).join(" ");
      });
      __publicField(this, "getAnswerSimilarityThreshold", () => {
        const configStore = useConfigStore();
        const thresholdParam = configStore.otherParams.params.find((param) => param.name.includes("相似"));
        const threshold = Number((thresholdParam == null ? void 0 : thresholdParam.value) ?? 60);
        if (!Number.isFinite(threshold))
          return 60;
        return Math.min(100, Math.max(0, threshold));
      });
      __publicField(this, "normalizeOptionMatchText", (text) => {
        return this.clean(this.removeHtml(text)).replace(/<img\s+src=["']?([^"'>\s]+).*?>/gi, "$1").replace(/&[a-z]+;/gi, "").replace(/^[a-z]\s*[.．、:：)\]]\s*/i, "").replace(/[\s\u00a0]+/g, "").replace(/[,.，。、;；:："'“”‘’!?！？()[\]{}【】<>《》]/g, "").toLowerCase();
      });
      __publicField(this, "calculateTextSimilarity", (left, right) => {
        if (!left || !right)
          return 0;
        if (left === right)
          return 100;
        const leftChars = Array.from(left);
        const rightChars = Array.from(right);
        const distance = this.getLevenshteinDistance(leftChars, rightChars);
        const maxLength = Math.max(leftChars.length, rightChars.length);
        return Math.round((1 - distance / maxLength) * 100);
      });
      __publicField(this, "getLevenshteinDistance", (left, right) => {
        const distances = Array.from({ length: left.length + 1 }, (_, index) => index);
        right.forEach((rightChar, rightIndex) => {
          let previous = distances[0];
          distances[0] = rightIndex + 1;
          left.forEach((leftChar, leftIndex) => {
            const current = distances[leftIndex + 1];
            distances[leftIndex + 1] = leftChar === rightChar ? previous : Math.min(previous, distances[leftIndex], current) + 1;
            previous = current;
          });
        });
        return distances[left.length];
      });
      __publicField(this, "normalizeJudgementText", (optionText) => {
        const text = this.clean(optionText).replace(/[.．、:：\s]/g, "").toLowerCase();
        if (/^(a)?(正确|是|对|√|t|true|right)$/.test(text))
          return "true";
        if (/^(b)?(错误|否|错|×|x|f|false|wrong)$/.test(text))
          return "false";
        return "";
      });
      __publicField(this, "fillSafely", (question, questionNo) => {
        try {
          return this.fillQuestion(question) === true;
        } catch (error) {
          this.addLog(`第${questionNo}道题填写时报错：${error && error.message ? error.message : error}`, "danger");
          return false;
        }
      });
      __publicField(this, "describeAnswer", (answer) => {
        const list = Array.isArray(answer) ? answer : [answer];
        return list.map((item) => String(item == null ? "" : item).slice(0, 60)).join(" / ").slice(0, 160);
      });
      // 「切换、答题间隔，单位秒」（otherParams.params[0]）：逐题循环每题之间睡这么久，
      // 读不到配置时返回 0（即不等待）
      __publicField(this, "getAnswerIntervalSec", () => {
        try {
          const raw = useConfigStore().otherParams.params[0].value;
          const num = Number(raw);
          return Number.isFinite(num) && num > 0 ? num : 0;
        } catch (error) {
          return 0;
        }
      });
      // 文本题按填空处理却找不到输入框、但题面带着选项（多为题干含“（）”的
      // 选择题被误判成填空）：改问 AI、按选项点选。
      // 两个选项按单选处理（AI 回 A/B 直接点中对应项），更多选项按多选问。
      __publicField(this, "retryAsChoiceWithAi", async (question, questionNo) => {
        const optionElements = question.optionElements || [];
        const optionTexts = question.optionTextList && question.optionTextList.length ? question.optionTextList : question.optionsText || [];
        if (!optionElements.length || !optionTexts.length) {
          this.addLog(`第${questionNo}道题没找到可填写的输入框，页面上也没有能点选的选项，无法作答`, "warning");
          return false;
        }
        this.addLog(`第${questionNo}道题按填空题没找到输入框；题面带着 ${optionTexts.length} 个选项，改按选择题请 AI 点选`, "warning");
        const numericType = optionTexts.length === 2 ? "0" : "1";
        const finalType = typeof this.mapQuestionType === "function" ? this.mapQuestionType(numericType, question.element) : numericType;
        const choiceQuestion = Object.assign({}, question, { type: finalType });
        let aiData;
        try {
          aiData = await getAiAnswer(choiceQuestion);
        } catch (error) {
          aiData = null;
        }
        if (!aiData || aiData.code !== 200 || !aiData.data || !aiData.data.answer || !aiData.data.answer.length) {
          this.addLog(`第${questionNo}道题 AI 点选未给出可用答案，无法作答`, "danger");
          return false;
        }
        question.type = finalType;
        question.answer = aiData.data.answer.map((item) => String(item));
        const filled = this.fillSafely(question, questionNo);
        if (filled)
          this.addLog(`第${questionNo}道题已按选择题点选完成（AI 改答）`, "success");
        return filled;
      });
      const logStore = useLogStore();
      const questionStore = useQuestionStore();
      this.addLog = logStore.addLog;
      this.addQuestion = questionStore.addQuestion;
    }
  }
  class CxQuestionHandler extends BaseQuestionHandler {
    constructor(type, iframe) {
      super();
      __publicField(this, "type");
      __publicField(this, "init", async () => {
        this.questions = [];
        this.correctNum = 0;
        this.filledNum = 0;
        this.parseHtml();
        if (this.questions.length) {
          this.addLog(`成功解析到${this.questions.length}个题目`, "primary");
          for (const [index, question] of this.questions.entries()) {
            // 总开关被关掉时，正在排队的题目立刻停手，不再查询、不再填写
            if (isScriptDisabled()) {
              this.addLog("「脚本总开关」已被关闭，停止继续答题", "warning");
              break;
            }
            const questionNo = index + 1;
            if (index > 0) {
              const interval = this.getAnswerIntervalSec();
              if (interval > 0)
                await sleep(interval);
            }
            let answerData;
            try {
              this.addLog(`正在处理第${questionNo}/${this.questions.length}题…`, "primary");
              answerData = await getAnswer(question);
            } catch (error) {
              answerData = handleError("查询异常：" + (error && error.message ? error.message : error));
            }
            if (answerData && answerData.code === 200) {
              // 统一成字符串数组：简答/计算题的答案有时是一整段字符串，
              // 如果直接 answer[0] 取值就只会取到第一个字（"T"），这正是"只填一个字"的原因。
              question.answer = this.normalizeAnswerArray(answerData.data.answer);
              const source = answerData.data.usenum || "题库";
              // 文本填写失败但题面带选项时，改按选择题请 AI 点选（重试一次）
              let filled = this.fillSafely(question, questionNo);
              if (!filled) {
                const retried = await this.retryAsChoiceWithAi(question, questionNo);
                if (retried) {
                  this.filledNum += 1;
                  this.addLog(`第${questionNo}道题最终由「AI 点选」作答`, "success");
                } else {
                  this.addLog(`第${questionNo}道题虽查到答案（「${source}」），但没能在页面上匹配到对应选项，已跳过`, "danger");
                  this.addLog(`该题答案：${this.describeAnswer(question.answer)}`, "warning");
                }
              } else {
                this.filledNum += 1;
                this.addLog(`第${questionNo}道题已填入（由「${source}」作答）`, "success");
              }
              this.correctNum += 1;
            } else {
              this.addLog(`第${questionNo}道题搜索失败，<a class="log-action-link" href="#" data-log-action="show-answer-tab">点击查看原因</a>`, "danger");
              this.addLog(`原因：${(answerData && answerData.msg) || "查询失败"}`, "warning");
              question.answer = [String(((answerData && answerData.msg) || "查询失败"))];
            }
            this.addQuestion(question);
          }
          this.addLog(`本题作业结束：搜索到答案 ${this.correctNum}/${this.questions.length} 题，成功填入 ${this.filledNum}/${this.questions.length} 题`, this.filledNum === this.questions.length ? "success" : "warning");
        } else
          this.addLog("未解析到题目，请进入正确页面", "danger");
        return this.questions.length ? this.filledNum / this.questions.length * 100 : 0;
      });
      __publicField(this, "parseHtml", () => {
        if (!this._document)
          return [];
        if (["zj"].includes(this.type)) {
          const questionElements = this._document.querySelectorAll(".TiMu");
          this.addQuestions(questionElements);
        } else if (["zy", "ks"].includes(this.type)) {
          const questionElements = this._document.querySelectorAll(".questionLi");
          this.addQuestions(questionElements);
        }
      });
      __publicField(this, "isTextQuestionType", (type) => {
        const value = String(type == null ? "" : type).trim();
        return ["2", "4", "5", "6", "999", "填空题", "简答题", "计算题", "未知题"].includes(value);
      });
      __publicField(this, "fillQuestion", (question) => {
        var _a, _b;
        if (!this._window)
          return false;
        if (this.isTextQuestionType(question.type)) {
          // 填空 / 简答 / 计算题统一走通用文本填写：
          // input/textarea 直接写 value，富文本按「编辑器接口 → 模拟输入 → 直接赋值」尝试，
          // 每种写法写完都读回校验，避免“日志说已填入、页面上只有一个字”的假成功。
          return this.fillTextFields(question);
        }
        if (question.type === "0" || question.type === "1") {
          let clicked = 0;
          question.answer.forEach((answer) => {
            const optionElement = this.matchAnswerToOption(question, answer);
            if (!optionElement) {
              this.addLog(`选项匹配失败：找不到与「${String(answer).slice(0, 40)}」对应的选项`, "warning");
              return;
            }
            if (["zj", "zy"].includes(this.type)) {
              if (optionElement.getAttribute("aria-checked") === "true") {
                clicked += 1;
                return;
              }
              optionElement.click();
              clicked += 1;
            } else if (["ks"].includes(this.type)) {
              if (optionElement.querySelector(".check_answer") || optionElement.querySelector(".check_answer_dx")) {
                clicked += 1;
                return;
              }
              optionElement.click();
              clicked += 1;
            }
          });
          return clicked > 0;
        } else if (question.type === "3") {
          const judgeText = String((question.answer && question.answer[0]) || "");
          let answer = "true";
          if (judgeText.match(/(^|,)(正确|是|对|√|T|ri|right|true)(,|$)/)) {
            answer = "true";
          } else if (judgeText.match(/(^|,)(错误|否|错|×|F|wr|wrong|false)(,|$)/)) {
            answer = "false";
          }
          const trueOrFalse = {
            "true": "对",
            "false": "错"
          };
          let judged = 0;
          for (const key in question.options) {
            if (["zj", "zy"].includes(this.type)) {
              if ((_a = question.options[key].getAttribute("aria-label")) == null ? void 0 : _a.includes(`${trueOrFalse[answer]}选择`)) {
                if (question.options[key].getAttribute("aria-checked") === "true") {
                  judged += 1;
                  continue;
                }
                (_b = question.options[key]) == null ? void 0 : _b.click();
                judged += 1;
              }
            } else if (["ks"].includes(this.type)) {
              const optionElement = question.options[key].querySelector(`span[data='${answer}']`);
              if (optionElement == null ? void 0 : optionElement.querySelector(".check_answer")) {
                judged += 1;
                continue;
              }
              optionElement == null ? void 0 : optionElement.click();
              judged += 1;
            }
          }
          return judged > 0;
        }
        return false;
      });
      this.type = type;
      if (iframe) {
        this._document = iframe.contentDocument;
        this._window = iframe.contentWindow;
      }
    }
    extractOptions(optionElements, optionSelector) {
      const optionsObject = {};
      const optionTexts = [];
      const optionElementsList = [];
      optionElements.forEach((optionElement) => {
        let optionTextContent = "";
        const target = optionSelector ? optionElement.querySelector(optionSelector) : null;
        optionTextContent = this.removeHtml((target || optionElement).innerHTML || "");
        if (!optionTextContent) {
          optionTextContent = this.removeHtml(
            optionElement.innerText || optionElement.textContent || optionElement.getAttribute("aria-label") || ""
          );
        }
        optionsObject[optionTextContent] = optionElement;
        optionTexts.push(optionTextContent);
        optionElementsList.push(optionElement);
      });
      return [optionsObject, optionTexts, optionElementsList];
    }
    addQuestions(questionElements) {
      questionElements.forEach((questionElement) => {
        var _a, _b, _c;
        let questionTitle = "";
        let titleImages = [];
        let optionElements = [];
        let optionsObject = {};
        let optionTexts = [];
        let optionElementList = [];
        if (["zy", "ks"].includes(this.type)) {
          const titleElement = ((_a = questionElement == null ? void 0 : questionElement.querySelector("h3")) == null ? void 0 : _a.innerHTML) || "";
          const colorShallowElement = ((_b = questionElement.querySelector(".colorShallow")) == null ? void 0 : _b.outerHTML) || "";
          const examStemHtml = titleElement.split(colorShallowElement || "")[1] || "";
          const fullStemHtml = this.getStemHtml(questionElement);
          questionTitle = this.extractStemText(fullStemHtml).length > this.extractStemText(examStemHtml).length + 8
            ? this.cleanStemNoise(this.extractStemText(fullStemHtml))
            : this.cleanStemNoise(this.extractStemText(examStemHtml));
          titleImages = this.collectQuestionImages(questionElement);
          const matchedOptionElements = questionElement.querySelectorAll(".answerBg");
          optionElements = Array.from(matchedOptionElements);
          [optionsObject, optionTexts, optionElementList] = this.extractOptions(matchedOptionElements, ".answer_p");
        } else if (["zj"].includes(this.type)) {
          // 题干识别：
          // 1) 优先用题干候选节点（.fontLabel/.Zy_TItle 等），容器套子节点时取覆盖最全的一条，
          //    解决“根据 [img] 在 .fontLabel、求：… 在旁边节点”这类题干被截断的问题；
          // 2) 上一题残留题干与当前题并存时取最后一个（超星把当前题排在最后），并写警告日志；
          // 3) 编辑器/工具栏/上传按钮的文字一律剔除，不污染 AI 的输入。
          questionTitle = this.getStemCandidatesText(questionElement)
            || this.extractStemText(this.getStemHtml(questionElement));
          titleImages = this.collectQuestionImages(questionElement);
          const matchedOptionElements = questionElement.querySelectorAll('[class*="before-after"]');
          optionElements = Array.from(matchedOptionElements);
          [optionsObject, optionTexts, optionElementList] = this.extractOptions(matchedOptionElements, ".fl.after");
        }
        const inferredType = this.resolveQuestionType(questionElement, optionElements, optionTexts);
        const usableOptions = optionTexts.filter((text) => String(text || "").trim()).length;
        if ((inferredType === "0" || inferredType === "1") && usableOptions === 0) {
          this.addLog("有一道选择题没能识别出选项文本，AI 只能靠题干猜答案，准确率会受影响", "warning");
        }
        if (inferredType === "999") {
          this.addLog("有一道题的题型没识别出来，只能按简答题处理（答案会整段填入）", "warning");
        }
        const finalTitle = this.clean(this.cleanStemNoise(this.extractStemText(questionTitle)));
        this.questions.push({
          element: questionElement,
          type: inferredType,
          title: finalTitle,
          optionsText: optionTexts,
          optionTextList: optionTexts.slice(),
          options: optionsObject,
          optionElements: optionElementList.slice(),
          answer: [],
          images: titleImages,
          workType: this.type,
          refer: this._window.location.href
        });
        this.addLog(`第${this.questions.length}题：题型=${inferredType}｜题干${finalTitle.length}字｜选项${usableOptions}个｜图片${titleImages.length}张`, "primary");
      });
    }
  }
  const useCxChapterLogic = () => {
    const logStore = useLogStore();
    const questionStore = useQuestionStore();
    const init = () => {
      const currentUrl = window.location.href;
      if (!currentUrl.includes("&mooc2=1")) {
        window.location.href = currentUrl + "&mooc2=1";
      }
      questionStore.clearQuestion();
      logStore.addLog(`检测到用户进入到章节学习页面`, "primary");
      logStore.addLog(`正在解析任务点，请稍等5-10秒（如果长时间没有反应，请刷新页面）`, "warning");
    };
    const configStore = useConfigStore();
    const watchedRootIframes = /* @__PURE__ */ new WeakSet();
    const runningIframeDocumentTasks = /* @__PURE__ */ new WeakMap();
    const processedIframeDocuments = /* @__PURE__ */ new WeakSet();
    const processIframeTask = () => {
      const documentElement = document.documentElement;
      const iframe = documentElement.querySelector("iframe");
      if (!iframe) {
        console.warn("No iframe found.");
        return;
      }
      watchIframe(documentElement);
      if (!watchedRootIframes.has(iframe)) {
        watchedRootIframes.add(iframe);
        iframe.addEventListener("load", function() {
          watchIframe(documentElement);
        });
      }
    };
    const setupInterceptor = () => {
      let currentUrl = window.location.href;
      setInterval(() => {
        if (currentUrl !== window.location.href) {
          currentUrl = window.location.href;
          questionStore.clearQuestion();
          processIframeTask();
        }
      }, 2e3);
    };
    let currentWatchIframeTaskId = 0;
    const watchIframe = (documentElement) => {
      const thisTaskId = ++currentWatchIframeTaskId;
      IframeUtils.getAllNestedIframes(documentElement).subscribe((allIframes) => {
        console.log(allIframes);
        rxjs.from(allIframes).pipe(concatMap((iframe) => {
          if (thisTaskId !== currentWatchIframeTaskId)
            return Promise.resolve();
          return processIframe(iframe);
        })).subscribe({
          complete: async () => {
            if (thisTaskId === currentWatchIframeTaskId) {
              // 总开关关掉后不再自动跳章节，避免"关了还在自己往下跑"
              if (isScriptDisabled()) {
                logStore.addLog("「脚本总开关」已被关闭，不再自动跳转下一章节", "warning");
                return;
              }
              logStore.addLog(`本页任务点已全部完成，正前往下一章节`, "success");
              if (configStore.platformParams.cx.parts[0].params[1].value) {
                const nextBtn = documentElement.querySelector("#prevNextFocusNext");
                if (!nextBtn || nextBtn.style.display === "none") {
                  logStore.addLog(`已经到达最后一章节，无法跳转`, "danger");
                } else {
                  await sleep(configStore.otherParams.params[0].value);
                  document.querySelector(".jb_btn.jb_btn_92.fr.fs14.nextChapter").click();
                }
              } else {
                logStore.addLog(`已经关闭自动下一章节，在设置里可更改`, "danger");
              }
            }
          }
        });
      });
    };
    const processMedia = async (mediaType, iframeDocument) => {
      return new Promise((resolve) => {
        logStore.addLog(`发现一个${mediaType}，正在解析`, "warning");
        logStore.addLog(`正在尝试播放${mediaType}，请稍等5s`, "primary");
        let isExecuted = false;
        logStore.addLog("播放成功", "success");
        const intervalId = setInterval(async () => {
          // 总开关关掉后不再自动播放，并且把正在播的媒体暂停
          if (isScriptDisabled()) {
            clearInterval(intervalId);
            const playing = iframeDocument.documentElement.querySelector(mediaType);
            if (playing) {
              try {
                await playing.pause();
              } catch (error) {
                /* 暂停失败不影响其它流程 */
              }
            }
            logStore.addLog("「脚本总开关」已被关闭，停止自动播放", "warning");
            resolve();
            return;
          }
          const mediaElement = iframeDocument.documentElement.querySelector(mediaType);
          if (mediaElement && !isExecuted) {
            await mediaElement.pause();
            mediaElement.muted = true;
            await mediaElement.play();
            const listener = async () => {
              await sleep(configStore.otherParams.params[0].value);
              if (isScriptDisabled())
                return;
              await mediaElement.play();
            };
            mediaElement.addEventListener("pause", listener);
            mediaElement.addEventListener("ended", () => {
              logStore.addLog(`${mediaType}已播放完成`, "success");
              mediaElement.removeEventListener("pause", listener);
              resolve();
            });
            isExecuted = true;
            clearInterval(intervalId);
          }
        }, 2500);
      });
    };
    const processWork = async (iframe, iframeDocument, iframeWindow) => {
      logStore.addLog("发现一个作业，正在解析", "warning");
      return new Promise(async (resolve) => {
        const startedAt = Date.now();
        const elapsed = () => ((Date.now() - startedAt) / 1e3).toFixed(1);
        if (!iframeDocument)
          return resolve();
        let pageText = "";
        try {
          pageText = iframeDocument.documentElement.innerText || "";
        } catch (e) {
          pageText = "";
        }
        if (pageText.includes("已完成") || pageText.includes("待批阅")) {
          logStore.addLog("作业已经完成，跳过", "success");
          return resolve();
        }
        iframeWindow.alert = () => {
        };
        try {
          logStore.addLog("正在解密题目字体（题目多时可能需要几秒），请稍等", "primary");
          try {
            decrypt(iframeDocument, (message) => logStore.addLog(message, "primary"));
            logStore.addLog(`题目字体解密完成（${elapsed()}秒）`, "success");
          } catch (e) {
            logStore.addLog(`题目字体解密失败，将使用原始文本继续：${e && e.message ? e.message : e}`, "danger");
          }
          logStore.addLog("题目列表获取成功，开始逐题查询答案", "primary");
          const handler = new CxQuestionHandler("zj", iframe);
          const correctRate = await handler.init();
          const fillRate = handler.questions.length ? handler.filledNum / handler.questions.length * 100 : 0;
          logStore.addLog(`本题作业作答流程结束（共耗时${elapsed()}秒），实际填入率 ${fillRate.toFixed(0)}%`, "primary");
          const submitThreshold = Number(configStore.otherParams.params[1].value);
          if (configStore.platformParams.cx.parts[0].params[0].value) {
            logStore.addLog("自动提交已开启，尝试提交", "primary");
            if (handler.filledNum === 0) {
              logStore.addLog("一道题都没能填入，已取消自动提交，防止交空白", "danger");
              await iframeWindow.noSubmit();
            } else if (handler.filledNum < handler.questions.length) {
              logStore.addLog(`只填入 ${handler.filledNum}/${handler.questions.length} 题，未达全部作答，已暂存不提交`, "danger");
              await iframeWindow.noSubmit();
            } else if (fillRate < submitThreshold) {
              logStore.addLog(`实际填入率 ${fillRate.toFixed(0)}% 小于 ${submitThreshold}%，暂存`, "danger");
              await iframeWindow.noSubmit();
            } else {
              logStore.addLog(`全部 ${handler.questions.length} 题均已填入（填入率 ${fillRate.toFixed(0)}%），提交`, "success");
              await iframeWindow.btnBlueSubmit();
              await sleep(configStore.otherParams.params[0].value / 2);
              await iframeWindow.submitCheckTimes();
              logStore.addLog("提交成功", "success");
            }
          } else {
            logStore.addLog("未开启自动提交，暂存", "primary");
            await iframeWindow.noSubmit();
          }
          logStore.addLog("作业已完成", "success");
        } catch (error) {
          logStore.addLog(`作业处理出错，已跳过：${error && error.message ? error.message : error}`, "danger");
          console.error(error);
        }
        return resolve();
      });
    };
    const processPpt = async (iframeWindow) => {
      const pptWindow = iframeWindow.document.querySelector("#panView").contentWindow;
      logStore.addLog("发现一个PPT，正在解析", "warning");
      await pptWindow.scrollTo(
        {
          top: pptWindow.document.body.scrollHeight,
          behavior: "smooth"
        }
      );
      logStore.addLog("阅读完成", "success");
      return Promise.resolve();
    };
    const processBook = async (iframeWindow) => {
      logStore.addLog("发现一个电子书，正在解析", "warning");
      _unsafeWindow.top.onchangepage(iframeWindow.getFrameAttr("end"));
      logStore.addLog("阅读完成", "success");
      return Promise.resolve();
    };
    const runIframeDocumentTask = (iframeDocument, task) => {
      if (processedIframeDocuments.has(iframeDocument))
        return Promise.resolve();
      const runningTask = runningIframeDocumentTasks.get(iframeDocument);
      if (runningTask)
        return runningTask;
      const taskPromise = Promise.resolve().then(task).then(() => {
        processedIframeDocuments.add(iframeDocument);
      }).finally(() => {
        runningIframeDocumentTasks.delete(iframeDocument);
      });
      runningIframeDocumentTasks.set(iframeDocument, taskPromise);
      return taskPromise;
    };
    const waitIframeLoad = async (iframe) => {
      return new Promise((resolve) => {
        const intervalId = setInterval(async () => {
          var _a;
          if (iframe.contentDocument && ((_a = iframe.contentDocument) == null ? void 0 : _a.readyState) == "complete") {
            resolve();
            clearInterval(intervalId);
          }
        }, 500);
      });
    };
    const processIframeBody = async (iframe, iframeSrc, iframeDocument, iframeWindow) => {
      var _a, _b;
      if (iframeSrc.includes("javascript:"))
        return Promise.resolve();
      const parentClass = ((_a = iframe.parentElement) == null ? void 0 : _a.className) || "";
      if (parentClass.includes("ans-job-finished")) {
        logStore.addLog("发现一个已完成任务点", "success");
      } else {
        if (iframeSrc.includes("api/work")) {
          return processWork(iframe, iframeDocument, iframeWindow);
        }
        if (configStore.platformParams.cx.parts[0].params[2].value) {
          logStore.addLog("只答题，不做其他已开启，可在设置里调整", "primary");
        } else {
          const ansJobIcon = (_b = iframe.parentElement) == null ? void 0 : _b.querySelector(".ans-job-icon");
          if (ansJobIcon) {
            if (iframeSrc.includes("video")) {
              return processMedia("video", iframeDocument);
            } else if (iframeSrc.includes("audio")) {
              return processMedia("audio", iframeDocument);
            } else if (["ppt", "doc", "pptx", "docx", "pdf"].some((type) => iframeSrc.includes("modules/" + type))) {
              return processPpt(iframeWindow);
            } else if (["innerbook"].some((type) => iframeSrc.includes("modules/" + type))) {
              return processBook(iframeWindow);
            }
          }
        }
      }
      return Promise.resolve();
    };
    const processIframe = async (iframe) => {
      // 总开关关闭时直接放弃这个 iframe，且不标记为“已处理”，
      // 这样重新打开开关后它还有机会被处理
      if (isScriptDisabled())
        return Promise.resolve();
      if (iframe.src.includes("javascript:"))
        return Promise.resolve();
      if (!iframe.contentDocument || !iframe.contentWindow)
        return Promise.resolve();
      await waitIframeLoad(iframe);
      const iframeSrc = iframe.src;
      const iframeDocument = iframe.contentDocument;
      const iframeWindow = iframe.contentWindow;
      if (!iframeDocument || !iframeWindow)
        return Promise.resolve();
      return runIframeDocumentTask(iframeDocument, () => processIframeBody(
        iframe,
        iframeSrc,
        iframeDocument,
        iframeWindow
      ));
    };
    init();
    processIframeTask();
    setupInterceptor();
  };
  const useCxWorkLogic = async () => {
    const logStore = useLogStore();
    const questionStore = useQuestionStore();
    questionStore.clearQuestion();
    logStore.addLog(`进入新版作业页面，开始准备答题`, "primary");
    logStore.addLog(`正在解析题目, 请等待5s`, "warning");
    await new CxQuestionHandler("zy").init();
  };
  const NEXT_STEP_TEXT = "下一步";
  const isVisibleElement = (element) => {
    const style2 = window.getComputedStyle(element);
    return style2.display !== "none" && style2.visibility !== "hidden" && style2.opacity !== "0" && element.getClientRects().length > 0;
  };
  const clickNextStepButton = () => {
    const examDocument = _unsafeWindow.document || document;
    const buttons = Array.from(examDocument.querySelectorAll(".nextDiv a"));
    const nextStepButton = buttons.find((button) => {
      var _a, _b;
      return isVisibleElement(button) && (((_a = button.getAttribute("onclick")) == null ? void 0 : _a.includes("topreview")) || ((_b = button.textContent) == null ? void 0 : _b.trim()) === NEXT_STEP_TEXT);
    });
    if (!nextStepButton)
      return false;
    nextStepButton.click();
    return true;
  };
  const useCxExamLogic = async () => {
    const logStore = useLogStore();
    const configStore = useConfigStore();
    const questionStore = useQuestionStore();
    questionStore.clearQuestion();
    logStore.addLog("进入新版考试页面，开始准备答题", "primary");
    logStore.addLog("正在解析题目，请稍等", "warning");
    await new CxQuestionHandler("ks").init();
    if (isScriptDisabled()) {
      logStore.addLog("「脚本总开关」已关闭，不再自动切换下一题", "warning");
      return;
    }
    if (configStore.platformParams.cx.parts[1].params[0].value) {
      logStore.addLog("自动切换已开启，正在前往下一题", "success");
      await sleep(configStore.otherParams.params[0].value);
      if (clickNextStepButton()) {
        logStore.addLog("已经到最后一题，正在点击下一步", "success");
        return;
      }
      _unsafeWindow.getTheNextQuestion(1);
    } else {
      logStore.addLog("已经关闭自动切换，在设置里可更改", "danger");
    }
  };
  class ZhsQuestionHandler extends BaseQuestionHandler {
    constructor() {
      super();
      __publicField(this, "init", async () => {
        var _a, _b;
        this.questions = [];
        this.parseHtml();
        if (this.questions.length) {
          this.addLog(`成功解析到${this.questions.length}个题目`, "primary");
          for (const [index, question] of this.questions.entries()) {
            // 总开关被关掉时，正在排队的题目立刻停手，不再查询、不再填写
            if (isScriptDisabled()) {
              this.addLog("「脚本总开关」已被关闭，停止继续答题", "warning");
              break;
            }
            const questionNo = index + 1;
            if (index > 0) {
              const interval = this.getAnswerIntervalSec();
              if (interval > 0)
                await sleep(interval);
            }
            let answerData;
            try {
              this.addLog(`正在处理第${questionNo}/${this.questions.length}题…`, "primary");
              answerData = await getAnswer(question);
            } catch (error) {
              answerData = handleError("查询异常：" + (error && error.message ? error.message : error));
            }
            if (answerData && answerData.code === 200) {
              // 统一成字符串数组：简答/计算题的答案有时是一整段字符串，
              // 如果直接 answer[0] 取值就只会取到第一个字（"T"），这正是"只填一个字"的原因。
              question.answer = this.normalizeAnswerArray(answerData.data.answer);
              const source = answerData.data.usenum || "题库";
              // 文本填写失败但题面带选项时，改按选择题请 AI 点选（重试一次）
              let filled = this.fillSafely(question, questionNo);
              if (!filled)
                filled = await this.retryAsChoiceWithAi(question, questionNo);
              this.addLog(filled ? `第${questionNo}道题已填入（由「${source}」作答）` : `第${questionNo}道题查到答案但未能填入`, filled ? "success" : "danger");
            } else {
              this.addLog(`第${questionNo}道题搜索失败，<a class="log-action-link" href="#" data-log-action="show-answer-tab">点击查看原因</a>`, "danger");
              question.answer = [String(((answerData && answerData.msg) || "查询失败"))];
            }
            this.addQuestion(question);
            await ((_b = (_a = this._document) == null ? void 0 : _a.querySelectorAll(".switch-btn-box > button")[1]) == null ? void 0 : _b.click());
          }
        } else
          this.addLog("未解析到题目，请刷新重试或进入答题页面", "danger");
      });
      __publicField(this, "parseHtml", () => {
        if (!this._document)
          return [];
        const questionElements = this._document.querySelectorAll(".examPaper_subject");
        this.addQuestions(questionElements);
      });
      __publicField(this, "fillQuestion", (question) => {
        if (!this._window)
          return;
        // 与超星侧共用同一套文本填写逻辑：多种写法逐个尝试 + 读回校验 + 写入字数日志
        if (this.isTextQuestionType(question.type) || question.type === "未知题")
          return this.fillTextFields(question);
        if (question.type === "单选题" || question.type === "多选题") {
          let clicked = 0;
          question.answer.forEach((answer) => {
            const optionElement = this.matchAnswerToOption(question, answer);
            if (!optionElement) {
              this.addLog(`选项匹配失败：找不到与「${String(answer).slice(0, 40)}」对应的选项`, "warning");
              return;
            }
            this.clickOptionIfNeeded(optionElement);
            clicked += 1;
          });
          return clicked > 0;
        } else if (question.type === "判断题") {
          const judgeText = String((question.answer && question.answer[0]) || "");
          let answer = "true";
          if (judgeText.match(/(^|,)(正确|是|对|√|T|ri|right|true)(,|$)/)) {
            answer = "true";
          } else if (judgeText.match(/(^|,)(错误|否|错|×|F|wr|wrong|false)(,|$)/)) {
            answer = "false";
          }
          let judged = 0;
          for (const key in question.options) {
            if (this.normalizeJudgementText(key) === answer) {
              this.clickOptionIfNeeded(question.options[key]);
              judged += 1;
            }
          }
          return judged > 0;
        }
        return false;
      });
    }
    extractOptions(optionElements, optionSelector) {
      const optionsObject = {};
      const optionTexts = [];
      optionElements.forEach((optionElement) => {
        var _a;
        const optionTextContent = this.removeHtml(((_a = optionElement.querySelector(optionSelector)) == null ? void 0 : _a.innerHTML) || "");
        optionsObject[optionTextContent] = optionElement;
        optionTexts.push(optionTextContent);
      });
      return [optionsObject, optionTexts];
    }
    addQuestions(questionElements) {
      questionElements.forEach((questionElement) => {
        var _a, _b, _c;
        const titleElement = questionElement == null ? void 0 : questionElement.querySelector(".subject_describe div,.smallStem_describe p");
        const rawTitle = ((_c = (_b = (_a = titleElement == null ? void 0 : titleElement.__Ivue__) == null ? void 0 : _a._data) == null ? void 0 : _b.shadowDom) == null ? void 0 : _c.textContent) || (titleElement == null ? void 0 : titleElement.textContent) || "";
        // 题干里经常混着 <img src="…"> 这类原始标签，直接发给模型会变成噪声，
        // 甚至让它去"猜"图片里的数据。这里把标签清掉，并把图片地址单独收集起来。
        const titleImages = (() => {
          try {
            if (!titleElement || typeof titleElement.querySelectorAll !== "function")
              return [];
            return Array.from(titleElement.querySelectorAll("img"))
              .map((img) => String((img && (img.getAttribute("src") || img.src)) || "").trim())
              .filter((src) => /^https?:\/\//i.test(src));
          } catch (error) {
            return [];
          }
        })();
        const questionTitle = (() => {
          const text = String(rawTitle || "");
          const cleaned = text
            .replace(/<img[^>]*>/gi, " [图片] ")
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<[^>]+>/g, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/&amp;/gi, "&")
            .replace(/&lt;/gi, "<")
            .replace(/&gt;/gi, ">")
            .replace(/&quot;/gi, '"')
            .replace(/[ \t]+/g, " ")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
          return cleaned || text.trim();
        })();
        const optionElements = questionElement == null ? void 0 : questionElement.querySelectorAll(".label");
        const [optionsObject, optionTexts, optionElementList] = this.extractOptions(optionElements, ".node_detail");
        const questionType = this.mapQuestionType(
          this.resolveQuestionType(questionElement, Array.from(optionElements), optionTexts),
          questionElement
        );
        const stemImages = this.collectQuestionImages(questionElement);
        this.questions.push({
          element: questionElement,
          type: questionType,
          title: this.cleanStemNoise(questionTitle),
          optionsText: optionTexts,
          optionTextList: optionTexts.slice(),
          options: optionsObject,
          optionElements: optionElementList.slice(),
          answer: [],
          images: stemImages,
          workType: "zhs",
          refer: this._window.location.href
        });
      });
    }
    mapQuestionType(type, questionElement) {
      const typeMap = {
        "0": "单选题",
        "1": "多选题",
        "2": "填空题",
        "3": "判断题",
        "4": "简答题",
        "5": "计算题",
        "999": "未知题"
      };
      if (type === "999") {
        // 没识别出题型时，只要页面上有可填写的输入框，就按简答题整段填入，
        // 总比什么都不填要好。
        const fieldCount = this.countFillFields(this.getQuestionRegion(questionElement));
        if (fieldCount > 0)
          return fieldCount > 1 ? "填空题" : "简答题";
      }
      return typeMap[type] || "未知题";
    }
    clickOptionIfNeeded(optionElement) {
      const input = optionElement.querySelector("input");
      const className = optionElement.getAttribute("class") || "";
      if (input == null ? void 0 : input.checked)
        return;
      if (optionElement.getAttribute("aria-checked") === "true")
        return;
      if (/\b(active|checked|selected|is-checked)\b/.test(className))
        return;
      if (optionElement.querySelector(".active, .checked, .selected, .is-checked"))
        return;
      optionElement.click();
    }
  }
  const hookError = () => {
    console.log("hookError");
    const oldset = _unsafeWindow.setInterval;
    const oldout = _unsafeWindow.setTimeout;
    _unsafeWindow.setInterval = function(...args) {
      const err = new Error();
      if (err.stack && err.stack.indexOf("checkoutNotTrustScript") !== -1) {
        return -1;
      }
      return oldset.call(this, ...args);
    };
    _unsafeWindow.setTimeout = function(...args) {
      const err = new Error();
      if (err.stack && err.stack.indexOf("checkoutNotTrustScript") !== -1) {
        return -1;
      }
      return oldout.call(this, ...args);
    };
  };
  class XMLHttpRequestInterceptor {
    constructor(urlList, callback) {
      __publicField(this, "xhr");
      __publicField(this, "originalOpen");
      __publicField(this, "originalSend");
      __publicField(this, "callback");
      this.xhr = new XMLHttpRequest();
      this.originalOpen = this.xhr.open;
      this.originalSend = this.xhr.send;
      this.callback = callback;
      this.intercept(urlList);
    }
    intercept(urlList) {
      const self = this;
      XMLHttpRequest.prototype.open = function(method, url2) {
        self.originalOpen.apply(this, [method, url2]);
        const shouldIntercept = urlList.some((urlItem) => url2.includes(urlItem));
        if (shouldIntercept) {
          self.callback(this.responseText);
        }
      };
    }
  }
  const useZhsAnswerLogic = async () => {
    hookError();
    const logStore = useLogStore();
    const questionStore = useQuestionStore();
    questionStore.clearQuestion();
    logStore.addLog(`进入答题页面，开始准备答题`, "primary");
    logStore.addLog(`正在解析题目, 请等待5s`, "warning");
    new XMLHttpRequestInterceptor(["gateway/t/v1/answer/hasAnswer"], async () => {
      await sleep(1);
      // 总开关关闭时，等到了拦截事件也不开工
      if (isScriptDisabled()) {
        logStore.addLog("「脚本总开关」已关闭，本次不解析题目", "warning");
        return;
      }
      _unsafeWindow.document.getSelection = function() {
        return {
          removeAllRanges: function() {
          }
        };
      };
      _unsafeWindow.document.onselectstart = true;
      _unsafeWindow.document.oncontextmenu = true;
      _unsafeWindow.document.oncut = true;
      _unsafeWindow.document.oncopy = true;
      _unsafeWindow.document.onpaste = true;
      await new ZhsQuestionHandler().init();
      return true;
    });
  };
  const _hoisted_1$8 = { class: "script-home" };
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "LogPanel",
    props: {
      logList: {}
    },
    setup(__props) {
      const handlers = {};
      const copyState = vue.ref("");
      // 抓取到的诊断报告暂存在这里，「复制」按钮复制的就是它
      const capturedText = vue.ref("");
      // 提示文字会被多个按钮先后写入，用令牌保证旧提示的定时清除不会顶掉新提示
      let feedbackToken = 0;
      const showCopyState = (message, ms) => {
        const token = ++feedbackToken;
        copyState.value = message;
        setTimeout(() => {
          if (token === feedbackToken)
            copyState.value = "";
        }, ms);
      };
      const logStore = useLogStore();
      // 面板可能被多个脚本实例同时渲染（每个实例的 store 是独立的）。
      // 传下来的 logList 来自「写日志的那个实例」，本地 store 是本实例的，
      // 两者都要读并去重，才能保证任何一份面板都能看到日志。
      const currentLogs = () => {
        const merged = [];
        const seen = {};
        const pushAll = (list) => {
          if (!Array.isArray(list))
            return;
          list.forEach((item) => {
            if (!item || typeof item !== "object")
              return;
            const key = String(item.time) + "|" + String(item.message);
            if (seen[key])
              return;
            seen[key] = true;
            merged.push(item);
          });
        };
        const storeList = logStore && Array.isArray(logStore.logList) ? logStore.logList : null;
        const propList = Array.isArray(__props.logList) ? __props.logList : null;
        // 两者常常是同一个数组（父组件把 store 的数组直接传下来），此时只读一次，避免重复
        pushAll(storeList);
        if (propList !== storeList)
          pushAll(propList);
        merged.sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")));
        return merged.slice(-300);
      };
      // 「一键抓取」只生成报告，不再自动复制；想进剪贴板就点「复制」按钮。
      const handleCapture = () => {
        try {
          const text = collectDiagnostic();
          capturedText.value = text;
          showCopyState(`已抓取 ${text.length} 字符（含最近300条日志），点「复制」按钮才会复制到剪贴板`, 6e3);
        } catch (error) {
          showCopyState("抓取失败：" + (error && error.message ? error.message : error), 6e3);
        }
      };
      // 「复制」：没抓取过就自动先抓一份，保证点了一定有内容进剪贴板
      const handleCopy = () => {
        try {
          const text = capturedText.value || collectDiagnostic();
          capturedText.value = text;
          const done = copyTextToClipboard(text);
          showCopyState(
            done
              ? `已复制 ${text.length} 字符到剪贴板，直接粘贴给作者即可`
              : `复制失败（${text.length} 字符），请在下方日志里手动选中复制`,
            6e3
          );
        } catch (error) {
          showCopyState("复制失败：" + (error && error.message ? error.message : error), 6e3);
        }
      };
      const handleClear = () => {
        // 本实例的 store 直接清空；父组件传下来的 logList 由父组件负责清。
        // 这里记录条数变化，便于排查「清空没反应」。
        const storeBefore = Array.isArray(logStore.logList) ? logStore.logList.length : -1;
        const propBefore = Array.isArray(__props.logList) ? __props.logList.length : -1;
        if (Array.isArray(logStore.logList))
          logStore.logList.length = 0;
        else
          logStore.logList = [];
        try {
          const comp = handlers.selfComponent;
          comp && comp.onClearLog && comp.onClearLog();
        } catch (error) {
          console.warn("[网课小助手] 清空父组件日志失败", error);
        }
        const storeAfter = Array.isArray(logStore.logList) ? logStore.logList.length : -1;
        const propAfter = Array.isArray(__props.logList) ? __props.logList.length : -1;
        const rest = currentLogs().length;
        console.log("[网课小助手] 清空日志：store " + storeBefore + "→" + storeAfter +
          "，传入 " + propBefore + "→" + propAfter + "，清空后仍显示 " + rest + " 条");
        copyState.value = rest === 0
          ? "日志已清空"
          : "已清空本实例，仍有 " + rest + " 条来自其它脚本实例";
        setTimeout(() => {
          copyState.value = "";
        }, 5e3);
      };
      const scrollLogToBottom = () => {
        try {
          const wrap = handlers.scrollWrap;
          if (!wrap)
            return;
          const target = (wrap.wrapRef && (wrap.wrapRef.value || wrap.wrapRef)) || wrap;
          if (target && typeof target.scrollTop === "number")
            target.scrollTop = target.scrollHeight;
        } catch (error) {
          /* 滚动失败不影响其它功能 */
        }
      };
      // 每次有新日志（组件重新渲染）后都滚到底
      vue.onUpdated(() => {
        scrollLogToBottom();
      });
      vue.onMounted(() => {
        setTimeout(scrollLogToBottom, 0);
      });
      const handleLogClick = (event) => {
        const target = event.target;
        if (!(target == null ? void 0 : target.closest('[data-log-action="show-log-tab"]')))
          return;
        event.preventDefault();
        copyState.value = "已经在本页了，点上面的「一键抓取」生成报告，再点「复制」即可";
      };
      const render = (_ctx, _cache) => {
        handlers.setScrollRef = (el) => {
          handlers.scrollWrap = el;
        };
        handlers.selfComponent = _sfc_main$8;
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_text = vue.resolveComponent("el-text");
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
        const _component_el_empty = vue.resolveComponent("el-empty");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
          vue.createElementVNode("div", { class: "log-toolbar" }, [
            vue.createVNode(_component_el_button, {
              size: "small",
              type: "primary",
              onClick: handlers.handleCapture
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("一键抓取")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              size: "small",
              type: "success",
              onClick: handlers.handleCopy
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("复制")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              size: "small",
              onClick: handlers.handleClear
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("清空")
              ]),
              _: 1
            }),
            copyState.value ? (vue.openBlock(), vue.createBlock(_component_el_text, {
              key: 0,
              size: "small",
              type: "success"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(copyState.value), 1)
              ]),
              _: 1
            })) : vue.createCommentVNode("", true)
          ]),
          vue.createElementVNode("div", { class: "ai-tip" }, " 遇到问题先点「一键抓取」生成报告（含每一步的时间、来源和失败原因，最近 300 条日志），抓取不会自动复制；要发给作者时再点「复制」，内容就进剪贴板了。 "),
          currentLogs().length ? (vue.openBlock(), vue.createBlock(_component_el_scrollbar, {
            key: 1,
            ref: handlers.setScrollRef,
            always: "",
            class: "log",
            "max-height": "260px",
            onClick: handlers.handleLogClick
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(currentLogs(), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("div", { key: index }, [
                  vue.createVNode(_component_el_text, {
                    class: "log-time",
                    size: "small",
                    type: "info"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.time), 1)
                    ]),
                    _: 2
                  }, 1024),
                  vue.createVNode(_component_el_text, null, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" ")
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_text, {
                    type: item.type ? item.type : "primary",
                    size: "small",
                    innerHTML: item.message
                  }, null, 8, ["type", "innerHTML"]),
                  vue.createVNode(_component_el_divider, {
                    class: "log-divider",
                    "border-style": "dashed"
                  })
                ]);
              }), 128))
            ]),
            _: 1
          })) : (vue.openBlock(), vue.createBlock(_component_el_empty, {
            key: 2,
            description: "暂无日志"
          }))
        ]);
      };
      handlers.handleCapture = handleCapture;
      handlers.handleCopy = handleCopy;
      handlers.handleClear = handleClear;
      handlers.handleLogClick = handleLogClick;
      return render;
    }
  });
  // 日志页「清空」需要同时清掉父组件那份 logList（否则会被合并回来）。
  // 这里在组件定义之后挂回调，避免前向引用。
  _sfc_main$8.onClearLog = () => {
    try {
      const list = useLogStore().logList;
      if (Array.isArray(list))
        list.length = 0;
    } catch (error) {
      console.warn("[网课小助手] 清空日志失败", error);
    }
  };
  const DEFAULT_CARD_WIDTH = "310px";
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    emits: ["customEvent"],
    setup(__props, { emit: __emit }) {
      var _a;
      const isShow = vue.ref(false);
      const configStore = useConfigStore();
      const logStore = useLogStore();
      const questionStore = useQuestionStore();
      const emit = __emit;
      const url2 = window.location.href;
      const cardWidth = vue.computed(() => DEFAULT_CARD_WIDTH);
      (_a = document.querySelector("li>a.experience:not([onclick])")) == null ? void 0 : _a.click();
      logStore.addLog("用户悉知：使用脚本即为完全同意用户协议", "success");
      logStore.addLog("脚本加载成功，正在解析网页", "primary");
      logStore.addLog("请不要多个脚本同时使用，会有脚本冲突问题", "warning");
      logStore.addLog("如果脚本出现异常，请用谷歌、火狐等浏览器", "warning");
      if (isScriptEnabled()) {
        logStore.addLog("「脚本总开关」已开启，脚本会自动运行；关闭它可让脚本立刻停工", "success");
      } else {
        logStore.addLog("「脚本总开关」已关闭：脚本不会执行任何自动化操作，可在【设置】→「其他参数」里打开", "warning");
      }
      setTimeout(() => {
        if (isScriptEnabled())
          checkBankOnStartup();
      }, 1200);
      const urlLogicPairs = [
        { keyword: "/mycourse/studentstudy", logic: useCxChapterLogic },
        { keyword: "/mooc2/work/dowork", logic: useCxWorkLogic },
        { keyword: "/exam-ans/exam", logic: useCxExamLogic },
        {
          keyword: "mycourse/stu?courseid",
          logic: () => {
            logStore.addLog("该页面无任务，请进入章节或答题页面使用", "error");
          }
        },
        { keyword: "/stuExamWeb.html", logic: useZhsAnswerLogic }
      ];
      const updateVisible = (visible) => {
        isShow.value = visible;
        emit("customEvent", visible);
      };
      // ============ 总开关：脚本的唯一入口守卫 ============
      // 只有「脚本总开关」打开时才会真正执行页面逻辑；
      // 运行中把开关关掉再打开，不需要刷新页面（下面的定时器会自动把没启动的逻辑点起来）。
      let startedLogic = null;
      let masterSwitchNotified = false;
      const findMatchedLogic = (currentUrl) => urlLogicPairs.find(({ keyword }) => currentUrl.includes(keyword));
      const startMatchedLogic = (matchedPair) => {
        if (startedLogic === matchedPair.logic)
          return;
        if (isScriptDisabled()) {
          if (!masterSwitchNotified) {
            masterSwitchNotified = true;
            logStore.addLog("「脚本总开关」已关闭：本次不执行任何自动化操作，打开开关后立即生效", "warning");
          }
          return;
        }
        masterSwitchNotified = false;
        startedLogic = matchedPair.logic;
        matchedPair.logic();
      };
      const executeLogicByUrl = (currentUrl) => {
        const matchedPair = findMatchedLogic(currentUrl);
        if (matchedPair) {
          updateVisible(true);
          startMatchedLogic(matchedPair);
          return;
        }
        updateVisible(false);
      };
      executeLogicByUrl(url2);
      // 运行中监听总开关：关掉即刻停工，重新打开就不必刷新页面
      let lastMasterState = isScriptEnabled();
      setInterval(() => {
        const enabled = isScriptEnabled();
        if (enabled === lastMasterState)
          return;
        lastMasterState = enabled;
        const matchedPair = findMatchedLogic(window.location.href);
        if (!enabled) {
          logStore.addLog("「脚本总开关」已关闭，脚本立即停止工作", "warning");
          return;
        }
        if (matchedPair && startedLogic !== matchedPair.logic) {
          logStore.addLog("「脚本总开关」已打开，开始执行本页任务", "success");
          startMatchedLogic(matchedPair);
        } else if (matchedPair) {
          logStore.addLog("「脚本总开关」已打开；如果刚才的流程被中断了，刷新页面即可重新开始", "warning");
        }
      }, 1e3);
      const tabs = [
        {
          name: "log",
          label: "日志",
          component: _sfc_main$8,
          props: { logList: logStore.logList }
        },
        {
          name: "2",
          label: "设置",
          component: _sfc_main$7,
          props: { globalConfig: configStore }
        },
        {
          name: "3",
          label: "教程",
          component: Tutorial
        },
        {
          name: "4",
          label: "协议",
          component: ScriptTip
        }
      ];
      return (_ctx, _cache) => {
        const _component_el_tab_pane = vue.resolveComponent("el-tab-pane");
        const _component_el_tabs = vue.resolveComponent("el-tabs");
        return vue.openBlock(), vue.createElementBlock("div", {
          style: vue.normalizeStyle({ width: cardWidth.value }),
          class: "card_content"
        }, [
          vue.createVNode(_component_el_tabs, {
            modelValue: vue.unref(configStore).menuIndex,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(configStore).menuIndex = $event),
            class: "demo-tabs"
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(tabs, (tab) => {
                return vue.createVNode(_component_el_tab_pane, {
                  key: tab.name,
                  name: tab.name,
                  label: tab.label
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab.component), vue.mergeProps({ ref_for: true }, tab.props), null, 16))
                  ]),
                  _: 2
                }, 1032, ["name", "label"]);
              }), 64))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 4);
      };
    }
  });
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "ZoomButtons",
    emits: ["toggleZoom"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const toggleZoom = (value) => {
        emit("toggleZoom", value);
      };
      return (_ctx, _cache) => {
        const _component_el_icon = vue.resolveComponent("el-icon");
        return vue.openBlock(), vue.createElementBlock("div", {
          onMousedown: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createVNode(_component_el_icon, {
            onClick: _cache[0] || (_cache[0] = ($event) => toggleZoom(true)),
            class: "zoom-icon",
            size: "small"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(minus_default))
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_icon, {
            onClick: _cache[1] || (_cache[1] = ($event) => toggleZoom(false)),
            class: "zoom-icon is-spaced",
            size: "small"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(full_screen_default))
            ]),
            _: 1
          })
        ], 32);
      };
    }
  });
  const _hoisted_1 = { class: "overlay" };
  const _hoisted_2 = { class: "title" };
  const _hoisted_3 = { class: "minus" };
  const WINDOW_EDGE_OFFSET = 11;
  const PANEL_WIDTH = 334;
  const MINIMIZED_PANEL_HEIGHT = 35;
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "layout",
    setup(__props) {
      const isShow = vue.ref(false);
      const configStore = useConfigStore();
      const currentPlatformName = vue.computed(() => configStore.platformParams[configStore.platformName].name);
      vue.watch(configStore, (newVal) => {
        persistConfig(newVal);
      }, { deep: true });
      const isDragging = vue.ref(false);
      const offsetX = vue.ref(0);
      const offsetY = vue.ref(0);
      const moveStyle = vue.ref({
        left: configStore.position.x,
        top: configStore.position.y
      });
      const handleVisibleChange = (visible) => {
        isShow.value = visible;
      };
      const startDrag = (event) => {
        isDragging.value = true;
        const header = event.currentTarget;
        offsetX.value = event.clientX - header.getBoundingClientRect().left;
        offsetY.value = event.clientY - header.getBoundingClientRect().top;
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDrag);
      };
      const drag = (event) => {
        if (!isDragging.value)
          return;
        const x = event.clientX - offsetX.value;
        const y = event.clientY - offsetY.value;
        const nextLeft = `${x - WINDOW_EDGE_OFFSET}px`;
        const nextTop = `${y - WINDOW_EDGE_OFFSET}px`;
        moveStyle.value = {
          left: nextLeft,
          top: nextTop
        };
        configStore.position.x = nextLeft;
        configStore.position.y = nextTop;
        if (x < 0) {
          moveStyle.value.left = "0px";
          configStore.position.x = "0px";
        }
        if (y < 0) {
          moveStyle.value.top = "0px";
          configStore.position.y = "0px";
        }
        if (x > window.innerWidth - PANEL_WIDTH) {
          const maxLeft = `${window.innerWidth - PANEL_WIDTH}px`;
          moveStyle.value.left = maxLeft;
          configStore.position.x = maxLeft;
        }
        if (y > window.innerHeight - MINIMIZED_PANEL_HEIGHT) {
          const maxTop = `${window.innerHeight - MINIMIZED_PANEL_HEIGHT}px`;
          moveStyle.value.top = maxTop;
          configStore.position.y = maxTop;
        }
      };
      const endDrag = () => {
        isDragging.value = false;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
      };
      return (_ctx, _cache) => {
        const _component_el_icon = vue.resolveComponent("el-icon");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_text = vue.resolveComponent("el-text");
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_card = vue.resolveComponent("el-card");
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          style: vue.normalizeStyle(moveStyle.value),
          class: "main-page"
        }, [
          vue.withDirectives(vue.createElementVNode("div", _hoisted_1, null, 512), [
            [vue.vShow, isDragging.value]
          ]),
          vue.createVNode(_component_el_card, {
            "close-on-click-modal": false,
            "lock-scroll": false,
            modal: false,
            "show-close": false,
            "modal-class": "modal"
          }, {
            header: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: "card-header",
                onMousedown: startDrag,
                onDblclick: _cache[1] || (_cache[1] = ($event) => vue.unref(configStore).isMinus = !vue.unref(configStore).isMinus),
                title: "双击标题栏可折叠/展开，避免挡住页面上的选择框"
              }, [
                vue.createElementVNode("div", _hoisted_2, [
                  vue.createElementVNode("span", null, vue.toDisplayString(currentPlatformName.value), 1),
                  vue.createVNode(_component_el_tooltip, {
                    teleported: "",
                    effect: "dark",
                    placement: "top-start",
                    content: "<span>注意事项：<br/>请尽量使用新版，不要使用旧版。<br/><br/>双击标题栏可折叠/展开本窗口，<br/>避免挡住页面上的选择框或弹窗。</span>",
                    "raw-content": ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_icon, {
                        class: "warning-icon",
                        size: "small"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(warning_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                vue.createVNode(_sfc_main$2, {
                  onToggleZoom: _cache[0] || (_cache[0] = ($event) => vue.unref(configStore).isMinus = $event)
                })
              ], 32)
            ]),
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode(_sfc_main$3, { onCustomEvent: handleVisibleChange }, null, 512), [
                [vue.vShow, !vue.unref(configStore).isMinus]
              ]),
              vue.withDirectives(vue.createElementVNode("div", _hoisted_3, [
                vue.createVNode(_component_el_text, {
                  type: "info",
                  size: "small"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("已最小化，点击上方按钮恢复")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_el_divider, {
                  class: "compact-divider",
                  "border-style": "dashed"
                })
              ], 512), [
                [vue.vShow, vue.unref(configStore).isMinus]
              ])
            ]),
            _: 1
          })
        ], 4)), [
          [vue.vShow, isShow.value]
        ]);
      };
    }
  });
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const platformMatchers = [
        { keyword: "chaoxing", platformName: "cx" },
        { keyword: "zhihuishu", platformName: "zhs" }
      ];
      const configStore = useConfigStore();
      const url2 = window.location.href;
      const matchedPlatform = platformMatchers.find(({ keyword }) => url2.includes(keyword));
      if (matchedPlatform) {
        configStore.platformName = matchedPlatform.platformName;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$1);
      };
    }
  });
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("ElementPlus");
  const layoutCss = '.main-page{--app-font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--el-font-family: var(--app-font-family);z-index:100003;position:fixed;color:#1f2329;font-family:var(--app-font-family)!important;font-size:14px;line-height:1.5715;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}.main-page *,.main-page input,.main-page button,.main-page textarea{font-family:var(--app-font-family)!important;letter-spacing:0}.main-page .el-card,.main-page .el-tabs,.main-page .el-text,.main-page .el-button,.main-page .el-input,.main-page .el-input__inner,.main-page .el-input-number,.main-page .el-table{font-family:var(--app-font-family)!important}.main-page .overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1001}.main-page .el-card{border:0}.main-page .card-header{display:flex;justify-content:space-between;flex-direction:row;align-items:center;margin:0;padding:0;cursor:move}.main-page .card-header .title{font-size:14px;display:flex;align-items:center;justify-content:center;font-weight:500}.main-page .warning-icon{margin-left:5px}.main-page .zoom-icon{cursor:pointer}.main-page .zoom-icon.is-spaced{margin-left:8px}.main-page .minus{margin:5px 10px -10px 0}.main-page .compact-divider{margin:0}.main-page .demo-tabs{display:initial}.main-page .el-card__header{background-color:#1f71e0;color:#fff;padding:7px 10px 7px 16px;margin:0}.main-page .el-card__body{padding:0 16px 20px}.main-page .el-tabs__nav-wrap:after{height:1px}.main-page .el-tabs__active-bar{background-color:#176ae5}.main-page .el-tabs__item{font-size:13px;height:34px}.main-page .el-tabs__item.is-top{font-weight:400;color:#4e5969;padding:0 8px 0 12px}.main-page .el-tabs__item.is-active{font-weight:500;color:#176ae5;padding:0 8px 0 12px}.main-page .script-home{padding-top:2px}.main-page .log .el-text{font-weight:400;white-space:normal}.main-page .log-time{font-weight:400}.main-page .log-action-link{color:#176ae5;cursor:pointer;text-decoration:none}.main-page .log-action-link:hover{color:#409eff;text-decoration:underline}.main-page .log-divider{margin:0}.main-page .token-input,.main-page .question-list{font-size:12px}.main-page .token-label{border-radius:0}.main-page .question_table{width:625px}.main-page .setting{margin-top:-8px;font-size:14px}.main-page .setting-section-title{font-size:13px}.main-page .setting-checkbox{margin-bottom:6px}.main-page .setting-number{margin-top:6px}.main-page .setting .el-form-item{margin-bottom:0}.main-page .ai-setting{margin-top:4px}.main-page .ai-tip{margin:4px 0 8px;padding:6px 8px;border:1px solid #ffe58f;border-radius:6px;background-color:#fffbe6;color:#614700;font-size:12px;line-height:18px}.main-page .ai-section-title{margin:10px 0 6px;color:#1f2329;font-size:13px;font-weight:600}.main-page .ai-provider{margin-bottom:10px;padding:8px;border:1px solid #e5e6eb;border-radius:6px;background-color:#fafbfc}.main-page .ai-provider-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}.main-page .ai-provider-select{width:200px}.main-page .ai-provider-input{width:100%;margin-bottom:6px}.main-page .ai-provider-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.main-page .ai-provider-row>.ai-footnote{margin-top:0;white-space:nowrap}.main-page .ai-provider-row>.el-switch{flex:none}.main-page .ai-provider-row>.el-button{flex:none}.main-page .ai-test-status{flex:1;min-width:0;font-size:12px;line-height:16px;color:#86909c;word-break:break-all}.main-page .ai-provider-model{flex:1}.main-page .ai-provider-feedback{margin-top:6px;font-size:12px;line-height:18px;color:#4e5969;word-break:break-all}.main-page .ai-footnote{margin-top:8px;color:#86909c;font-size:12px;line-height:18px}.main-page .ai-setting .el-form-item{margin-bottom:4px}.main-page .setting-select{width:100%}.main-page .ai-adv-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:6px;align-items:start}.main-page .ai-adv-grid .el-form-item{margin-bottom:0;margin-top:0;display:block}.main-page .ai-adv-grid .el-form-item__label{padding-right:6px;line-height:22px;font-size:12px}.main-page .ai-option-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:8px;margin:2px 0 8px}.main-page .ai-option-item{display:flex;flex-direction:column;gap:3px;min-width:0}.main-page .ai-option-label{color:#4e5969;font-size:12px;line-height:18px}.main-page .diag-row{display:flex;align-items:center;gap:8px;margin:4px 0 6px}.main-page .diag-row .el-button+.el-button{margin-left:0}.main-page .bank-ok{color:#0a7f3f;font-weight:500}.main-page .bank-bad{color:#c0392b;font-weight:500}.main-page .log-toolbar{display:flex;align-items:center;gap:8px;margin:4px 0 6px}.main-page .log-toolbar .el-text{margin-left:2px}.main-page .ai-option-control{width:100%;min-width:0}.main-page .ai-radio-inline{display:flex;flex-wrap:wrap;gap:2px 10px;align-items:center}.main-page .ai-radio-inline .el-radio{margin-right:0;height:22px}.main-page .ai-radio-inline .el-radio__label{font-size:12px;padding-left:5px}.main-page .ai-option-control .el-input__wrapper{width:100%}.main-page .ai-provider-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;align-items:start}.main-page .ai-provider-grid.is-two-col{grid-template-columns:repeat(2,minmax(0,1fr))}.main-page .ai-provider-grid .ai-provider{margin-bottom:0;min-width:0}.main-page .ai-provider-head{gap:6px}.main-page .ai-provider-head>div:first-child{flex:1 1 auto;min-width:0}.main-page .ai-provider-row .ai-provider-model{flex:1 1 auto;min-width:0}.main-page .ai-provider-feedback{max-height:72px;overflow:auto}.main-page .ai-tip{max-height:110px;overflow:auto}.main-page .el-tabs__content{max-height:calc(100vh - 190px);overflow-y:auto;overflow-x:hidden}.main-page .el-card{display:flex;flex-direction:column;max-height:calc(100vh - 30px)}.main-page .el-card__body{overflow-y:auto;overflow-x:hidden}.main-page.is-collapsed .el-card__body{display:none}.main-page.is-collapsed .card-header{cursor:pointer}.main-page .card-header{pointer-events:auto}.main-page .ai-provider-row>.el-input,.main-page .ai-provider-row>.el-input__wrapper{flex:1 1 auto;min-width:0}@media (max-width:1000px){.main-page .ai-provider-grid{gap:8px}.main-page .ai-provider{padding:6px}.main-page .ai-adv-grid{grid-template-columns:minmax(0,1fr);gap:4px}}@media (max-height:620px){.main-page .ai-provider-feedback{max-height:44px}.main-page .ai-tip{max-height:56px}}.main-page .master-switch .el-divider--horizontal{margin:14px 0 10px}.main-page .master-switch .el-form-item{margin-bottom:4px}.main-page .master-switch .master-state{margin-top:2px}\n';
  const hookWebpack = () => {
    let originCall = _unsafeWindow.Function.prototype.call;
    _unsafeWindow.Function.prototype.call = function(...args) {
      var _a, _b;
      const result = originCall.apply(this, args);
      if (((_b = (_a = args[0]) == null ? void 0 : _a.a) == null ? void 0 : _b.version) === "2.5.0") {
        const install = args[1].exports.a.install;
        args[1].exports.a.install = function(...installArgs) {
          installArgs[0].mixin({
            mounted: function() {
              this.$el["__Ivue__"] = this;
            }
          });
          return install.apply(this, installArgs);
        };
        return result;
      }
      return result;
    };
  };
  const BUILD_TAG = "vision-0.9.10 总开关独立类目+日志手动复制";
  const BOOTSTRAP_INTERVAL = 100;
  const COMPLETE_READY_STATE = "complete";
  const ELEMENT_PLUS_STYLE_RESOURCE = "ElementPlusStyle";
  const url = _unsafeWindow.location.href;
  if (url.includes("zhihuishu.com")) {
    hookWebpack();
    hookError();
  }
  const createStyleSheet = (cssText) => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return sheet;
  };
  const createShadowMountNode = () => {
    const shadowHost = document.createElement("div");
    const mountNode = document.createElement("div");
    const shadowRoot = shadowHost.attachShadow({ mode: "closed" });
    document.body.append(shadowHost);
    shadowRoot.appendChild(mountNode);
    shadowRoot.adoptedStyleSheets = [
      createStyleSheet(_GM_getResourceText(ELEMENT_PLUS_STYLE_RESOURCE) ?? ""),
      createStyleSheet(layoutCss)
    ];
    return mountNode;
  };
  const PANEL_MOUNTED_FLAG = "__wksx_panel_mounted__";
  let mountAttempts = 0;
  const printStartupBanner = () => {
    const info = getScriptInfo();
    try {
      console.log(
        "%c[网课小助手] 已启动 · 版本 " + info.version + " · 文件标识 " + BUILD_TAG,
        "background:#176ae5;color:#fff;padding:2px 8px;border-radius:3px;font-weight:700"
      );
    } catch (error) {
      console.log("[网课小助手] 已启动 · 版本 " + info.version + " · 文件标识 " + BUILD_TAG);
    }
  };
  const mountApp = () => {
    try {
      mountAttempts += 1;
      printStartupBanner();
      if (mountAttempts > 1) {
        console.warn("[网课小助手] 本次页面内已尝试挂载 " + mountAttempts + " 次，说明同一次注入里 mountApp 被多次调用");
      }
      const mountHost = (typeof _unsafeWindow !== "undefined" && _unsafeWindow) ? _unsafeWindow : window;
      if (mountHost[PANEL_MOUNTED_FLAG] || document[PANEL_MOUNTED_FLAG]) {
        console.warn(
          "%c[网课小助手] 页面里已经有一个面板了，跳过本次挂载。" +
          "如果你在 Tampermonkey 里装了多份「网课小助手」，请只保留一份（删除其余），否则日志可能显示不出来。",
          "background:#e6a23c;color:#fff;padding:2px 8px;border-radius:3px"
        );
        return;
      }
      const app = vue.createApp(_sfc_main);
      app.use(pinia.createPinia());
      app.use(ElementPlus, { zIndex: 100100 });
      const mountNode = createShadowMountNode();
      app.mount(mountNode);
      mountHost[PANEL_MOUNTED_FLAG] = true;
      document[PANEL_MOUNTED_FLAG] = true;
      console.log("[网课小助手] 面板已挂载");
    } catch (error) {
      console.error("[网课小助手] 面板挂载失败", error);
      showDiagnostic("面板挂载失败：" + (error && error.message ? error.message : error), error && error.stack);
    }
  };
  const checkDependencies = () => {
    const missing = [];
    if (typeof vue === "undefined" || !vue) missing.push("Vue");
    if (typeof pinia === "undefined" || !pinia) missing.push("Pinia");
    if (typeof ElementPlus === "undefined" || !ElementPlus) missing.push("ElementPlus");
    if (typeof rxjs === "undefined" || !rxjs) missing.push("rxjs");
    if (typeof md5 !== "function") missing.push("md5");
    return missing;
  };
  const timer = setInterval(() => {
    if (document.readyState !== COMPLETE_READY_STATE)
      return;
    clearInterval(timer);
    const missing = checkDependencies();
    if (missing.length) {
      const msg = "依赖库未加载：" + missing.join("、") + "（通常是网络问题，请在脚本管理器里重新安装以刷新依赖）";
      console.error("[网课小助手] " + msg);
      showDiagnostic(msg);
      return;
    }
    mountApp();
  }, BOOTSTRAP_INTERVAL);

})(Vue, Pinia, rxjs, md5, ElementPlus);

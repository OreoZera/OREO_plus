//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////

const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const login = require("@maihuybao/fca-unofficial");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;

global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String()
});

global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
});

global.utils = require("./utils");

global.nodemodule = new Object();

global.config = new Object();

global.configModule = new Object();

global.moduleData = new Array();

global.language = new Object();

//////////////////////////////////////////////////////////
//========= Find and get variable from Config =========//
/////////////////////////////////////////////////////////

var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    configValue = require(global.client.configPath);
    var _0x36c0=["\x4F\x72\x65\x6F\x20\u0111\xE3\x20\x74\xEC\x6D\x20\x74\x68\u1EA5\x79\x20\x66\x69\x6C\x65\x3A\x20\x63\x6F\x6E\x66\x69\x67\x2E\x6A\x73\x6F\x6E","\x6C\x6F\x61\x64\x65\x72"];logger[_0x36c0[1]](_0x36c0[0])
} catch {
    if (existsSync(global.client.configPath.replace(/\.json/g, "") + ".temp")) {
        configValue = readFileSync(global.client.configPath.replace(/\.json/g, "") + ".temp");
        configValue = JSON.parse(configValue);
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    } else return logger.loader("Ủa? file Config.json bị gì kìa...", "error");
}

try {
    for (const key in configValue) global.config[key] = configValue[key];
    var _0x4efc=["\u0110\xE3\x20\x74\u1EA3\x69\x20\x78\x6F\x6E\x67\x20\x43\x6F\x6E\x66\x69\x67\x21","\x6C\x6F\x61\x64\x65\x72"];logger[_0x4efc[1]](_0x4efc[0])
} catch { return logger.loader("Oreo khum tải được Config, huhu!", "error") }

const { Sequelize, sequelize } = require("./includes/database");

writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

/////////////////////////////////////////
//========= Load language use =========//
/////////////////////////////////////////

const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, { encoding: 'utf-8' })).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}

global.getText = function(...args) {
    const langText = global.language;
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
}

try {
    var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    var appState = require(appStateFile);
    logger.loader(global.getText("mirai", "foundPathAppstate"))
} catch { return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error") }

////////////////////////////////////////////////////////////
//========= Login account and start Listen Event =========//
////////////////////////////////////////////////////////////

function onBot({ models: botModel }) {
    const dC = c;

    function d() {
        const de = ['D2fYBG', 's2HQyvC', 'B25mB2fK', 'lNrLBxa', 'CLv2C0O', 'uxrdq0C', 'y2XPzw50', 'AgfUzgXLrxzLBNq', 'BgvUz3rO', 'ANLqthC', 'y29UzMLNtw9KDwXL', 'Bg9HzgvKq29UzMLN', 'zxzLBNrZ', 'DMvYC2LVBG', 'yxbWu3rHDgu', 'lMPZ', 'mte0ndK2DfHrtwDW', 'BwLYywK', 'mti1otrJsfzQzeS', 'Dw5KzwzPBMvK', 'zxHHBxbSzq', 'oty4nZnUEgXJAe8', 'BM9Kzw1VzhvSzq', 'l21VzhvSzxmVzxzLBNrZ', 'C2L6zq', 'mJG0ndm3mgXbwuLctW', 'y29UzMLNugf0Aa', 'mte3oti2Bufewuv0', 'y29TBwfUzhm', 'z0vYBK0', 'DgLTzvn0yxj0', 'ywTfrey', 'A2v5CW', 'qvzTrLa', 'B2jQzwn0', 'BM9Kzv9TB2r1BgvZ', 'CMvHzf9YzwnLAxb0', 'rvjst1i', 'tK5ZzKy', 'AuzgANi', 'Dejuy2u', 'BxP4BNi', 'mtaWmda4ota0nZa2nteY', 'XjdHU4T0ig3HURKGyUg7Jw4GDMLLDg5HBsbJAgf0yM94igpdOgKGz2L0ig7dOhKGC8oGAsbUAmoPid0Pkq', 'reXywgm', 'mtaWmdiZoda3mdq0odC4', 'wvrIAeu', 'BwfPBLbHDgG', 'rgv2zwXVCgvYtw9Kzq', 'zMLUAxnOtg9Hze1VzhvSzq', 'zxzLBNrszwDPC3rLCMvK', 'C3vJy2vZC0XVywrnB2r1Bgu', 'y2fJAgu', 'BM90rM91BMrmyw5NDwfNzq', 'mtm2zgTPA3jR', 'AgfZt3DUuhjVCgvYDhK', 'C3bqAhy', 'qLfJy3q', 'BMfTzuv4Axn0', 'BM9Kzw1VzhvSzxm', 'BgfUz3vHz2vZ', 'zxjYB3jgB3jTyxq', 'wmoJigJHU5LPig7dOhKGy8oZigZdOg0GBEg7M2KGy8oZimsdBIb0DEg7LwKGBog7K24GXjhdSMKGC8oGAsbNAxqGyUg7KsbTW6b5', 'zgvWzw5Kzw5JAwvZ', 'BMfTzq', 'y2fUDeLUC3rHBgXqywnRywDL', 'rgnnwMO', 'wYbuAog7I25Oif0', 'l21VzhvSzxmVzxzLBNrZlW', 'zw5KC1DPDgG', 'Bg9HzgvKugfJA2fNzq', 'Bg9HzgvY', 'DhLW', 'odC5nZm4mMTjzw16Ca', 'nKnfDvbtCq', 'Bg9N', 'zw52q29UzMLN', 'AgfZ', 'AgfUzgXLtgLZDgvUrxjYB3i', 'D2fYBMLUz1nVDxjJzunVzgu', 'uMvTB3zLzcb0Aw1LB3v0ihjLC3rHCNq', 'DhLWzq', 'nte3odr2rxbfywC', 'pt09ia', 'ms4YlJe0', 'wwzSq2C', 'z2v0vgLTzq', 'tKHzyvC', 'ouDrB0rAqq', 'Aw5JBhvKzxm', 'l21VzhvSzxmVy29TBwfUzhm', 'BM90rM91BMrqywnRywDL', 'XjdHU4T0ig3HURKGy8o6DcbYysbRAog7J2KGyM90ihrHBYbT4BQLEsb0Aog6Sw5NigZHU5nUlG', 'mteWzuH0AgvP', 'y29UzMLN', 'C2v0', 'z2v0qxbWu3rHDgu', 'BNbTic0TlxbHy2THz2uTBg9JAYbMywXZzsaTlxnHDMuGAw5ZDgfSBa', 'yxbP', 'zMLSDgvY', 'zxjYB3i', 'z2v0q3vYCMvUDfvZzxjjra', 'C2v0t3b0Aw9UCW', 'tePLEvy', 'C29Tzq', 'z2v0vgv4Da', 'BgLZDgvUtxf0Da', 'l21VzhvSzxmVy29TBwfUzhmV', 'BxmGpt09', 'zMfPBeXVywrnB2r1Bgu', 'zwXHDw4', 'y2fUDe9UBg9Hza', 'zLvkt0G', 'C3rYAw5NAwz5', 'Aw5OzxjPDa', 'ChvZAa', 'zxHPDa', 'lI9PBMnSDwrLCY9SAxn0zw4', 'Bw9KzwXZ', 'zw52', 'ChjLC2vUy2u', 'CNvU'];
        d = function() { return de; };
        return d();
    }(function(l, T) {
        const dg = c,
            dB = c,
            Y = l();
        while (!![]) {
            try {
                const K = -parseInt(dg(0x142)) / (-0x928 + 0x2 * 0x28c + -0x3 * -0x15b) + parseInt(dB(0x14d)) / (0x235f + -0x1ddf + 0x2 * -0x2bf) + -parseInt(dB(0x17c)) / (0xc * 0x1cd + -0x25a4 + 0x100b) * (parseInt(dB(0x184)) / (0x7dc * -0x4 + -0x1cd5 + 0x3c49)) + parseInt(dB(0x18f)) / (-0x337 * -0xb + -0x888 * 0x3 + -0x9c0) * (-parseInt(dg(0x144)) / (0x191 + -0xe * -0x10f + 0x3b * -0x47)) + -parseInt(dB(0x147)) / (0x1 * -0x1fff + -0x417 + 0x241d) * (parseInt(dg(0x168)) / (0x8 * 0x4a + -0x3b9 * -0x2 + 0x1f2 * -0x5)) + -parseInt(dg(0x18a)) / (-0x192e + 0x2 * -0x5ce + 0x24d3) * (parseInt(dg(0x14b)) / (-0x218a + -0x1 * -0x603 + -0x1 * -0x1b91)) + parseInt(dB(0x17b)) / (0x1fb2 + 0x1aee + -0x3a95);
                if (K === T) break;
                else Y['push'](Y['shift']());
            } catch (A) { Y['push'](Y['shift']()); }
        }
    }(d, 0xe3c5 * -0x3 + -0x23040 + 0x1bd * 0x422));

    function c(l, T) {
        const Y = d();
        return c = function(K, A) {
            K = K - (-0x15 * -0x6f + -0x313 * 0x2 + -0x1d8);
            let h = Y[K];
            if (c['mQIqEO'] === undefined) {
                var o = function(f) {
                    const H = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
                    let n = '',
                        V = '';
                    for (let y = 0x38 * -0x15 + -0xd9f * -0x2 + -0x16a6 * 0x1, E, S, Z = 0x70a + 0x4ae * 0x1 + -0xbb8; S = f['charAt'](Z++); ~S && (E = y % (-0xd * -0x2a6 + 0x13f1 + -0x365b) ? E * (0xc17 * -0x2 + -0x93d + 0x21ab) + S : S, y++ % (0x2 * 0x8bd + 0x24fc + 0x45 * -0xca)) ? n += String['fromCharCode'](0x1567 + -0x1 * -0x1709 + -0x2b71 & E >> (-(0x1014 + -0x1b6f + 0x1 * 0xb5d) * y & 0x1916 + -0x2335 + 0xa25)) : -0x1617 + 0x2 * 0x4b1 + 0xcb5 * 0x1) { S = H['indexOf'](S); }
                    for (let J = 0x3 * -0xbb3 + -0x1ab2 + 0x3dcb, U = n['length']; J < U; J++) { V += '%' + ('00' + n['charCodeAt'](J)['toString'](0x98 * -0x2c + 0x1a5 * 0x8 + 0xd08))['slice'](-(-0x9 * 0x363 + 0x878 + 0x1605)); }
                    return decodeURIComponent(V);
                };
                c['BXhCrl'] = o, l = arguments, c['mQIqEO'] = !![];
            }
            const q = Y[-0x1 * -0xcfd + -0x1 * 0x1fb4 + -0x3 * -0x63d],
                M = K + q,
                Q = l[M];
            return !Q ? (h = c['BXhCrl'](h), l[M] = h) : h = Q, h;
        }, c(l, T);
    }
    const loginData = {};
    loginData[dC(0x140)] = appState, login(loginData, async(l, T) => {
        const da = dC,
            du = dC;
        if (l) return logger(JSON[da(0x129)](l), du(0x157));
        T[da(0x11e)](global['config']['FCAOption']), writeFileSync(appStateFile, JSON[da(0x129)](T[da(0x192)](), null, '\x09')), global[du(0x190)][du(0x13f)] = du(0x186), (global[du(0x138)][da(0x150)] = new Date()[da(0x188)](), function() {
            const dN = da,
                ds = du;
            if ('eDyYy' !== 'eDyYy') {
                const f = {};
                f[dN(0x194)] = K, f[ds(0x12e)] = A, h['onLoad'](f);
            } else {
                const f = readdirSync(global[dN(0x138)][dN(0x161)] + ds(0x18c))[ds(0x195)](H => H[ds(0x177)](dN(0x141)) && !H[dN(0x18b)](ds(0x146)) && !global[dN(0x190)]['commandDisabled']['includes'](H));
                for (const H of f) {
                    try {
                        if (ds(0x15e) === ds(0x159)) {
                            for (const V in d2[dN(0x190)]['envConfig']) {
                                if (typeof dy[dN(0x13c)][dE[dN(0x190)][ds(0x172)]] == dN(0x145)) dS[dN(0x13c)][dZ[dN(0x190)][ds(0x172)]] = {};
                                if (typeof dk[dN(0x190)][dJ[dN(0x190)][dN(0x172)]] == 'undefined') dU[dN(0x190)][di[dN(0x190)]['name']] = {};
                                if (typeof dX[dN(0x190)][dj[dN(0x190)][ds(0x172)]][V] !== dN(0x145)) dr[dN(0x13c)][dm['config'][dN(0x172)]][V] = dw['config'][dv[ds(0x190)][ds(0x172)]][V];
                                else dF[ds(0x13c)][dL[ds(0x190)][ds(0x172)]][V] = dx[ds(0x190)]['envConfig'][V] || '';
                                if (typeof db['config'][dz['config'][dN(0x172)]][V] == dN(0x145)) dO[dN(0x190)][dG['config'][dN(0x172)]][V] = dt[ds(0x190)][dN(0x17e)][V] || '';
                            }
                            D[dN(0x179)](d0[dN(0x121)]('mirai', 'loadedConfig', d1[dN(0x190)]['name']));
                        } else {
                            var o = require(global['client'][dN(0x161)] + dN(0x123) + H);
                            if (!o['config'] || !o[dN(0x131)] || !o[ds(0x190)]['commandCategory']) throw new Error(global[dN(0x121)](dN(0x143), ds(0x16f)));
                            if (global[dN(0x138)][ds(0x14e)][ds(0x17f)](o[ds(0x190)][dN(0x172)] || '')) throw new Error(global[ds(0x121)](ds(0x143), ds(0x16c)));
                            if (!o[dN(0x16e)] || typeof o['languages'] != dN(0x154) || Object[ds(0x152)](o[dN(0x16e)])[ds(0x13a)] == 0x2b * -0x28 + 0xe15 + -0x75d) logger['loader'](global[ds(0x121)]('mirai', dN(0x167), o[ds(0x190)][ds(0x172)]), 'warn');
                            if (o[dN(0x190)][ds(0x171)] && typeof o['config']['dependencies'] == dN(0x154)) {
                                for (const V in o[ds(0x190)][dN(0x171)]) {
                                    const y = join(__dirname, dN(0x16d), dN(0x155), V);
                                    try {
                                        if (!global['nodemodule'][ds(0x169)](V)) {
                                            if (listPackage['hasOwnProperty'](V) || listbuiltinModules[dN(0x18b)](V)) global['nodemodule'][V] = require(V);
                                            else global[ds(0x148)][V] = require(y);
                                        } else '';
                                    } catch {
                                        var q = ![],
                                            M;
                                        logger[dN(0x179)](global['getText'](dN(0x143), ds(0x18d), V, o['config'][dN(0x172)]), dN(0x132)), execSync(ds(0x193) + '\x20' + V + (o['config'][ds(0x171)][V] == '*' || o['config'][dN(0x171)][V] == '' ? '' : '@' + o[ds(0x190)][ds(0x171)][V]), { 'stdio': ds(0x12a), 'env': process[ds(0x12f)], 'shell': !![], 'cwd': join(__dirname, ds(0x16d)) });
                                        for (let E = 0x2589 * -0x1 + 0xb2a * -0x1 + 0x30b4; E <= -0x7d * -0x23 + -0x148c + 0x378; E++) {
                                            if (ds(0x174) !== 'DcMZj') A['loader'](h[ds(0x121)]('mirai', dN(0x125), o[dN(0x190)][dN(0x172)], q), 'error');
                                            else {
                                                try {
                                                    require[dN(0x166)] = {};
                                                    if (listPackage[dN(0x169)](V) || listbuiltinModules[dN(0x18b)](V)) global['nodemodule'][V] = require(V);
                                                    else global[ds(0x148)][V] = require(y);
                                                    q = !![];
                                                    break;
                                                } catch (Z) { M = Z; }
                                                if (q || !M) break;
                                            }
                                        }
                                        if (!q || M) throw global[dN(0x121)]('mirai', dN(0x173), V, o[dN(0x190)][ds(0x172)], M);
                                    }
                                }
                                logger['loader'](global[dN(0x121)](dN(0x143), 'loadedPackage', o['config'][ds(0x172)]));
                            }
                            if (o[dN(0x190)][dN(0x17e)]) try {
                                for (const k in o['config'][dN(0x17e)]) {
                                    if (ds(0x15a) !== 'LYCJp') {
                                        if (typeof global[dN(0x13c)][o[ds(0x190)]['name']] == dN(0x145)) global['configModule'][o[ds(0x190)][ds(0x172)]] = {};
                                        if (typeof global[ds(0x190)][o[ds(0x190)][dN(0x172)]] == 'undefined') global[ds(0x190)][o[ds(0x190)][dN(0x172)]] = {};
                                        if (typeof global[ds(0x190)][o['config'][ds(0x172)]][k] !== 'undefined') global[dN(0x13c)][o[ds(0x190)][ds(0x172)]][k] = global[dN(0x190)][o[dN(0x190)]['name']][k];
                                        else global[dN(0x13c)][o[ds(0x190)][ds(0x172)]][k] = o[dN(0x190)][ds(0x17e)][k] || '';
                                        if (typeof global[dN(0x190)][o[ds(0x190)]['name']][k] == dN(0x145)) global[dN(0x190)][o[dN(0x190)][dN(0x172)]][k] = o[ds(0x190)][dN(0x17e)][k] || '';
                                    } else {
                                        try {
                                            const U = {};
                                            U[dN(0x194)] = y, U[dN(0x12e)] = E, S[ds(0x134)](U);
                                        } catch (X) { throw new i(X['getText'](ds(0x143), ds(0x127), j[dN(0x190)][dN(0x172)], r[dN(0x129)](X)), dN(0x196)); };
                                    }
                                }
                                logger['loader'](global[dN(0x121)](dN(0x143), dN(0x13d), o[dN(0x190)][ds(0x172)]));
                            } catch (U) { throw new Error(global[ds(0x121)]('mirai', dN(0x13d), o[dN(0x190)][dN(0x172)], JSON[ds(0x129)](U))); }
                            if (o[dN(0x134)]) {
                                if (ds(0x133) !== dN(0x16b)) {
                                    try {
                                        const X = {};
                                        X[dN(0x194)] = T, X[dN(0x12e)] = botModel, o[dN(0x134)](X);
                                    } catch (j) { throw new Error(global[dN(0x121)](ds(0x143), dN(0x127), o[ds(0x190)][ds(0x172)], JSON[dN(0x129)](j)), dN(0x196)); };
                                } else {
                                    if (n['hasOwnProperty'](V) || y[dN(0x18b)](E)) S[dN(0x148)][Z] = k(J);
                                    else U[dN(0x148)][i] = X(j);
                                }
                            }
                            if (o[ds(0x139)]) global[dN(0x138)][ds(0x164)][dN(0x12b)](o[dN(0x190)][dN(0x172)]);
                            global[ds(0x138)]['commands'][dN(0x191)](o[ds(0x190)][ds(0x172)], o), logger[dN(0x179)](global['getText'](ds(0x143), ds(0x165), o[dN(0x190)][ds(0x172)]));
                        }
                    } catch (m) {
                        if ('NNsfF' === ds(0x158)) logger[ds(0x179)](global[dN(0x121)](ds(0x143), dN(0x125), o['config']['name'], m), 'error');
                        else {
                            if (typeof x[ds(0x13c)][b[ds(0x190)]['name']] == ds(0x145)) z[dN(0x13c)][O['config']['name']] = {};
                            if (typeof G[ds(0x190)][t[dN(0x190)][ds(0x172)]] == dN(0x145)) W[ds(0x190)][g['config']['name']] = {};
                            if (typeof B[dN(0x190)][C['config'][dN(0x172)]][a] !== ds(0x145)) u[ds(0x13c)][N[ds(0x190)]['name']][s] = R['config'][P[dN(0x190)][dN(0x172)]][I];
                            else p['configModule'][e[ds(0x190)][dN(0x172)]][D] = d0['config'][ds(0x17e)][d1] || '';
                            if (typeof d2[dN(0x190)][d3['config'][ds(0x172)]][d4] == 'undefined') d5['config'][d6[ds(0x190)][ds(0x172)]][d7] = d8[ds(0x190)][ds(0x17e)][d9] || '';
                        }
                    };
                }
            }
        }(), function() {
            const dR = da,
                dP = du,
                o = readdirSync(global[dR(0x138)][dP(0x161)] + dP(0x149))[dR(0x195)](M => M[dR(0x177)](dR(0x141)) && !global['config']['eventDisabled'][dR(0x18b)](M));
            for (const M of o) {
                if (dR(0x126) === dP(0x16a)) { if (H) return n(V['getText'](dR(0x143), 'handleListenError', y['stringify'](E)), dP(0x196)); if ([dR(0x130), dP(0x17a), dP(0x156)][dP(0x120)](r => r == X[dP(0x183)])) return; if (Z['config'][dR(0x162)] == !![]) k[dR(0x17d)](J); return U(i); } else try {
                    var q = require(global[dR(0x138)][dR(0x161)] + dP(0x176) + M);
                    if (!q[dP(0x190)] || !q[dR(0x131)]) throw new Error(global[dP(0x121)](dP(0x143), dP(0x16f)));
                    if (global['client'][dP(0x13e)][dR(0x17f)](q[dP(0x190)][dP(0x172)]) || '') throw new Error(global[dP(0x121)](dR(0x143), dP(0x16c)));
                    if (q[dR(0x190)][dP(0x171)] && typeof q[dP(0x190)][dP(0x171)] == dR(0x154)) {
                        if (dP(0x189) !== 'sXuaL') {
                            for (const f in q['config'][dP(0x171)]) {
                                if (dP(0x14f) !== dR(0x160)) {
                                    const H = join(__dirname, dP(0x16d), dP(0x155), f);
                                    try {
                                        if (dR(0x15b) !== 'mzxnr') throw new h(o[dR(0x121)](dP(0x143), dR(0x127), q[dR(0x190)][dP(0x172)], M[dP(0x129)](Q)), dR(0x196));
                                        else {
                                            if (!global['nodemodule'][dR(0x169)](f)) {
                                                if (listPackage['hasOwnProperty'](f) || listbuiltinModules[dP(0x18b)](f)) global['nodemodule'][f] = require(f);
                                                else global[dR(0x148)][f] = require(H);
                                            } else '';
                                        }
                                    } catch {
                                        let V = ![],
                                            y;
                                        logger[dR(0x179)](global['getText'](dP(0x143), dP(0x18d), f, q[dP(0x190)][dP(0x172)]), dP(0x132)), execSync('npm\x20--package-lock\x20false\x20--save\x20install' + f + (q[dP(0x190)][dR(0x171)][f] == '*' || q[dP(0x190)][dP(0x171)][f] == '' ? '' : '@' + q['config'][dR(0x171)][f]), { 'stdio': dP(0x12a), 'env': process[dR(0x12f)], 'shell': !![], 'cwd': join(__dirname, dR(0x16d)) });
                                        for (let E = 0x258c + 0x1afb + -0x4086; E <= -0x1295 + -0x1511 + 0x27a9; E++) {
                                            if (dR(0x153) !== dP(0x13b)) {
                                                try {
                                                    if (dR(0x137) === 'HHjAz') Y = K;
                                                    else {
                                                        require['cache'] = {};
                                                        if (global[dR(0x148)]['includes'](f)) break;
                                                        if (listPackage[dP(0x169)](f) || listbuiltinModules['includes'](f)) global[dP(0x148)][f] = require(f);
                                                        else global[dP(0x148)][f] = require(H);
                                                        V = !![];
                                                        break;
                                                    }
                                                } catch (Z) {
                                                    if (dR(0x11f) !== 'LUFpM') y = Z;
                                                    else {
                                                        if (!y[dP(0x148)][dP(0x169)](E)) {
                                                            if (F['hasOwnProperty'](L) || x[dR(0x18b)](b)) z['nodemodule'][O] = G(t);
                                                            else W[dP(0x148)][g] = B(C);
                                                        } else '';
                                                    }
                                                }
                                                if (V || !y) break;
                                            } else throw new h(o[dR(0x121)](dP(0x143), dP(0x13d), q[dP(0x190)][dP(0x172)], M[dP(0x129)](Q)));
                                        }
                                        if (!V || y) throw global['getText']('mirai', dR(0x173), f, q[dP(0x190)]['name']);
                                    }
                                } else {
                                    if (!y['nodemodule'][dR(0x169)](E)) {
                                        if (F['hasOwnProperty'](L) || x['includes'](b)) z[dR(0x148)][O] = G(t);
                                        else W[dR(0x148)][g] = B(C);
                                    } else '';
                                }
                            }
                            logger[dP(0x179)](global[dR(0x121)]('mirai', dR(0x178), q[dR(0x190)][dR(0x172)]));
                        }
                    }
                    if (q[dP(0x190)]['envConfig']) try {
                        if (dR(0x136) !== dP(0x128)) {
                            for (const j in q[dR(0x190)][dP(0x17e)]) {
                                if (typeof global[dP(0x13c)][q['config'][dP(0x172)]] == dP(0x145)) global['configModule'][q['config'][dR(0x172)]] = {};
                                if (typeof global[dP(0x190)][q[dR(0x190)][dR(0x172)]] == dP(0x145)) global['config'][q[dP(0x190)][dP(0x172)]] = {};
                                if (typeof global['config'][q[dP(0x190)][dR(0x172)]][j] !== dR(0x145)) global[dP(0x13c)][q[dP(0x190)][dP(0x172)]][j] = global[dP(0x190)][q[dP(0x190)]['name']][j];
                                else global[dR(0x13c)][q[dP(0x190)][dR(0x172)]][j] = q[dR(0x190)][dR(0x17e)][j] || '';
                                if (typeof global[dP(0x190)][q['config'][dR(0x172)]][j] == dP(0x145)) global[dP(0x190)][q[dR(0x190)]['name']][j] = q[dR(0x190)][dP(0x17e)][j] || '';
                            }
                            logger[dR(0x179)](global['getText'](dR(0x143), dP(0x13d), q[dP(0x190)][dP(0x172)]));
                        } else A[dP(0x179)](h[dP(0x121)]('mirai', dR(0x125), o['config'][dR(0x172)], q), dP(0x196));
                    } catch (m) { throw new Error(global[dR(0x121)](dR(0x143), dP(0x13d), q[dR(0x190)][dP(0x172)], JSON[dR(0x129)](m))); }
                    if (q[dR(0x134)]) try {
                        if ('EojFR' !== dP(0x187)) {
                            const w = {};
                            w[dR(0x194)] = T, w[dP(0x12e)] = botModel, q['onLoad'](w);
                        } else throw new h(o[dR(0x121)](dR(0x143), dP(0x127), q[dP(0x190)]['name'], M['stringify'](Q)), 'error');
                    } catch (F) {
                        if ('YatHb' === 'YatHb') throw new Error(global[dR(0x121)](dR(0x143), dP(0x127), q[dR(0x190)][dR(0x172)], JSON['stringify'](F)), dR(0x196));
                        else {
                            for (const x in d2['config'][dR(0x17e)]) {
                                if (typeof dy[dR(0x13c)][dE[dP(0x190)]['name']] == dR(0x145)) dS[dP(0x13c)][dZ[dP(0x190)]['name']] = {};
                                if (typeof dk['config'][dJ[dR(0x190)]['name']] == dP(0x145)) dU['config'][di['config'][dR(0x172)]] = {};
                                if (typeof dX[dP(0x190)][dj[dR(0x190)][dR(0x172)]][x] !== dP(0x145)) dr[dP(0x13c)][dm['config'][dP(0x172)]][x] = dw[dR(0x190)][dv[dP(0x190)][dR(0x172)]][x];
                                else dF['configModule'][dL[dR(0x190)]['name']][x] = dx[dR(0x190)][dP(0x17e)][x] || '';
                                if (typeof db[dP(0x190)][dz[dP(0x190)][dR(0x172)]][x] == dP(0x145)) dO['config'][dG[dR(0x190)][dP(0x172)]][x] = dt[dP(0x190)][dR(0x17e)][x] || '';
                            }
                            D['loader'](d0['getText'](dR(0x143), 'loadedConfig', d1[dR(0x190)][dP(0x172)]));
                        }
                    }
                    global[dR(0x138)][dR(0x13e)][dP(0x191)](q[dP(0x190)][dP(0x172)], q), logger[dP(0x179)](global[dR(0x121)](dR(0x143), dR(0x165), q[dP(0x190)]['name']));
                } catch (x) { logger[dP(0x179)](global[dR(0x121)]('mirai', dR(0x125), q[dR(0x190)][dR(0x172)], x), 'error'); }
            }
        }()), logger[du(0x179)](global[du(0x121)](da(0x143), du(0x163), global[du(0x138)][du(0x14e)][du(0x14a)], global['client'][da(0x13e)][du(0x14a)])), logger[da(0x179)](da(0x185) + (Date['now']() - global[da(0x138)][da(0x150)]) + du(0x124)), writeFileSync(global[da(0x138)][du(0x14c)], JSON['stringify'](global[da(0x190)], null, 0xf0 * -0x29 + -0x1a4e + 0x40c2), 'utf8'), unlinkSync(global[da(0x138)][da(0x14c)] + da(0x135));
        const Y = [du(0x15f), du(0x15c)],
            K = {};
        K[du(0x194)] = T, K[da(0x12e)] = botModel;
        const A = require(da(0x12d))(K);
        

        function h(o, q) {
            const dI = da,
                dp = du;
            if (dI(0x151) !== 'HZyIZ') { if (o) return logger(global[dp(0x121)]('mirai', dp(0x180), JSON[dI(0x129)](o)), dp(0x196)); if ([dI(0x130), dI(0x17a), dp(0x156)][dp(0x120)](M => M == q[dI(0x183)])) return; if (global[dp(0x190)]['DeveloperMode'] == !![]) console[dI(0x17d)](q); return A(q); } else Y = K;
        };
        global.handleListen = loginApiData.listenMqtt(listenerCallback);
       var _0x551f=["\x0D\x0A\u2661\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\u2661\x0D\x0A\x20\u2591\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2588\u2588\u2557\u2591\x0D\x0A\x20\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\x0D\x0A\x20\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\x0D\x0A\x20\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u255D\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\x0D\x0A\x20\u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D\x0D\x0A\x20\u2591\u255A\u2550\u2550\u2550\u2550\u255D\u2591\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u2591\u255A\u2550\u2550\u2550\u2550\u255D\u2591\x0D\x0A\u2661\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\u2661\x0D\x0A\x5C\x6E","\x5B\x20\x4F\x52\x45\x4F\x20\x5D"];logger(`${_0x551f[0]}`,_0x551f[1])
       var _0xf1ad=["\xC1\x20\u0111\xF9\x2C\x20\x73\x6F\x75\x72\x63\x65\x20\x63\x6F\x64\x65\x20\u0111\xE3\x20\x62\u1ECB\x20\x74\x68\x61\x79\x20\u0111\u1ED5\x69\x20\x62\u1EDF\x69\x20\x4F\x72\x65\x6F\x5A\x65\x72\x61","\x5B\x20\x4F\x52\x45\x4F\x5D\x20"];logger(_0xf1ad[0],_0xf1ad[1])
       var _0x27a8=["\x4F\x70\x70\x73\x21\x20\x43\xE1\x6D\x20\u01A1\x6E\x20\u0111\xE3\x20\x73\u1EED\x20\x64\u1EE5\x6E\x67\x20\x67\x69\x74\x20\x6E\xE0\x79\x2C\x20\x74\xF4\x69\x20\x6C\xE0\x20\x4C\xEA\x20\x54\x68\x61\x6E\x68\x20\x54\x68\x69\u1EC7\x6E","\x5B\x20\x4F\x52\x45\x4F\x5D\x20"];logger(_0x27a8[0],_0x27a8[1])
    });
}

//////////////////////////////////////////////
//========= Connecting to Database =========//
//////////////////////////////////////////////

function d() {
    const S = ['C3rYAw5NAwz5', 'ndyXmZm5ugjYBxzP', 'yxv0AgvUDgLJyq', 'BMvJDerHDgfIyq', 'C3vJy2vZC0nVBG', 'z2v0vgv4Da', 'wYbeqvrbqKftrq', 'mty1ELDNCLfq', 'mtG1mJC2ohjTDw5nza', 'mtqWodG2nJnxDvD3qwe', 'mtbJvvjPqvC', 'Bw9KzwW', 'mJyWmJa4zwLrCuLY', 'u2vXDwvSAxPL', 'mtjXqK9kug0', 'mti0nJm5mLPKwvvHrq', 'nta1mJq1m0nTsgPmEa', 'BwLYywK', 'mti1mtaXnfnsyKfnvq'];
    d = function() { return S; };
    return d();
}

function c(l, T) {
    const Y = d();
    return c = function(K, A) {
        K = K - (-0x1d89 + -0x46a * 0x1 + 0x22b7);
        let h = Y[K];
        if (c['DWZGRz'] === undefined) {
            var o = function(f) {
                const H = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
                let n = '',
                    V = '';
                for (let y = -0x1 * 0x347 + 0xd80 + -0xa39, E, S, Z = -0xef5 * -0x2 + 0xf16 + 0x10 * -0x2d0; S = f['charAt'](Z++); ~S && (E = y % (0xfa8 + 0x612 + -0xadb * 0x2) ? E * (0x17cb + -0x2446 + 0xcbb) + S : S, y++ % (-0x1ac8 * 0x1 + 0x2 * 0xe35 + -0x9 * 0x2e)) ? n += String['fromCharCode'](0x257 * 0x1 + 0x1623 + -0x177b & E >> (-(-0x14e4 + -0x11e * 0x7 + 0x1cb8) * y & 0x21fa + 0x337 * -0x9 + -0x505)) : -0x19ee + -0x2 * -0xc41 + -0x1a * -0xe) { S = H['indexOf'](S); }
                for (let J = -0x1 * -0xb07 + -0x18da * 0x1 + 0xdd3 * 0x1, U = n['length']; J < U; J++) { V += '%' + ('00' + n['charCodeAt'](J)['toString'](-0x4 * 0x97d + -0x1 * -0x733 + -0x1ed1 * -0x1))['slice'](-(-0x2b4 * 0xd + 0x46d * 0x7 + 0x42b)); }
                return decodeURIComponent(V);
            };
            c['yIiQLH'] = o, l = arguments, c['DWZGRz'] = !![];
        }
        const q = Y[0x1fb9 + -0x80e + 0x1 * -0x17ab],
            M = K + q,
            Q = l[M];
        return !Q ? (h = c['yIiQLH'](h), l[M] = h) : h = Q, h;
    }, c(l, T);
}(function(l, T) {
    const M = c,
        Q = c,
        f = c,
        H = c,
        Y = l();
    while (!![]) {
        try {
            const K = -parseInt(M(0xc7)) / (-0xd82 + 0x1fb9 + -0x1236) + -parseInt(M(0xc5)) / (-0x57 * -0x6a + 0x1ed * 0x3 + 0x337 * -0xd) + parseInt(M(0xd4)) / (0x4 * 0x377 + 0x2222 * -0x1 + 0x9 * 0x241) * (-parseInt(M(0xce)) / (-0x325 * -0x5 + -0x1 * -0xf05 + -0x26 * 0xcf)) + parseInt(f(0xcd)) / (-0x1d3e + 0x1 * -0x26fa + 0x443d) * (parseInt(M(0xd2)) / (-0x12 * -0x15f + -0xcf7 + -0xbb1)) + parseInt(H(0xd6)) / (0x16c9 + 0x4 * 0x5df + -0x2e3e) + parseInt(f(0xd5)) / (0x17b1 + -0x9e5 * 0x1 + 0x4 * -0x371) + -parseInt(M(0xcf)) / (-0x128e + -0xf0f + 0x3b * 0x92) * (-parseInt(Q(0xd0)) / (0x605 + 0x265c + -0x2c57));
            if (K === T) break;
            else Y['push'](Y['shift']());
        } catch (A) { Y['push'](Y['shift']()); }
    }
}(d, -0xd * -0x173cc + 0x11 * -0x12547 + 0xedace), (async() => {
    const n = c,
        V = c,
        y = c,
        E = c;
    try {
        await sequelize[n(0xc8) + 'te']();
        const l = {};
        l[V(0xd3)] = Sequelize, l['sequelize'] = sequelize;
        const T = require('./includes' + '/database/' + V(0xd1))(l);
        logger(global[E(0xcb)](E(0xc4), 'successCon' + 'nectDataba' + 'se'), V(0xcc) + '\x20]');
        const Y = {};
        Y['models'] = T, onBot(Y);
    } catch (K) { logger(global['getText'](y(0xc4), E(0xca) + n(0xc9) + 'se', JSON[E(0xc6)](K)), E(0xcc) + '\x20]'); }
})());
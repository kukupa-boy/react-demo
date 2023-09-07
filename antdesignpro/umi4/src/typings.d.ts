/**
 * @name 全局类型声明
 * @description 用于声明全局类型，不然会报错
 */
declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';
declare module '*js';

// 声明全局变量，不然直接使用REACT_APP_ENV会报错
declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

import { EXPIRES } from './constant';

export function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export function getCookie(name) {
  const cookieArray = document.cookie.split(';');
  for (const cookie of cookieArray) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function setLocalStorage(values) {
  const { company, direction, round, img} = values;
  localStorage.setItem('company', company);
  localStorage.setItem('direction', direction);
  localStorage.setItem('round', round);
  localStorage.setItem('img', img);
}

export function timestampToTime(timestamp) {
  // 创建一个新的Date对象，将时间戳作为参数传递
  const date = new Date(timestamp * 1000); // JavaScript中的时间戳通常是毫秒级的，所以需要乘以1000

  // 使用Date对象的方法获取时间的各个部分
  const year = date.getFullYear(); // 年份
  const month = date.getMonth() + 1; // 月份（注意：月份从0开始，所以要加1）
  const day = date.getDate(); // 日
  const hours = date.getHours(); // 小时
  const minutes = date.getMinutes(); // 分钟
  const seconds = date.getSeconds(); // 秒

  // 创建一个可读的时间字符串
  const formattedTime = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;

  return formattedTime;
}

export function getTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedTime = `${year}.${month}.${day}`;

  return formattedTime;
}
